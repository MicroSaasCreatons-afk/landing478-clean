import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function POST(request) {
  // Parse form data (Twilio sends form-urlencoded)
  const formData = await request.formData();
  const CallSid = formData.get('CallSid');
  const From = formData.get('From');
  const To = formData.get('To');

  // Log incoming call
  await supabase.from('inbound_demo_calls').insert({
    call_sid: CallSid,
    phone_number: From,
    line_called: '478-demo'
  });

  // Return TwiML response
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Matthew">
    Hi! You've reached MicroSaaS Creations demo line. 
    I'm Alex, your AI sales representative. 
    I'm here to show you what your business could have - 
    an AI that handles calls 24/7, books appointments, 
    and never misses a lead. 
    What industry are you in?
  </Say>
  <Record maxLength="30" action="/api/voice-process" />
</Response>`;

  return new Response(twiml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}
