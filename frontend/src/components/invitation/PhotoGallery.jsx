import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { getTranslation } from '../../translations/i18n';
import { TraditionalDivider } from '../common/TraditionalOrnaments';

export const PhotoGallery = ({ media = [], language = 'en' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const images = media.filter((m) => m.mediaType === 'image' || !m.mediaType);
  if (images.length === 0) return null;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'couple', label: 'Couple' },
    { id: 'pre-wedding', label: 'Pre-Wedding' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'preparation', label: 'Preparation' },
    { id: 'events', label: 'Ceremonies' },
    { id: 'family', label: 'Family' },
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <TraditionalDivider text={getTranslation('momentsCaptured', language)} />
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient mt-2">
          Glimpses of Joy
        </h2>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider transition-all duration-200 ${
              selectedCategory === cat.id
                ? 'bg-gold-500 text-maroon-950 font-bold shadow-gold-glow'
                : 'bg-[#580D1A]/80 text-gold-300 border border-gold-500/30 hover:border-gold-400'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry / Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {filteredImages.map((item, idx) => (
          <div
            key={item._id || idx}
            onClick={() => openLightbox(idx)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-gold-500/30 shadow-royal aspect-[4/5] bg-maroon-950"
          >
            <img
              src={item.url}
              alt={item.title || 'Wedding moment'}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="text-stone-100">
                <p className="font-serif text-base font-semibold">{item.title || 'Sacred Memory'}</p>
                <span className="text-[10px] text-gold-300 uppercase tracking-widest">
                  Tap to view
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-gold-400 hover:text-white p-2 z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 text-gold-400 hover:text-white p-3 rounded-full bg-black/50 hover:bg-black/80 z-50"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-gold-500/40 shadow-2xl"
            />
            {filteredImages[lightboxIndex].title && (
              <p className="text-gold-200 font-serif text-lg mt-4 text-center">
                {filteredImages[lightboxIndex].title}
              </p>
            )}
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 text-gold-400 hover:text-white p-3 rounded-full bg-black/50 hover:bg-black/80 z-50"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
};
