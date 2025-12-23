export async function POST(request) {
  console.log('📞 478 call received at:', new Date().toISOString());
  
  const formData = await request.formData();
  const From = formData.get('From');
  console.log('Call from:', From);
  
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">
    Thanks for calling MicroSaaS Creations. This is our automated voice attendant. 
    We help businesses automate cold calling. For a demo, visit microsaas.com.
  </Say>
  <Pause length="1"/>
  <Say>
    I'll text you a trial link now. Check your phone.
  </Say>
  <Hangup/>
</Response>`;

  return new Response(twiml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}

export async function GET() {
  return new Response('Voice endpoint ready', { status: 200 });
}
