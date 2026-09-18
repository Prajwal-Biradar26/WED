# 🪔 Vangmaya — Luxury Traditional Indian Digital Wedding Invitation Platform

A full-stack, production-quality Digital Indian Wedding Invitation Platform built with React, Node.js, Express, MongoDB Atlas, and Tailwind CSS. Featuring an authentic Indian luxury aesthetic (deep royal maroon, antique gold, sacred mandalas, temple arches, marigolds, and brass diyas), cinematic animated envelope opening, Google Maps venue navigation, RSVP tracking, Guestbook blessings, AI copywriter, and background classical Shehnai & Bansuri music.

---

## 🌟 Key Features

1. **Auspicious Traditional Aesthetic**:
   - Palette: Deep Royal Maroon (`#580D1A`), Antique Gold (`#D4AF37`), Royal Red, Saffron, and Ivory.
   - Traditional Indian ornaments: Sacred Mandalas, Brass Diyas with glowing flame, Kalash, Lotus motifs, and Temple Arches.
   - 6 Authentic Templates:
     - **Traditional Royal** (Maroon + Antique Gold, Mandalas & Indian filigree)
     - **South Indian Temple** (Temple red, Turmeric gold, Vilakku lamps, Banana leaf accents)
     - **Marigold Celebration** (Warm ivory, Haldi yellow & vibrant marigold garlands)
     - **Royal Rajasthani** (Regal ruby red, gold Jharokha arches, haveli patterns)
     - **Elegant Floral** (Delicate ivory & blush rose with subtle gold filigree)
     - **Minimal Traditional** (Understated cream with hairline gold borders)

2. **Cinematic Envelope Opening Experience**:
   - Initial screen presents an imperial Indian wedding card with golden seal and *"॥ श्री गणेशाय नमः ॥"*.
   - Clicking **"OPEN INVITATION"** unrolls the card, showers vibrant rose and marigold flower petals (canvas particle animation), reveals the golden mandala, and initiates auspicious Shehnai/Bansuri melodies.

3. **⭐ Google Maps Venue Navigation System (Zero Billing / No API Key Needed)**:
   - For every ceremony, simply enter the **Venue Name** and **Venue Address** (e.g. *Sri Sai Convention Hall, Solapur Road, Vijayapura, Karnataka*).
   - Generates reliable, encoded Google Maps links:
     - `[ 📍 VIEW LOCATION ]` → `https://www.google.com/maps/search/?api=1&query=ENCODED_LOCATION`
     - `[ 🧭 GET DIRECTIONS ]` → `https://www.google.com/maps/dir/?api=1&destination=ENCODED_LOCATION`
   - Tested on Android, iOS, and desktop browsers with target `_blank` and `rel="noopener noreferrer"`.
   - Built-in fallback: hides button if location is not configured; never displays broken links.

4. **Background Classical Wedding Music**:
   - Built-in traditional Shehnai, Flute, and Sitar melodies.
   - Floating audio widget with soundwave animations and mute/unmute control.
   - Fully compliant with browser autoplay policies (starts smoothly on card opening interaction).

5. **Multi-Language Support (i18n)**:
   - Clean translation architecture supporting **English**, **हिन्दी (Hindi)**, and **ಕನ್ನಡ (Kannada)**.
   - Guests can switch languages dynamically via the floating globe selector.

6. **Interactive Love Story & Media**:
   - Milestone timeline (alternating on desktop, vertical on mobile).
   - Masonry photo gallery with categories (Couple, Pre-Wedding, Engagement, Preparation, Events, Family) and full-screen Lightbox viewer.
   - Video section with custom play trigger for "Our Journey" cinematic video.

7. **Guest RSVP System & Admin Hub**:
   - Guest attendance: *Joyfully Accepts ❤️* or *Regretfully Declines*.
   - Headcount, food preference (*Vegetarian, Non-Vegetarian, Jain, Other*), ceremonies attending, and personal notes.
   - Duplicate prevention by phone number.
   - Real-time Admin Dashboard analytics with search, filter, and **1-Click CSV Export**.

8. **Guestbook & Blessing Moderation**:
   - Guests leave prayers and blessings for the couple.
   - Admin can review, approve, hide, or delete messages from the dashboard.

9. **✨ AI Invitation Content Writer**:
   - Powered by Google Gemini API (`@google/generative-ai`) with built-in traditional template fallback.
   - Generates customized welcome messages, invitation descriptions, couple biographies, and WhatsApp invites across 5 tones (*Traditional, Romantic, Royal, Elegant, Simple*) and 3 languages.

10. **One-Click WhatsApp Sharing**:
    - Pre-formats rich WhatsApp invitation messages with emojis, couple names, date, venue, and unique URL (`/w/:slug`).

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Canvas Confetti.
- **Backend**: Node.js, Express.js (ES Modules).
- **Database**: MongoDB Atlas with Mongoose (includes automatic in-memory fallback for zero-configuration local development).
- **Media**: Cloudinary integration with local storage fallback.
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Clone & Setup Backend
```bash
cd backend
cp .env.example .env
npm install
```

Configure `backend/.env` (optional, default in-memory MongoDB runs automatically if left empty):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/wedding_platform
JWT_SECRET=super_secret_wedding_jwt_key_2026
FRONTEND_URL=http://localhost:5173

# Optional: Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Optional: Google Gemini AI
AI_API_KEY=
```

Start the backend:
```bash
npm run dev
# Server runs at http://localhost:5000
```
*Note: On first startup, the database automatically seeds a complete rich sample wedding for "Priya & Prajwal" with all events, Google Maps links, and blessings!*

### 2. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

Visit:
- **Landing Page**: [http://localhost:5173](http://localhost:5173)
- **Live Sample Invitation**: [http://localhost:5173/w/prajwal-and-priya](http://localhost:5173/w/prajwal-and-priya)
- **Sign In**: [http://localhost:5173/login](http://localhost:5173/login) (Demo: `demo@wedding.com` / `Password123!`)
- **Dashboard**: [http://localhost:5173/dashboard](http://localhost:5173/dashboard)
- **Create Invitation**: [http://localhost:5173/create](http://localhost:5173/create)

---

## 📦 Production Deployment

### Frontend Deployment (Vercel)
1. Push repository to GitHub.
2. In Vercel, import the repository and set Root Directory to `frontend`.
3. Set Environment Variable:
   - `VITE_API_URL`: `https://your-backend-render-app.onrender.com/api`
4. Click Deploy.

### Backend Deployment (Render)
1. In Render, create a new **Web Service** pointing to your repository.
2. Set Root Directory to `backend`.
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string.
   - `FRONTEND_URL`: Your Vercel domain.
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `AI_API_KEY`: Your Google Gemini API Key.
