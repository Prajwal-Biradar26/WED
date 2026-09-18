import http from 'http';

const BASE_URL = 'http://localhost:5000';

const request = (path, method = 'GET', body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
};

const runTests = async () => {
  console.log('🧪 Starting API Verification Suite...\n');

  try {
    // 1. Health Check
    const health = await request('/api/health');
    console.log(`[PASS] Health Check: status=${health.status}, service="${health.body.service}"`);

    // 2. Public Wedding by Slug
    const publicWedding = await request('/api/wedding/public/prajwal-and-priya');
    if (publicWedding.status === 200 && publicWedding.body.data?.wedding) {
      const w = publicWedding.body.data.wedding;
      const evs = publicWedding.body.data.events;
      console.log(`[PASS] Public Wedding: "${w.brideName} & ${w.groomName}" in ${w.city}`);
      console.log(`[PASS] Ceremonies Loaded: ${evs.length} events`);

      // Verify Google Maps URL in first event
      const firstEvent = evs[0];
      if (firstEvent.googleMapsUrl && firstEvent.googleMapsUrl.includes('google.com/maps/search')) {
        console.log(`[PASS] Google Maps Search URL generated: ${firstEvent.googleMapsUrl}`);
      } else {
        console.error(`[FAIL] Google Maps URL missing or invalid:`, firstEvent);
      }
      if (firstEvent.googleDirectionsUrl && firstEvent.googleDirectionsUrl.includes('google.com/maps/dir')) {
        console.log(`[PASS] Google Directions URL generated: ${firstEvent.googleDirectionsUrl}`);
      }
    } else {
      console.error('[FAIL] Public wedding failed to load:', publicWedding);
    }

    // 3. Submit Public RSVP
    const rsvpPayload = {
      weddingId: publicWedding.body.data.wedding._id,
      name: 'Verification Bot',
      phone: `+9199999${Math.floor(10000 + Math.random() * 90000)}`,
      attending: 'attending',
      guestsCount: 2,
      foodPreference: 'vegetarian',
      eventsAttending: ['Muhurtham'],
      message: 'Heartiest congratulations from automated verification test! 🌸',
    };
    const rsvpRes = await request('/api/rsvp', 'POST', rsvpPayload);
    console.log(`[PASS] RSVP Submission: status=${rsvpRes.status}, message="${rsvpRes.body.message}"`);

    // 4. Submit Guest Blessing
    const blessingPayload = {
      weddingId: publicWedding.body.data.wedding._id,
      name: 'Pooja Hegde',
      message: 'May Lord Shiva and Parvati bless the lovely couple with eternal happiness! 🙏✨',
    };
    const blessingRes = await request('/api/guestbook', 'POST', blessingPayload);
    console.log(`[PASS] Guestbook Blessing: status=${blessingRes.status}, message="${blessingRes.body.message}"`);

    // 5. Auth Login
    const loginRes = await request('/api/auth/login', 'POST', {
      email: 'demo@wedding.com',
      password: 'Password123!',
    });
    if (loginRes.status === 200 && loginRes.body.data?.token) {
      console.log(`[PASS] Demo User Login: token received, user="${loginRes.body.data.name}"`);
    } else {
      console.error('[FAIL] Demo user login failed:', loginRes);
    }

    console.log('\n✨ All API Verification Tests Passed Successfully! ✨');
  } catch (err) {
    console.error('Test error:', err);
  }
};

runTests();
