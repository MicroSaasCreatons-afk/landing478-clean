import { WebSocketServer } from 'ws';
import { Deepgram } from '@deepgram/sdk';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  if (request.headers.get('upgrade') === 'websocket') {
    console.log('🔄 WebSocket upgrade request');
    
    const wss = new WebSocketServer({ noServer: true });
    const { socket, head } = request;
    
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
    
    wss.on('connection', async (ws, req) => {
      console.log('🔗 Browser WebSocket connected');
      
      try {
        // Initialize AI services
        const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        
        // Setup Deepgram for browser audio
        const dgConnection = deepgram.transcription.live({
          model: 'nova-2',
          encoding: 'webm',
          sample_rate: 48000,
          channels: 1,
          punctuate: true,
          interim_results: false
        });
        
        // Conversation script
        const script = [
          "Hello! I'm your AI sales assistant. What business do you run?",
          "Interesting. How many calls do you handle each week?",
          "Our system can automate all those calls for you. Want to see how?",
          "Great! I'll send you a trial link. Sound good?",
          "Perfect! Thanks for testing the AI demo."
        ];
        
        let step = 0;
        
        // Send welcome message
        if (step < script.length) {
          ws.send(`AI: ${script[step]}`);
          const audio = await textToSpeech(openai, script[step]);
          ws.send(audio);
          step++;
        }
        
        // Handle incoming audio
        ws.on('message', (data) => {
          if (dgConnection.getReadyState() === 1) { // OPEN
            dgConnection.send(data);
          }
        });
        
        // Handle speech recognition
        dgConnection.addListener('transcriptReceived', async (transcription) => {
          try {
            const data = JSON.parse(transcription);
            const transcript = data.channel?.alternatives[0]?.transcript;
            
            if (!transcript || transcript.trim().length < 2) return;
            
            console.log('👤 User:', transcript);
            ws.send(`USER: ${transcript}`);
            
            // Get AI response
            if (step < script.length) {
              const response = script[step];
              ws.send(`AI: ${response}`);
              
              const audioResponse = await textToSpeech(openai, response);
              ws.send(audioResponse);
              
              step++;
            }
            
          } catch (error) {
            console.error('Error:', error);
          }
        });
        
        // Cleanup
        ws.on('close', () => {
          console.log('🔌 WebSocket closed');
          dgConnection.finish();
        });
        
        dgConnection.addListener('error', (error) => {
          console.error('Deepgram error:', error);
        });
        
      } catch (error) {
        console.error('Setup error:', error);
        ws.close();
      }
    });
    
    return new Response(null, { status: 101 });
  }
  
  return new Response('WebSocket endpoint ready', { status: 200 });
}

async function textToSpeech(openai, text) {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "shimmer",
      input: text,
      speed: 1.0
    });
    
    return Buffer.from(await mp3.arrayBuffer());
  } catch (error) {
    console.error('TTS error:', error);
    return Buffer.from([]);
  }
}

export async function POST() {
  return new Response('Voice AI API - Use WebSocket for conversation', { status: 200 });
}
