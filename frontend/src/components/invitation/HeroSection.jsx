import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, Sparkles } from 'lucide-react';
import { getTranslation } from '../../translations/i18n';
import { GaneshaArtwork } from '../common/DivineDeities';
import { MandalaOrnament } from '../common/TraditionalOrnaments';

export const HeroSection = ({ wedding, language = 'en' }) => {
  // Pure authentic Indian traditional wedding couple photo
  const coupleImage =
    wedding?.couplePhoto ||
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85';

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 py-20 overflow-hidden">
      {/* Background Indian Couple Photo with Warm Temple Maroon Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={coupleImage}
          alt={`${wedding?.brideName} and ${wedding?.groomName}`}
          className="w-full h-full object-cover object-center filter brightness-70 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#200409] via-[#350811]/75 to-[#200409]/90"></div>
        {/* Subtle Indian Textile Jali texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.06)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      </div>

      {/* Decorative Rotating Mandala in Center Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
        <MandalaOrnament size={700} className="w-[700px] h-[700px] text-gold-400 animate-spin-slow" />
      </div>

      {/* Hero Content Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl mx-auto p-6 sm:p-12 rounded-3xl bg-[#4A0A17]/85 backdrop-blur-md border-2 border-gold-500/60 shadow-2xl"
      >
        {/* Sacred Lord Ganesha Invocation */}
        <div className="mb-4">
          <GaneshaArtwork className="w-16 h-16 sm:w-20 sm:h-20 text-gold-400 mx-auto" showShloka={true} />
        </div>

        {/* Traditional Invitation Greeting */}
        <p className="text-gold-200/90 font-serif text-xs sm:text-sm tracking-widest uppercase mt-4 mb-3">
          {getTranslation('togetherWithFamilies', language)}
        </p>

        {/* Bride & Groom Traditional Names */}
        <div className="my-4">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-stone-100 tracking-tight drop-shadow-lg">
            {wedding?.brideName || 'Priya Kulkarni'}
          </h1>

          <div className="flex items-center justify-center gap-3 text-gold-400 my-2 sm:my-3">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></span>
            <Heart className="w-5 h-5 sm:w-7 sm:h-7 fill-red-600 text-gold-400 animate-pulse" />
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-stone-100 tracking-tight drop-shadow-lg">
            {wedding?.groomName || 'Prajwal Patil'}
          </h1>
        </div>

        <p className="text-stone-200 font-serif text-sm sm:text-lg italic max-w-xl mx-auto my-5 leading-relaxed">
          {getTranslation('inviteYou', language)}
        </p>

        {/* Wedding Date & City Banner */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-gold-200 text-xs sm:text-sm font-sans mb-8">
          <div className="flex items-center gap-2 bg-[#580D1A]/90 px-4 py-2 rounded-full border border-gold-500/40 shadow-sm">
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>
              {wedding?.weddingDate
                ? new Date(wedding.weddingDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : '25 December 2026'}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#580D1A]/90 px-4 py-2 rounded-full border border-gold-500/40 shadow-sm">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span>
              {wedding?.city || 'Vijayapura'}, {wedding?.state || 'Karnataka'}
            </span>
          </div>
        </div>

        {/* Action Buttons: Pure Invitation Navigation (No RSVP button) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#events"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 text-maroon-950 font-serif font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition-all"
          >
            {getTranslation('viewEvents', language)}
          </a>

          <a
            href="#venue"
            className="px-6 py-3 rounded-full bg-[#580D1A] border-2 border-gold-500/80 text-gold-300 font-serif font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-500 hover:text-maroon-950 transition-all shadow-md"
          >
            📍 {getTranslation('venue', language)} & Directions
          </a>

          <a
            href="#blessings"
            className="px-6 py-3 rounded-full bg-black/40 border border-gold-400/50 text-gold-200 font-serif font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/10 transition-all"
          >
            🌸 Bestow Blessings
          </a>
        </div>
      </motion.div>
    </section>
  );
};
