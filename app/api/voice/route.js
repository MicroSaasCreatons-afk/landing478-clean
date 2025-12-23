export async function GET(request) {
  console.log('🔊 GET called at', new Date().toISOString());
  return new Response('TEST v4: GET endpoint works', { status: 200 });
}

export async function POST(request) {
  console.log('📞 POST called at', new Date().toISOString());
  return new Response('TEST v4: POST endpoint works - ' + new Date().toISOString(), { 
    status: 200,
    headers: { 'Cache-Control': 'no-store' }
  });
}
