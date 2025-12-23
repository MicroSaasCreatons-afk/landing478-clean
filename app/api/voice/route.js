export async function POST(request) {
  console.log('📞 478 call received');
  
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-US">
    Thank you for calling MicroSaaS Creations. 
    This is an automated voice attendant demo.
  </Say>
  <Pause length="3"/>
  <Say voice="alice" language="en-US">
    Our system automates cold calling for service businesses.
  </Say>
  <Pause length="3"/>
  <Say voice="alice" language="en-US">
    For a live demo, please visit microsaas dot com.
  </Say>
</Response>`;

  return new Response(twiml, {
    status: 200,
    headers: { 
      'Content-Type': 'text/xml',
      'Cache-Control': 'no-store'
    }
  });
}

export async function GET() {
  return new Response('Voice endpoint OK', { status: 200 });
}
