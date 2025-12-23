import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function POST(request) {
  // Parse form data
  const formData = await request.formData();
  const CallSid = formData.get('CallSid');
  const From = formData.get('From');
  
  console.log('📞 Incoming call:', { CallSid, From });
  
  try {
    // Test Supabase connection
    const { data, error } = await supabase
      .from('inbound_demo_calls')
      .insert({
        call_sid: CallSid,
        phone_number: From,
        line_called: '478-demo'
      })
      .select();
    
    if (error) {
      console.error('❌ Supabase error:', error.message);
    } else {
      console.log('✅ Call logged to Supabase:', data);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }

  // Return TwiML response (always return this even if Supabase fails)
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Matthew">
    Hi! You've reached MicroSaaS Creations demo line.
    Test call logged successfully.
  </Say>
  <Hangup/>
</Response>`;

  return new Response(twiml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}
  
  
