import React, { useState, useEffect } from 'react';
import { getTranslation } from '../../translations/i18n';
import { TraditionalDivider } from '../common/TraditionalOrnaments';

export const CountdownTimer = ({ weddingDate, language = 'en' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPast: false,
  });

  useEffect(() => {
    if (!weddingDate) return;

    const targetTime = new Date(weddingDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        // Check if within 24 hours (wedding day)
        if (Math.abs(diff) < 24 * 60 * 60 * 1000) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, isPast: true });
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false, isPast: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto text-center">
      <TraditionalDivider text={getTranslation('countingEveryMoment', language)} />

      {timeLeft.isToday ? (
        <div className="p-8 rounded-2xl bg-[#580D1A]/60 border border-gold-500/50 shadow-gold-glow animate-bounce">
          <h3 className="font-serif text-3xl sm:text-4xl text-gold-400 font-bold">
            {getTranslation('celebrationBegun', language)}
          </h3>
          <p className="text-stone-200 mt-2 font-sans">
            The auspicious ceremonies are unfolding today. Please join our holy festivities!
          </p>
        </div>
      ) : timeLeft.isPast ? (
        <div className="p-8 rounded-2xl bg-[#580D1A]/60 border border-gold-500/50">
          <h3 className="font-serif text-2xl sm:text-3xl text-gold-300">
            {getTranslation('celebrationOngoing', language)}
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto mt-6">
          {[
            { label: getTranslation('days', language), value: timeLeft.days },
            { label: getTranslation('hours', language), value: timeLeft.hours },
            { label: getTranslation('minutes', language), value: timeLeft.minutes },
            { label: getTranslation('seconds', language), value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-[#4A0A17] to-[#2D060E] border border-gold-500/40 rounded-xl p-3 sm:p-5 shadow-royal text-center transform hover:scale-105 transition-transform"
            >
              <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-gold-gradient block">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-sans tracking-widest text-gold-200/80 mt-1 block">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
