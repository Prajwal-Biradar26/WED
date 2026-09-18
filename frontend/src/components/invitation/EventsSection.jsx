import React from 'react';
import { MapPin, Navigation, Calendar, Clock, Shirt } from 'lucide-react';
import { generateGoogleMapsUrl, generateGoogleDirectionsUrl } from '../../services/mapsService';
import { getTranslation } from '../../translations/i18n';
import { TraditionalDivider } from '../common/TraditionalOrnaments';

export const EventsSection = ({ events = [], language = 'en' }) => {
  if (!events || events.length === 0) return null;

  return (
    <section id="events" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <TraditionalDivider text={getTranslation('weddingEvents', language)} />
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient mt-2">
          {getTranslation('joinCelebration', language)}
        </h2>
        <p className="text-gold-200/80 font-sans max-w-xl mx-auto mt-2 text-sm sm:text-base">
          Every ceremony is an auspicious celebration filled with Vedic hymns, vibrant hues, and sacred love.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, idx) => {
          const mapsUrl = event.googleMapsUrl || generateGoogleMapsUrl(event.venueName, event.venueAddress);
          const directionsUrl = event.googleDirectionsUrl || generateGoogleDirectionsUrl(event.venueName, event.venueAddress);
          const hasLocation = Boolean(mapsUrl && (event.venueName || event.venueAddress));

          return (
            <article
              key={event._id || idx}
              className="bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border-2 border-gold-500/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-gold-400 transition-all duration-300"
            >
              {/* Event Image Banner (if provided) */}
              {event.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A0A17] via-transparent to-black/30"></div>
                </div>
              )}

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Date & Time pill */}
                  <div className="flex flex-wrap items-center gap-3 text-gold-300 text-xs sm:text-sm font-sans mb-3">
                    <span className="flex items-center gap-1.5 bg-[#580D1A] px-3 py-1 rounded-full border border-gold-500/30">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      {new Date(event.date).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    {(event.startTime || event.endTime) && (
                      <span className="flex items-center gap-1.5 bg-[#580D1A] px-3 py-1 rounded-full border border-gold-500/30">
                        <Clock className="w-3.5 h-3.5 text-gold-400" />
                        {event.startTime} {event.endTime ? `– ${event.endTime}` : ''}
                      </span>
                    )}
                  </div>

                  {/* Event Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mb-2">
                    {event.name}
                  </h3>

                  {/* Event Description */}
                  {event.description && (
                    <p className="text-stone-300 text-sm font-sans leading-relaxed mb-4">
                      {event.description}
                    </p>
                  )}

                  {/* Dress Code */}
                  {event.dressCode && (
                    <div className="flex items-center gap-2 text-xs text-gold-300/90 font-sans mb-4 bg-maroon-950/60 p-2.5 rounded-lg border border-gold-500/20">
                      <Shirt className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>
                        <strong className="text-gold-200">Attire:</strong> {event.dressCode}
                      </span>
                    </div>
                  )}

                  {/* Venue Details */}
                  {(event.venueName || event.venueAddress) && (
                    <div className="border-t border-gold-500/20 pt-4 mt-2">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                        <div>
                          {event.venueName && (
                            <h4 className="font-serif text-lg font-semibold text-gold-200">
                              {event.venueName}
                            </h4>
                          )}
                          {event.venueAddress && (
                            <p className="text-stone-300 text-xs sm:text-sm font-sans mt-0.5">
                              {event.venueAddress}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Google Maps Action Buttons with target="_blank" and rel="noopener noreferrer" */}
                {hasLocation && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-4 border-t border-gold-500/20">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#580D1A] border border-gold-500/60 text-gold-300 hover:text-maroon-950 hover:bg-gold-400 text-xs font-serif font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
                    >
                      <MapPin className="w-4 h-4 text-gold-400 group-hover:text-maroon-950" />
                      <span>{getTranslation('viewLocation', language)}</span>
                    </a>

                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 hover:brightness-110 text-xs font-serif font-bold uppercase tracking-wider transition-all duration-200 shadow-gold-glow"
                    >
                      <Navigation className="w-4 h-4 text-maroon-950" />
                      <span>{getTranslation('getDirections', language)}</span>
                    </a>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
