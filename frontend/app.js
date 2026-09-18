const apiBase = '/api';
const slug = location.pathname.match(/^\/w\/([^/]+)/)?.[1] || 'prajwal-and-priya';
const app = document.querySelector('#app');

const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const formatDate = (value) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
const locationQuery = (event) => encodeURIComponent([event.venueName, event.venueAddress].filter(Boolean).join(', '));
const mapsUrl = (event) => `https://www.google.com/maps/search/?api=1&query=${locationQuery(event)}`;
const directionsUrl = (event) => `https://www.google.com/maps/dir/?api=1&destination=${locationQuery(event)}`;

const renderLoading = () => { app.innerHTML = '<div class="loading"><div class="welcome-mark">✦</div><h2>Preparing your invitation</h2><p>Gathering the blessings, stories, and celebrations.</p></div>'; };
const renderError = (message) => { app.innerHTML = `<div class="error"><div class="welcome-mark">✦</div><h1>Invitation unavailable</h1><p>${escapeHtml(message)}</p><a class="btn btn-primary" href="/">Return home</a></div>`; };

const eventMarkup = (event) => `
  <article class="event">
    ${event.image ? `<img src="${escapeHtml(event.image)}" alt="${escapeHtml(event.name)}" loading="lazy" />` : ''}
    <div class="event-meta">${formatDate(event.date)} · ${escapeHtml(event.startTime || '')}${event.endTime ? ` - ${escapeHtml(event.endTime)}` : ''}</div>
    <h3>${escapeHtml(event.name)}</h3>
    <p>${escapeHtml(event.description || '')}</p>
    ${event.venueName || event.venueAddress ? `<p><strong>${escapeHtml(event.venueName || 'Venue')}</strong><br>${escapeHtml(event.venueAddress || '')}</p><div class="map-links"><a href="${mapsUrl(event)}" target="_blank" rel="noopener noreferrer">VIEW LOCATION</a><a href="${directionsUrl(event)}" target="_blank" rel="noopener noreferrer">GET DIRECTIONS</a></div>` : ''}
  </article>`;

