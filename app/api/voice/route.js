import { createClient } from '@supabase/supabase-js';
import { WebSocketServer } from 'ws';
import { Deepgram } from '@deepgram/sdk';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function POST(request) {
  const formData = await request.formData();
  const CallSid = formData.get('CallSid');
  const From = formData.get('From');
  
  console.log('📞 478 demo call');
  
  try {
    await supabase
      .from('inbound_demo_calls')
      .insert({
        call_sid: CallSid,
        phone_number: From,
        line_called: '478-demo'
      });
  } catch (error) {
    console.error('Log error:', error);
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="wss://${request.headers.get('host')}/api/voice" />
  </Connect>
</Response>`;

  return new Response(twiml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}

export async function GET(request) {
  if (request.headers.get('upgrade') === 'websocket') {
    const wss = new WebSocketServer({ noServer: true });
    const { socket, head } = request;
    
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
    
    wss.on('connection', async (ws) => {
      console.log('🔊 Voice stream started');
      
      try {
        const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        
        const script = [
          "Thanks for calling MicroSaaS Creations! Our automated voice attendant here. What service business do you run?",
          "Got it. How many calls are you making manually each week?",
          "Our system handles those calls for you, 24/7. Want to see a quick demo?",
          "Great! I'll text you a trial link to test with your next calls. Sound good?",
          "Perfect! Check your phone in 30 seconds. Thanks for calling!"
        ];
        
        let step = 0;
        await speak(ws, openai, script[step]);
        step++;
        
        const dgConnection = deepgram.transcription.live({
          model: 'nova-2',
          encoding: 'mulaw',
          sample_rate: '8000',
        });
        
        ws.on('message', (audio) => dgConnection.send(audio));
        
        dgConnection.addListener('transcriptReceived', async (data) => {
          try {
            const transcript = JSON.parse(data)?.channel?.alternatives[0]?.transcript;
            if (!transcript || transcript.trim().length < 2) return;
            
            console.log('👤:', transcript);
            
            if (step < script.length) {
              await speak(ws, openai, script[step]);
              step++;
              
              if (step >= script.length) {
                setTimeout(() => ws.close(), 2000);
              }
            }
          } catch (error) {
            console.error('Error:', error);
          }
        });
        
        setTimeout(() => ws.close(), 120000);
        
      } catch (error) {
        console.error('Stream error:', error);
        ws.close();
      }
    });
    
    return new Response(null, { status: 101 });
  }
  
  return new Response(null, { status: 400 });
}

async function speak(ws, openai, text) {
  console.log('🎙️:', text);
  
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "shimmer",
      input: text,
    });
    
    const audio = Buffer.from(await mp3.arrayBuffer());
    ws.send(audio);
  } catch (error) {
    console.error('TTS error:', error);
    ws.send(Buffer.from([]));
  }
}
