import React from 'react';
import { getTranslation } from '../../translations/i18n';
import { TraditionalDivider } from '../common/TraditionalOrnaments';
import { PeacockFeatherDivider } from '../common/DivineDeities';

export const BrideGroomSection = ({ wedding, language = 'en' }) => {
  // Pure authentic traditional Indian bride and groom photographs
  const bridePhoto =
    wedding?.bridePhoto ||
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80';
  const groomPhoto =
    wedding?.groomPhoto ||
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80';

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <PeacockFeatherDivider title="॥ वधू-वर परिचय ॥ THE SACRED UNION" />
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient mt-2">
          Bride & Groom
        </h2>
        <p className="text-gold-200/80 font-sans max-w-md mx-auto mt-2 text-sm sm:text-base">
          Guided by the sacred grace of Lord Ganesha and the blessings of beloved parents and elders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Bride Card */}
        <div className="relative bg-gradient-to-b from-[#4A0A17] to-[#2B050E] p-8 rounded-3xl border-2 border-gold-500/40 shadow-royal text-center flex flex-col items-center">
          <div className="relative mb-6">
            {/* Arch-shaped photo frame with gold foil border */}
            <div className="w-56 h-72 sm:w-64 sm:h-80 arch-frame overflow-hidden border-4 border-gold-500 shadow-gold-glow p-1 bg-[#580D1A]">
              <img
                src={bridePhoto}
                alt={wedding?.brideName || 'The Bride'}
                loading="lazy"
                className="w-full h-full arch-frame object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#580D1A] px-4 py-1 rounded-full border border-gold-400 text-gold-300 font-serif text-xs uppercase tracking-widest shadow-md">
              {getTranslation('theBride', language)}
            </div>
          </div>

          <h3 className="font-serif text-3xl font-bold text-stone-100 mb-2">
            {wedding?.brideName || 'Priya Kulkarni'}
          </h3>

          {wedding?.brideParents && (
            <p className="text-gold-300 font-serif text-sm tracking-wide mb-3">
              Daughter of <br />
              <span className="font-semibold text-stone-200">{wedding.brideParents}</span>
            </p>
          )}

          {wedding?.brideBio && (
            <p className="text-stone-300 font-sans text-sm leading-relaxed mt-2 italic px-2">
              "{wedding.brideBio}"
            </p>
          )}
        </div>

        {/* Groom Card */}
        <div className="relative bg-gradient-to-b from-[#4A0A17] to-[#2B050E] p-8 rounded-3xl border-2 border-gold-500/40 shadow-royal text-center flex flex-col items-center">
          <div className="relative mb-6">
            {/* Arch-shaped photo frame with gold foil border */}
            <div className="w-56 h-72 sm:w-64 sm:h-80 arch-frame overflow-hidden border-4 border-gold-500 shadow-gold-glow p-1 bg-[#580D1A]">
              <img
                src={groomPhoto}
                alt={wedding?.groomName || 'The Groom'}
                loading="lazy"
                className="w-full h-full arch-frame object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#580D1A] px-4 py-1 rounded-full border border-gold-400 text-gold-300 font-serif text-xs uppercase tracking-widest shadow-md">
              {getTranslation('theGroom', language)}
            </div>
          </div>

          <h3 className="font-serif text-3xl font-bold text-stone-100 mb-2">
            {wedding?.groomName || 'Prajwal Patil'}
          </h3>

          {wedding?.groomParents && (
            <p className="text-gold-300 font-serif text-sm tracking-wide mb-3">
              Son of <br />
              <span className="font-semibold text-stone-200">{wedding.groomParents}</span>
            </p>
          )}

          {wedding?.groomBio && (
            <p className="text-stone-300 font-sans text-sm leading-relaxed mt-2 italic px-2">
              "{wedding.groomBio}"
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
