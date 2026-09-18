import React from 'react';
import { getTranslation } from '../../translations/i18n';
import { TraditionalDivider } from '../common/TraditionalOrnaments';

export const FamilySection = ({ familyMembers = [], language = 'en' }) => {
  if (!familyMembers || familyMembers.length === 0) return null;

  const brideFamily = familyMembers.filter((f) => f.side === 'bride' || f.side === 'both');
  const groomFamily = familyMembers.filter((f) => f.side === 'groom');

  return (
    <section id="family" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <TraditionalDivider text={getTranslation('ourFamilies', language)} />
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient mt-2">
          Pillars of Our Lives
        </h2>
        <p className="text-gold-200/80 font-sans max-w-md mx-auto mt-2 text-sm sm:text-base">
          Surrounded by the unconditional affection and blessings of our beloved elders and families.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Bride's Family */}
        {brideFamily.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#4A0A17] to-[#2D060E] border-2 border-gold-500/40 shadow-royal">
            <h3 className="font-serif text-2xl font-bold text-gold-300 text-center mb-6 pb-2 border-b border-gold-500/20">
              {getTranslation('brideFamily', language)}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              {brideFamily.map((m, idx) => (
                <div key={m._id || idx} className="flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gold-400 p-0.5 bg-maroon-900 shadow-md mb-2">
                    <img
                      src={m.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'}
                      alt={m.name}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-stone-100">{m.name}</h4>
                  <p className="text-[11px] text-gold-300 font-sans">{m.relationship}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Groom's Family */}
        {groomFamily.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#4A0A17] to-[#2D060E] border-2 border-gold-500/40 shadow-royal">
            <h3 className="font-serif text-2xl font-bold text-gold-300 text-center mb-6 pb-2 border-b border-gold-500/20">
              {getTranslation('groomFamily', language)}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              {groomFamily.map((m, idx) => (
                <div key={m._id || idx} className="flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gold-400 p-0.5 bg-maroon-900 shadow-md mb-2">
                    <img
                      src={m.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'}
                      alt={m.name}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-stone-100">{m.name}</h4>
                  <p className="text-[11px] text-gold-300 font-sans">{m.relationship}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
