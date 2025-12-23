'use client';
import { useState, useRef } from 'react';

export default function VoiceTest() {
  const [status, setStatus] = useState('Ready');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const startCall = async () => {
    setStatus('Getting microphone...');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true
      });
      
      const ws = new WebSocket('wss://landing478-clean.vercel.app/api/voice');
      wsRef.current = ws;
      
      ws.onopen = () => {
        setStatus('Connected! Speak now...');
        
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm'
        });
        mediaRecorderRef.current = mediaRecorder;
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
            ws.send(event.data);
          }
        };
        
        mediaRecorder.start(250);
        
        ws.onmessage = async (event) => {
          if (event.data instanceof Blob) {
            const audioUrl = URL.createObjectURL(event.data);
            const audio = new Audio(audioUrl);
            await audio.play();
          } else if (typeof event.data === 'string') {
            const msg = event.data;
            if (msg.startsWith('TRANSCRIPT:')) {
              setTranscript(msg.replace('TRANSCRIPT:', '').trim());
            } else if (msg.startsWith('AI:')) {
              setAiResponse(msg.replace('AI:', '').trim());
            }
          }
        };
      };
      
      ws.onerror = (error) => {
        setStatus('Connection error');
      };
      
      ws.onclose = () => {
        setStatus('Connection closed');
      };
      
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const stopCall = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
    setStatus('Stopped');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>AI SDR Test</h1>
      <p>Status: <strong>{status}</strong></p>
      
      <div style={{ margin: '2rem 0' }}>
        <button onClick={startCall} style={{ padding: '1rem 2rem', marginRight: '1rem' }}>
          Start AI Conversation
        </button>
        <button onClick={stopCall} style={{ padding: '1rem 2rem' }}>
          Stop
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3>You Said:</h3>
          <div style={{ background: '#f0f0f0', padding: '1rem', minHeight: '100px' }}>
            {transcript || 'Speak here...'}
          </div>
        </div>
        
        <div>
          <h3>AI Response:</h3>
          <div style={{ background: '#e0f7fa', padding: '1rem', minHeight: '100px' }}>
            {aiResponse || 'AI will respond here...'}
          </div>
        </div>
      </div>
    </div>
  );
}
