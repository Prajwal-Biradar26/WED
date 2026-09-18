import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { generateGoogleMapsUrl, generateGoogleDirectionsUrl } from '../../services/mapsService';
import { getTranslation } from '../../translations/i18n';
import { TraditionalDivider } from '../common/TraditionalOrnaments';

export const VenueSection = ({ events = [], wedding, language = 'en' }) => {
  // Extract unique venues from events
  const venues = events
    .filter((e) => e.venueName || e.venueAddress)
    .reduce((acc, curr) => {
      const key = `${curr.venueName}-${curr.venueAddress}`;
      if (!acc.some((item) => `${item.venueName}-${item.venueAddress}` === key)) {
        acc.push(curr);
      }
      return acc;
    }, []);

  if (venues.length === 0) return null;

  return (
    <section id="venue" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <TraditionalDivider text="Auspicious Venues" />
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">
          Where We Celebrate
        </h2>
        <p className="text-gold-200/80 font-sans max-w-xl mx-auto mt-2 text-sm sm:text-base">
          Join us at these magnificent halls to bestow your blessings upon the newlyweds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {venues.map((v, i) => {
          const mapsUrl = v.googleMapsUrl || generateGoogleMapsUrl(v.venueName, v.venueAddress);
          const directionsUrl = v.googleDirectionsUrl || generateGoogleDirectionsUrl(v.venueName, v.venueAddress);

          return (
            <div
              key={i}
              className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#3B0811] via-[#4A0A17] to-[#25050C] border-2 border-gold-500/40 shadow-royal flex flex-col justify-between"
            >
              {/* Traditional Gold Arch Ornament at top */}
              <div className="flex items-center gap-2 mb-4 text-gold-400">
                <span className="text-xl">🏛️</span>
                <span className="font-serif text-xs uppercase tracking-widest text-gold-300">
                  {v.name || 'Wedding Celebration Venue'}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mb-2">
                  {v.venueName || 'Celebration Hall'}
                </h3>
                <p className="text-stone-300 font-sans text-sm leading-relaxed mb-6 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                  <span>{v.venueAddress || `${wedding?.city}, ${wedding?.state}`}</span>
                </p>
              </div>

              {mapsUrl && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gold-500/20">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#580D1A] border border-gold-500/60 text-gold-300 hover:bg-gold-400 hover:text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{getTranslation('viewLocation', language)}</span>
                  </a>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{getTranslation('getDirections', language)}</span>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
