export async function POST(request) {
  console.log('✅ 478 Demo Call - Simple Version');
  
  // Get caller info
  const formData = await request.formData();
  const fromNumber = formData.get('From') || 'Unknown';
  console.log('Call from:', fromNumber);
  
  // Simple 30-second demo conversation
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-US">
    Thanks for calling MicroSaaS Creations! I'm your automated voice attendant.
  </Say>
  <Pause length="2"/>
  
  <Say voice="alice" language="en-US">
    We automate cold calling for service businesses like yours.
  </Say>
  <Pause length="2"/>
  
  <Say voice="alice" language="en-US">
    Our system works 24/7, making calls and booking appointments automatically.
  </Say>
  <Pause length="2"/>
  
  <Say voice="alice" language="en-US">
    Want to see a live demo? I'll text you a trial link right now.
  </Say>
  <Pause length="3"/>
  
  <Say voice="alice" language="en-US">
    Perfect! Check your phone in 30 seconds. Thanks for the call!
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
  // Simple response for direct browser access
  return new Response('MicroSaaS Creations Voice Demo Line', { status: 200 });
}
