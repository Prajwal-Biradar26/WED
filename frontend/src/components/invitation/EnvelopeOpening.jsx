import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GaneshaArtwork } from '../common/DivineDeities';
import { MandalaOrnament, DiyaOrnament, KalashOrnament } from '../common/TraditionalOrnaments';

export const EnvelopeOpening = ({ wedding, onOpen, language = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);

    // Auspicious traditional Indian flower petal shower (Deep crimson rose & vibrant marigold)
    try {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const petalColors = ['#9B111E', '#C41E3A', '#FFA500', '#FFD700', '#F37021'];

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.6 },
          colors: petalColors,
          shapes: ['circle'],
          scalar: 1.3,
          ticks: 200,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.6 },
          colors: petalColors,
          shapes: ['circle'],
          scalar: 1.3,
          ticks: 200,
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch (e) {
      console.warn('Petals effect error:', e);
    }

    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  const inviteTitles = {
    en: "You're Cordially Invited",
    hi: "॥ शुभ विवाह निमंत्रण पत्र ॥",
    kn: "॥ ಶುಭ ವಿವಾಹ ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ ॥",
  };

  const openButtonLabels = {
    en: "OPEN INVITATION",
    hi: "निमंत्रण पत्र खोलें",
    kn: "ಆಮಂತ್ರಣ ತೆರೆಯಿರಿ",
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#24040A] via-[#3D0813] to-[#160205] p-4 sm:p-6 overflow-hidden select-none"
        >
          {/* Subtle background golden mandala */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <MandalaOrnament size={650} className="w-[650px] h-[650px] text-gold-400 animate-spin-slow" />
          </div>

          {/* Floating traditional diya lamps on corners */}
          <div className="absolute top-6 left-6 opacity-80 hidden sm:block">
            <DiyaOrnament className="w-12 h-12 text-gold-400" />
          </div>
          <div className="absolute top-6 right-6 opacity-80 hidden sm:block">
            <DiyaOrnament className="w-12 h-12 text-gold-400" />
          </div>
          <div className="absolute bottom-6 left-6 opacity-80 hidden sm:block">
            <KalashOrnament className="w-12 h-12 text-gold-400" />
          </div>
          <div className="absolute bottom-6 right-6 opacity-80 hidden sm:block">
            <KalashOrnament className="w-12 h-12 text-gold-400" />
          </div>

          {/* Royal Invitation Card Envelope */}
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-[#580D1A] rounded-3xl shadow-2xl border-2 border-gold-500/70 p-6 sm:p-8 text-center overflow-hidden"
          >
            {/* Ornate corner gold flourishes */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold-400 rounded-tl-xl pointer-events-none"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold-400 rounded-tr-xl pointer-events-none"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold-400 rounded-bl-xl pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold-400 rounded-br-xl pointer-events-none"></div>

            {/* Sacred Lord Ganesha Artwork on Envelope */}
            <div className="flex justify-center mb-1">
              <GaneshaArtwork className="w-20 h-20 text-gold-400" showShloka={true} />
            </div>

            {/* Invitation Heading */}
            <h2 className="text-gold-gradient font-serif text-xl sm:text-2xl font-bold tracking-wide mt-2">
              {inviteTitles[language] || inviteTitles.en}
            </h2>

            {/* Couple Names */}
            <div className="my-4">
              <h1 className="text-stone-100 font-serif text-3xl sm:text-4xl font-extrabold tracking-normal">
                {wedding?.brideName || 'The Bride'}
              </h1>
              <div className="flex items-center justify-center gap-2 text-gold-400 my-1">
                <span className="h-[1px] w-8 bg-gold-400/50"></span>
                <span className="text-lg">❤️</span>
                <span className="h-[1px] w-8 bg-gold-400/50"></span>
              </div>
              <h1 className="text-stone-100 font-serif text-3xl sm:text-4xl font-extrabold tracking-normal">
                {wedding?.groomName || 'The Groom'}
              </h1>
            </div>

            <p className="text-gold-200/90 text-xs sm:text-sm font-sans mb-6 px-4">
              {wedding?.weddingDate
                ? new Date(wedding.weddingDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Auspicious Date'}
              {' · '}
              {wedding?.city || 'India'}
            </p>

            {/* Cinematic Open Invitation Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleOpenClick}
              className="relative px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 text-maroon-950 font-serif font-bold text-xs sm:text-sm tracking-widest uppercase shadow-gold-glow transition-all duration-300 hover:brightness-110 flex items-center justify-center gap-2 mx-auto"
            >
              <span>🪔</span>
              <span>{openButtonLabels[language] || openButtonLabels.en}</span>
              <span>🪔</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
