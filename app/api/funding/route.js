export async function POST(request) {
  const formData = await request.formData();
  const From = formData.get('From');
  
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Matthew">
    Welcome to MicroSaaS Creations funding line.
    Are you looking for business funding or growth capital?
    Please tell us about your business and funding needs.
  </Say>
  <Record maxLength="60" action="/api/funding-process" />
</Response>`;

  return new Response(twiml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}
