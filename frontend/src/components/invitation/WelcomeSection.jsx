import React from 'react';
import { getTranslation } from '../../translations/i18n';
import { LotusOrnament, TraditionalDivider } from '../common/TraditionalOrnaments';

export const WelcomeSection = ({ wedding, language = 'en' }) => {
  const message =
    wedding?.welcomeMessage ||
    'With the blessings of our parents and elders, we invite you to join us as we begin a beautiful new chapter of our lives.';

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto text-center">
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#4A0A17] to-[#2D060E] border-2 border-gold-500/40 shadow-royal relative overflow-hidden">
        {/* Decorative corner flourishes */}
        <div className="flex justify-center mb-4">
          <LotusOrnament className="w-12 h-12 text-gold-400" />
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gold-gradient mb-6 tracking-wide">
          {getTranslation('withLoveAndBlessings', language)}
        </h2>

        <div className="w-24 h-[1px] bg-gold-400 mx-auto mb-6 opacity-60"></div>

        <p className="font-serif text-lg sm:text-2xl text-stone-200 leading-relaxed italic max-w-2xl mx-auto whitespace-pre-line">
          "{message}"
        </p>

        {wedding?.weddingHashtag && (
          <div className="mt-8 inline-block px-5 py-2 rounded-full bg-[#580D1A] border border-gold-500/40 text-gold-300 font-serif tracking-widest text-sm">
            {wedding.weddingHashtag}
          </div>
        )}
      </div>
    </section>
  );
};
