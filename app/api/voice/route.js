export async function POST(request) {
  console.log('📞 POST Request received by Vercel function');
  
  // Return the simplest possible valid TwiML
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Thank you for calling Micro SaaS Creations.</Say>
</Response>`;

  return new Response(twiml, {
    status: 200,
    headers: { 
      'Content-Type': 'text/xml',
      'Cache-Control': 'no-cache, no-store'
    }
  });
}
