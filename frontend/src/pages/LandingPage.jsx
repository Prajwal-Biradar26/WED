import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Heart,
  Music,
  Share2,
  Calendar,
  Camera,
  Layers,
  ArrowRight,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { MandalaOrnament, DiyaOrnament, KalashOrnament, LotusOrnament } from '../components/common/TraditionalOrnaments';
import { TEMPLATES } from '../templates/templateStyles';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D060E] via-[#3D0813] to-[#1A0307] text-stone-100 selection:bg-gold-500 selection:text-maroon-950 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#2D060E]/90 backdrop-blur-md border-b border-gold-500/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <DiyaOrnament className="w-8 h-8 text-gold-400" />
            <span className="font-serif text-2xl font-bold tracking-wider text-gold-gradient">
              Vangmaya
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#features" className="text-sm font-serif text-stone-300 hover:text-gold-400 hidden sm:inline">
              Features
            </a>
            <a href="#templates" className="text-sm font-serif text-stone-300 hover:text-gold-400 hidden sm:inline">
              Templates
            </a>
            <Link
              to="/w/prajwal-and-priya"
              className="text-xs sm:text-sm font-serif text-gold-300 hover:underline flex items-center gap-1"
            >
              <span>Live Demo</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            </Link>
            <Link
              to="/login"
              className="text-xs sm:text-sm font-serif px-4 py-2 rounded-full border border-gold-400/60 text-gold-300 hover:bg-gold-500 hover:text-maroon-950 transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-xs sm:text-sm font-serif font-bold px-5 py-2 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 shadow-gold-glow hover:brightness-110 transition-all hidden md:inline-block"
            >
              Create Invitation
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-28 px-4 text-center overflow-hidden">
        {/* Background Mandala */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <MandalaOrnament size={750} className="w-[750px] h-[750px] text-gold-400 animate-spin-slow" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Auspicious Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#580D1A] border border-gold-500/50 text-gold-300 font-serif text-xs uppercase tracking-widest mb-6 shadow-md">
            <span>🪔</span>
            <span>The Premier Indian Digital Wedding Invitation Platform</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-stone-100 tracking-tight leading-tight">
            Your Wedding Story, <br />
            <span className="text-gold-gradient">Beautifully Invited.</span>
          </h1>

          <p className="text-gold-100/90 font-sans text-base sm:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
            Create a timeless digital wedding invitation for your special day. Rich traditional aesthetics, animated envelope opening, Google Maps venue directions, RSVP management, and ambient classical shehnai.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link
              to="/register"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 text-maroon-950 font-serif font-bold text-sm uppercase tracking-widest shadow-gold-glow hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Create Your Invitation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#templates"
              className="px-8 py-4 rounded-full bg-[#580D1A] border-2 border-gold-500/70 text-gold-300 font-serif font-bold text-sm uppercase tracking-widest hover:bg-gold-500 hover:text-maroon-950 transition-all shadow-md"
            >
              Explore Templates
            </a>

            <Link
              to="/w/prajwal-and-priya"
              className="px-6 py-4 rounded-full bg-black/40 border border-gold-400/40 text-stone-300 font-serif text-sm uppercase tracking-wider hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <span>💍 Preview Sample Wedding</span>
            </Link>
          </div>

          {/* Hero Visual Preview */}
          <div className="mt-16 relative max-w-5xl mx-auto rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-gold-500/40 to-transparent border border-gold-500/40 shadow-2xl">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gold-500/50 bg-[#3B0811] aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85"
                alt="Traditional Indian Wedding Preview"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D060E] via-transparent to-black/30"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-gold-500/30">
                <div className="text-left">
                  <p className="font-serif text-gold-400 text-xs tracking-widest uppercase">
                    ॥ श्री गणेशाय नमः ॥
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                    Priya & Prajwal
                  </h3>
                  <p className="text-stone-300 text-xs font-sans">
                    25 December 2026 · Solapur Road, Vijayapura, Karnataka
                  </p>
                </div>
                <Link
                  to="/w/prajwal-and-priya"
                  className="px-4 py-2 rounded-full bg-gold-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shrink-0"
                >
                  Experience Live
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <LotusOrnament className="w-12 h-12 text-gold-400 mx-auto mb-3" />
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">
            Everything for a Royal Indian Wedding
          </h2>
          <p className="text-gold-200/80 font-sans max-w-xl mx-auto mt-2 text-sm sm:text-base">
            Engineered to honor age-old traditions while providing your guests an effortless, unforgettable modern digital experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '💌',
              title: 'Animated Envelope Opening',
              desc: 'Cinematic wax seal and unfolding invitation card with falling marigold & rose petals and mandala revelation.',
            },
            {
              icon: '📍',
              title: 'Google Maps Locations',
              desc: 'Seamless Google Maps URLs. Guests tap [ VIEW LOCATION ] or [ GET DIRECTIONS ] to open turn-by-turn navigation directly on their phones.',
            },
            {
              icon: '🎵',
              title: 'Auspicious Classical Music',
              desc: 'Authentic Indian instrumental melodies — Shehnai, divine bansuri flute, and sitar with a floating audio player.',
            },
            {
              icon: '✍️',
              title: 'AI Invitation Copywriter',
              desc: 'One-click Gemini AI generator for heartfelt welcome messages, couple biographies, event descriptions, and WhatsApp invites across 5 tones.',
            },
            {
              icon: '📜',
              title: 'Unlimited Ceremonies',
              desc: 'Add Haldi, Mehendi, Sangeet, Muhurtham, and Reception with distinct venues, timings, dress codes, and Google Maps links.',
            },
            {
              icon: '👥',
              title: 'Guest RSVP & Analytics',
              desc: 'Capture guest counts, food preferences (Vegetarian, Non-Veg, Jain), personal messages, and export all responses to CSV.',
            },
            {
              icon: '🌸',
              title: 'Blessings Guestbook',
              desc: 'Guests leave heartfelt prayers and wishes that appear on your invitation page, with full admin approval moderation.',
            },
            {
              icon: '💬',
              title: 'One-Click WhatsApp Sharing',
              desc: 'Instantly generate pre-filled WhatsApp invitations with custom emojis, couple names, wedding date, and your unique public URL.',
            },
            {
              icon: '🌐',
              title: 'Multi-Language Support',
              desc: 'Native support for English, Hindi (हिन्दी), and Kannada (ಕನ್ನಡ), ensuring elders and family feel deeply connected.',
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border border-gold-500/30 shadow-royal hover:border-gold-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2">
                  {f.title}
                </h3>
                <p className="text-stone-300 font-sans text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Templates Showcase */}
      <section id="templates" className="py-20 px-4 max-w-6xl mx-auto border-t border-gold-500/20">
        <div className="text-center mb-16">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400">
            Aesthetic Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient mt-2">
            6 Authentic Indian Templates
          </h2>
          <p className="text-gold-200/80 font-sans max-w-xl mx-auto mt-2 text-sm sm:text-base">
            From royal Rajput havelis to South Indian temple brass lamps, choose a design that mirrors your family's traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(TEMPLATES).map((t) => (
            <div
              key={t.id}
              className={`p-6 rounded-3xl ${t.cardBg} border-2 ${t.borderColor} shadow-2xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-serif uppercase tracking-wider text-gold-300 bg-black/40 px-3 py-1 rounded-full">
                    {t.badge}
                  </span>
                  <div className="flex gap-1.5">
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.primaryColor }}></span>
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.accentColor }}></span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2">
                  {t.name}
                </h3>
                <p className="text-stone-300 font-sans text-xs sm:text-sm leading-relaxed mb-6">
                  {t.description}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <Link
                  to={`/w/prajwal-and-priya`}
                  className="flex-1 text-center py-2.5 rounded-full bg-black/40 border border-gold-400/50 text-gold-300 font-serif text-xs uppercase tracking-wider hover:bg-gold-500 hover:text-maroon-950 transition-all"
                >
                  Preview
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  Use Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-[#580D1A] to-[#2D060E] border-2 border-gold-500/60 shadow-gold-glow text-center relative overflow-hidden">
          <MandalaOrnament size={250} className="absolute -top-16 -right-16 opacity-10 pointer-events-none text-gold-400" />

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient mb-4">
            Begin Your Sacred Celebration Today
          </h2>
          <p className="text-stone-200 font-sans text-sm sm:text-base max-w-xl mx-auto mb-8">
            Create, customize, and share your royal digital Indian wedding invitation in under 10 minutes.
          </p>

          <Link
            to="/register"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 text-maroon-950 font-serif font-bold text-sm uppercase tracking-widest shadow-gold-glow hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>Create Your Invitation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gold-500/20 bg-[#1A0307] text-center text-xs text-stone-400">
        <p className="font-serif text-gold-300 text-lg mb-2">Vangmaya</p>
        <p className="max-w-md mx-auto mb-4">
          A timeless platform dedicated to celebrating Indian wedding heritage, sacred Vedic vows, and joyful family unions.
        </p>
        <p>© {new Date().getFullYear()} Vangmaya. All rights reserved.</p>
      </footer>
    </div>
  );
};
