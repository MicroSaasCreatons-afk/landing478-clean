export async function POST(request) {
  console.log('🔧 TEST: Simple single message');
  
  // ONE simple message - nothing else
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Welcome to MicroSaaS Creations demo.</Say>
</Response>`;
  
  return new Response(twiml, {
    status: 200,
    headers: { 
      'Content-Type': 'text/xml',
      'Cache-Control': 'no-store'
    }
  });
}
