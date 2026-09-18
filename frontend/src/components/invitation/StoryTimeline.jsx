import React from 'react';
import { Heart } from 'lucide-react';
import { getTranslation } from '../../translations/i18n';
import { TraditionalDivider } from '../common/TraditionalOrnaments';

export const StoryTimeline = ({ milestones = [], language = 'en' }) => {
  if (!milestones || milestones.length === 0) return null;

  return (
    <section id="story" className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <TraditionalDivider text={getTranslation('ourStory', language)} />
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient mt-2">
          How Our Story Unfolded
        </h2>
        <p className="text-gold-200/80 font-sans max-w-md mx-auto mt-2 text-sm sm:text-base">
          From a destiny-guided beginning to the sacred threshold of eternity.
        </p>
      </div>

      <div className="relative">
        {/* Central golden vertical timeline thread */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500 via-gold-400 to-gold-600 -translate-x-1/2 opacity-70"></div>

        <div className="space-y-12">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item._id || index}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node icon */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#580D1A] border-2 border-gold-400 flex items-center justify-center text-gold-400 shadow-gold-glow z-10">
                  <Heart className="w-4 h-4 fill-gold-400" />
                </div>

                {/* Content Box */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    isEven ? 'md:pl-10 text-left' : 'md:pr-10 md:text-right'
                  }`}
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border border-gold-500/40 shadow-royal inline-block w-full">
                    {item.date && (
                      <span className="inline-block text-xs font-serif font-bold uppercase tracking-widest text-gold-400 bg-[#580D1A] px-3 py-1 rounded-full mb-3 border border-gold-500/30">
                        {item.date}
                      </span>
                    )}

                    <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-stone-300 text-sm font-sans leading-relaxed">
                      {item.description}
                    </p>

                    {item.photo && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-gold-500/30 max-h-56">
                        <img
                          src={item.photo}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
