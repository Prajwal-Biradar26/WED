import React from 'react';
import { KrishnaRukminiArtwork, GaneshaArtwork, PeacockFeatherDivider } from '../common/DivineDeities';
import { DiyaOrnament, KalashOrnament } from '../common/TraditionalOrnaments';

export const DivineBlessingsSection = ({ language = 'en' }) => {
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <PeacockFeatherDivider title="॥ दिव्य आशीर्वाद ॥ DIVINE BLESSINGS" />

      {/* Divine Krishna-Rukmini Sacred Union Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#3D0A14] via-[#4A0A17] to-[#25050C] border-2 border-gold-500/50 shadow-2xl p-6 sm:p-12 overflow-hidden">
        {/* Subtle background divine glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Traditional Deity Painting & Arch */}
          <div className="relative flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl overflow-hidden border-4 border-gold-500/60 shadow-gold-glow bg-[#2D060E] p-2">
              <img
                src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80"
                alt="Lord Krishna and Rukmini Devi Divine Blessings"
                className="w-full h-80 object-cover object-center rounded-2xl filter brightness-95"
              />
              <div className="text-center pt-3 pb-1">
                <p className="font-serif text-gold-300 font-bold text-sm tracking-widest uppercase">
                  ॥ श्री कृष्ण-रुक्मिणी विवाह संस्मरणम् ॥
                </p>
                <p className="text-[11px] text-gold-200/80 font-sans">
                  The Eternal Paradigm of Divine Devotion & Sacred Matrimony
                </p>
              </div>
            </div>
          </div>

          {/* Right: Sacred Verses & Vedic Blessings */}
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#580D1A] border border-gold-400/40 text-gold-300 text-xs font-serif uppercase tracking-widest">
              <span>🪷</span>
              <span>Rukmini Kalyanam Grace</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-gradient leading-tight">
              Bound by Dharma, <br />
              Blessed by the Divine.
            </h3>

            {/* Sacred Shlokas Box */}
            <div className="p-5 rounded-2xl bg-black/40 border border-gold-500/30 text-stone-200 font-serif space-y-3">
              <p className="text-gold-300 text-sm sm:text-base font-semibold italic text-center">
                "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः। <br />
                तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥"
              </p>
              <div className="w-16 h-[1px] bg-gold-400/40 mx-auto"></div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans text-center">
                Just as the celestial union of Lord Sri Krishna and Devi Rukmini illuminates the universe with auspiciousness, may this sacred wedlock be adorned with lifelong affection, harmony, and prosperity.
              </p>
            </div>

            {/* Four Purusharthas Blessings */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-2">
              {[
                { s: 'धर्म', e: 'Dharma', d: 'Righteousness' },
                { s: 'अर्थ', e: 'Artha', d: 'Prosperity' },
                { s: 'काम', e: 'Kama', d: 'Love & Joy' },
                { s: 'मोक्ष', e: 'Moksha', d: 'Spiritual Peace' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#580D1A]/60 border border-gold-500/30">
                  <span className="font-serif text-gold-300 font-bold text-base block">{item.s}</span>
                  <span className="text-[10px] uppercase tracking-wider text-stone-300 block">{item.e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
