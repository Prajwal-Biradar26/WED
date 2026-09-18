import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { getTranslation } from '../../translations/i18n';
import { TraditionalDivider } from '../common/TraditionalOrnaments';

export const VideoGallery = ({ wedding, media = [], language = 'en' }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  const cinematicUrl = wedding?.cinematicVideoUrl;
  const videos = media.filter((m) => m.mediaType === 'video');

  if (!cinematicUrl && videos.length === 0) return null;

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <TraditionalDivider text={getTranslation('cinematicJourney', language)} />
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient mt-2">
          Cinematic Moments
        </h2>
      </div>

      {/* Hero Cinematic Video */}
      {cinematicUrl && (
        <div className="relative rounded-3xl overflow-hidden border-2 border-gold-500/50 shadow-2xl bg-black aspect-video max-w-4xl mx-auto mb-12">
          {activeVideo === 'main' ? (
            <video
              src={cinematicUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <div
              onClick={() => setActiveVideo('main')}
              className="group relative w-full h-full cursor-pointer flex items-center justify-center bg-stone-900"
            >
              {wedding?.couplePhoto && (
                <img
                  src={wedding.couplePhoto}
                  alt="Video cover"
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-maroon-950/40"></div>

              {/* Large Traditional Play Button */}
              <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-gold-500 to-yellow-400 text-maroon-950 flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 fill-maroon-950 translate-x-1" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Additional Videos Grid */}
      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videos.map((vid, idx) => (
            <div
              key={vid._id || idx}
              className="rounded-2xl overflow-hidden border border-gold-500/40 bg-[#3B0811] p-3 shadow-royal"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <video src={vid.url} controls preload="metadata" className="w-full h-full object-contain" />
              </div>
              {vid.title && (
                <p className="font-serif text-gold-200 text-base font-semibold mt-3 text-center">
                  {vid.title}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