const render = ({ wedding, events, story, media, guestbookMessages }) => {
  const heroImage = wedding.couplePhoto || media.find((item) => item.isHero)?.url || '';
  document.title = `${wedding.brideName} & ${wedding.groomName} | Wedding Invitation`;
  app.innerHTML = `
  <div class="shell">
    <nav class="nav"><div class="brand">शुभ विवाह</div><div class="nav-links"><a href="#story">Our Story</a><a href="#events">Events</a><a href="#rsvp">RSVP</a></div></nav>
    <header class="hero" style="--hero: url('${escapeHtml(heroImage)}')">
      <div class="hero-content"><div class="eyebrow">॥ श्री गणेशाय नमः ॥</div><h1>Together<br>with love</h1><p class="hero-copy">${escapeHtml(wedding.welcomeMessage || wedding.weddingDescription)}</p><div class="names"><b>${escapeHtml(wedding.brideName)}</b><span>✦</span><b>${escapeHtml(wedding.groomName)}</b></div><div class="hero-meta">${formatDate(wedding.weddingDate)} · ${escapeHtml(wedding.city)}, ${escapeHtml(wedding.state || '')}</div><div class="actions"><a class="btn btn-primary" href="#events">View celebrations</a><a class="btn btn-ghost" href="#rsvp">Send your RSVP</a></div></div>
    </header>
    <section class="section welcome"><div class="welcome-mark">❧</div><div class="section-kicker">With love and blessings</div><p class="welcome-quote">${escapeHtml(wedding.weddingDescription || wedding.welcomeMessage)}</p></section>
    <section class="section" id="couple"><div class="section-head"><div class="section-kicker">The families present</div><h2>Two hearts,<br>one sacred journey</h2><p class="section-lead">With the blessings of our parents and elders, we invite you to witness this beautiful beginning.</p></div><div class="couple-grid"><article class="person"><img src="${escapeHtml(wedding.bridePhoto || heroImage)}" alt="${escapeHtml(wedding.brideName)}" loading="lazy"><h3>${escapeHtml(wedding.brideName)}</h3><p>${escapeHtml(wedding.brideParents || '')}</p><p>${escapeHtml(wedding.brideBio || '')}</p></article><article class="person"><img src="${escapeHtml(wedding.groomPhoto || heroImage)}" alt="${escapeHtml(wedding.groomName)}" loading="lazy"><h3>${escapeHtml(wedding.groomName)}</h3><p>${escapeHtml(wedding.groomParents || '')}</p><p>${escapeHtml(wedding.groomBio || '')}</p></article></div></section>
    <section class="section story" id="story"><div class="section-head"><div class="section-kicker">A little bit of forever</div><h2>Our story</h2><p class="section-lead">The moments that brought us here.</p></div><div class="timeline">${story.map((item) => `<article class="story-item"><div class="story-dot"></div><div class="story-text"><div class="story-date">${escapeHtml(item.date || '')}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description || '')}</p></div></article>`).join('')}</div></section>
    <section class="section countdown"><div class="section-head"><div class="section-kicker">Until we say yes</div><h2>Counting every moment</h2></div><div class="timer"><div><strong id="days">--</strong><small>Days</small></div><div><strong id="hours">--</strong><small>Hours</small></div><div><strong id="minutes">--</strong><small>Minutes</small></div><div><strong id="seconds">--</strong><small>Seconds</small></div></div></section>
    <section class="section" id="events"><div class="section-head"><div class="section-kicker">Mark your calendar</div><h2>Join the celebrations</h2><p class="section-lead">Every ceremony, every blessing, every joyful gathering.</p></div><div class="event-grid">${events.map(eventMarkup).join('')}</div></section>
    <section class="section story"><div class="section-head"><div class="section-kicker">Captured with love</div><h2>Our moments</h2></div><div class="gallery">${media.filter((item) => item.mediaType !== 'video').map((item) => `<img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.title || 'Wedding memory')}" loading="lazy">`).join('')}</div></section>
    <section class="section rsvp-area" id="rsvp"><form class="form-card" id="rsvp-form"><h3>Will you join us?</h3><label for="rsvp-name">Your name</label><input id="rsvp-name" name="name" required placeholder="Name & family"><label for="rsvp-phone">Phone</label><input id="rsvp-phone" name="phone" required placeholder="+91 98765 43210"><label for="rsvp-attending">Your response</label><select id="rsvp-attending" name="attending"><option value="attending">Joyfully attending</option><option value="declined">Unable to attend</option></select><label for="rsvp-message">A note for the couple</label><textarea id="rsvp-message" name="message" placeholder="Share your warm wishes"></textarea><button class="btn btn-primary" type="submit">Send RSVP</button><div class="form-message" id="rsvp-message-status"></div></form><form class="form-card" id="blessing-form"><h3>Leave a blessing</h3><label for="blessing-name">Your name</label><input id="blessing-name" name="name" required placeholder="Your name"><label for="blessing-text">Your message</label><textarea id="blessing-text" name="message" required placeholder="Write a blessing for the couple"></textarea><button class="btn btn-primary" type="submit">Send blessing</button><div class="form-message" id="blessing-status"></div><div class="blessing-list">${guestbookMessages.slice(0, 3).map((item) => `<div class="blessing"><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.message)}</p></div>`).join('')}</div></form></section>
    <footer class="footer"><h2>${escapeHtml(wedding.brideName)} & ${escapeHtml(wedding.groomName)}</h2><p>${escapeHtml(wedding.closingMessage || 'Your blessings are our greatest gift.')}</p><p>${escapeHtml(wedding.weddingHashtag || '')}</p></footer>
    ${wedding.musicUrl ? `<button class="music-toggle" id="music-toggle" aria-label="Toggle music">♪</button><audio id="wedding-music" src="${escapeHtml(wedding.musicUrl)}" loop></audio>` : ''}
  </div>`;

  const target = new Date(wedding.weddingDate).getTime();
  const updateTimer = () => { const difference = Math.max(0, target - Date.now()); const values = [Math.floor(difference / 86400000), Math.floor(difference / 3600000) % 24, Math.floor(difference / 60000) % 60, Math.floor(difference / 1000) % 60]; ['days', 'hours', 'minutes', 'seconds'].forEach((id, index) => { document.querySelector(`#${id}`).textContent = String(values[index]).padStart(2, '0'); }); };
  updateTimer(); setInterval(updateTimer, 1000);

  document.querySelector('#rsvp-form').addEventListener('submit', async (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); data.weddingId = wedding._id; const status = document.querySelector('#rsvp-message-status'); status.textContent = 'Sending...'; try { const response = await fetch(`${apiBase}/rsvp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); const result = await response.json(); status.textContent = result.message; if (response.ok) event.currentTarget.reset(); } catch { status.textContent = 'Please try again in a moment.'; } });
  document.querySelector('#blessing-form').addEventListener('submit', async (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); data.weddingId = wedding._id; const status = document.querySelector('#blessing-status'); status.textContent = 'Sending...'; try { const response = await fetch(`${apiBase}/guestbook`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); const result = await response.json(); status.textContent = result.message; if (response.ok) event.currentTarget.reset(); } catch { status.textContent = 'Please try again in a moment.'; } });
  const audio = document.querySelector('#wedding-music'); const musicButton = document.querySelector('#music-toggle'); if (audio && musicButton) musicButton.addEventListener('click', async () => { if (audio.paused) { await audio.play().catch(() => {}); musicButton.textContent = '❚❚'; } else { audio.pause(); musicButton.textContent = '♪'; } });
};

const load = async () => { renderLoading(); try { const response = await fetch(`${apiBase}/wedding/public/${encodeURIComponent(slug)}`); const result = await response.json(); if (!response.ok) throw new Error(result.message || 'Invitation not found'); render(result.data); } catch (error) { renderError(error.message); } };
load();
