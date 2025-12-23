export async function POST(request) {
  console.log('📞 POST: 478 call');
  
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">
    Thanks for calling MicroSaaS Creations. Testing voice system.
  </Say>
  <Hangup/>
</Response>`;

  return new Response(twiml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}

export async function GET(request) {
  console.log('🔊 GET request received');
  
  // Check for WebSocket upgrade
  const upgrade = request.headers.get('upgrade');
  
  if (upgrade === 'websocket') {
    console.log('✅ WebSocket upgrade requested');
    // For now, return 101 but without actual WebSocket
    return new Response(null, {
      status: 101,
      headers: {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade'
      }
    });
  }
  
  console.log('⚠️ Regular GET request');
  return new Response('Voice endpoint - use POST for calls', { status: 200 });
}
