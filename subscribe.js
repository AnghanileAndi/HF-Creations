exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const body = JSON.parse(event.body || '{}');
    const email = body.email;
    if (!email) return { statusCode: 400, body: JSON.stringify({ error: 'Missing email' }) };

    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Mailchimp env vars not configured' }) };
    }

    // Extract data center from API key (the part after the dash)
    const parts = MAILCHIMP_API_KEY.split('-');
    const dc = parts[1];
    if (!dc) return { statusCode: 500, body: JSON.stringify({ error: 'Invalid Mailchimp API key' }) };

    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
    const payload = { email_address: email, status: 'subscribed' };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    if (res.status >= 400) {
      return { statusCode: res.status, body: JSON.stringify(json) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
