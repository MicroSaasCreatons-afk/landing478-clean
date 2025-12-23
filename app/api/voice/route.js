export async function POST(request) {
  console.log('📞 478 call - ' + new Date().toLocaleTimeString());
  
  const formData = await request.formData();
  const From = formData.get('From');
  console.log('From:', From || 'Unknown');
  
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">
    Thanks for calling MicroSaaS Creations automated demo line.
  </Say>
  <Pause length="2"/>
  <Say>
    I'm your voice attendant. What service business do you run?
  </Say>
  <Pause length="5"/>
  <Say>
    Got it. Our system can automate your cold calls starting tomorrow.
  </Say>
  <Pause length="2"/>
  <Say>
    Check your phone for a trial link. Thanks for calling!
  </Say>
</Response>`;

  return new Response(twiml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}

export async function GET() {
  return new Response('✅ Voice endpoint', { status: 200 });
}
