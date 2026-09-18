import React from 'react';

// Sacred Golden Lord Ganesha Artwork & Blessing
export const GaneshaArtwork = ({ className = 'w-24 h-24 text-gold-400', showShloka = true }) => (
  <div className="flex flex-col items-center text-center">
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Divine Golden Halo */}
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
      <circle cx="100" cy="100" r="84" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="76" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />

      {/* Ornate Crown (Mukut) */}
      <path
        d="M80 60 L100 20 L120 60 L108 60 L100 45 L92 60 Z"
        fill="currentColor"
        stroke="#B88D27"
        strokeWidth="1.5"
      />
      <circle cx="100" cy="30" r="3.5" fill="#C41E3A" />
      <path d="M75 60 L125 60 L120 68 L80 68 Z" fill="currentColor" opacity="0.9" />

      {/* Ganesha Ears */}
      <path
        d="M75 70 C50 65 35 85 45 110 C52 125 68 125 78 118"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path
        d="M125 70 C150 65 165 85 155 110 C148 125 132 125 122 118"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.15"
      />

      {/* Head & Sacred Tilak */}
      <ellipse cx="100" cy="88" rx="26" ry="24" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
      {/* Red Chandan Tilak */}
      <path d="M96 74 Q100 68 104 74 Q100 86 96 74 Z" fill="#C41E3A" />
      <circle cx="100" cy="80" r="2" fill="#FFD700" />

      {/* Eyes */}
      <ellipse cx="88" cy="86" rx="4" ry="2.5" fill="currentColor" />
      <ellipse cx="112" cy="86" rx="4" ry="2.5" fill="currentColor" />

      {/* Divine Trunk (Vakratunda) curving gracefully to the left with Modak */}
      <path
        d="M100 98 Q102 125 90 135 Q76 142 68 132 Q62 122 72 118 Q80 115 82 122"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Golden Modak on Trunk Tip */}
      <circle cx="68" cy="116" r="6" fill="#F59E0B" stroke="#B88D27" strokeWidth="1" />
      <path d="M66 112 Q68 108 70 112 Z" fill="#FDE047" />

      {/* Single Tusk (Ekadanta) */}
      <path d="M112 104 L122 108 L114 112 Z" fill="#FFFDF6" stroke="#D4AF37" strokeWidth="1" />

      {/* Auspicious Swastika / Bell Ornament */}
      <circle cx="100" cy="155" r="8" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M100 147 L100 163 M92 155 L108 155" stroke="currentColor" strokeWidth="1.5" />
    </svg>

    {showShloka && (
      <div className="mt-3">
        <p className="font-serif text-gold-300 font-bold text-sm sm:text-base tracking-widest uppercase">
          ॥ श्री गणेशाय नमः ॥
        </p>
        <p className="font-serif text-gold-200/90 text-xs sm:text-sm italic mt-1 max-w-lg leading-relaxed">
          "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। <br className="hidden sm:inline" />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
        </p>
      </div>
    )}
  </div>
);

// Sacred Sri Krishna & Rukmini (Rukmini Kalyanam) Divine Artwork
export const KrishnaRukminiArtwork = ({ className = 'w-24 h-24 text-gold-400' }) => (
  <div className="flex flex-col items-center text-center">
    <svg
      viewBox="0 0 220 180"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Divine Prabhavali / Temple Arch */}
      <path
        d="M20 170 C20 70 60 20 110 20 C160 20 200 70 200 170"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="5 3"
        opacity="0.7"
      />
      <circle cx="110" cy="20" r="8" fill="currentColor" opacity="0.9" />

      {/* Peacock Feather (Mor Pankh) atop Krishna's Crown */}
      <g transform="translate(100, 10)">
        <ellipse cx="0" cy="12" rx="14" ry="20" fill="#0D5C3A" opacity="0.85" />
        <ellipse cx="0" cy="14" rx="9" ry="14" fill="#0284C7" />
        <ellipse cx="0" cy="16" rx="5" ry="8" fill="#F59E0B" />
        <circle cx="0" cy="17" r="3" fill="#4338CA" />
        <path d="M0 32 L0 45" stroke="currentColor" strokeWidth="2" />
      </g>

      {/* Krishna's Divine Bansuri (Flute) */}
      <g transform="translate(25, 80) rotate(-15)">
        <rect x="0" y="0" width="170" height="8" rx="4" fill="currentColor" stroke="#B88D27" strokeWidth="1.5" />
        {/* Flute Holes */}
        <circle cx="90" cy="4" r="1.5" fill="#3B0811" />
        <circle cx="105" cy="4" r="1.5" fill="#3B0811" />
        <circle cx="120" cy="4" r="1.5" fill="#3B0811" />
        <circle cx="135" cy="4" r="1.5" fill="#3B0811" />
        <circle cx="150" cy="4" r="1.5" fill="#3B0811" />
        {/* Hanging Floral Tassels */}
        <path d="M165 4 Q170 18 175 32" stroke="#F59E0B" strokeWidth="2" fill="none" />
        <circle cx="175" cy="34" r="3" fill="#C41E3A" />
      </g>

      {/* Sacred Tulsi Garland & Lotus */}
      <path
        d="M50 145 C75 165 145 165 170 145"
        stroke="#15803D"
        strokeWidth="3"
        strokeDasharray="4 2"
      />
      {/* Central Golden Lotus Motif */}
      <g transform="translate(110, 150)">
        <path d="M0 -15 C-6 -5 -12 5 0 10 C12 5 6 -5 0 -15 Z" fill="#F43F5E" opacity="0.9" />
        <path d="M0 10 C-10 8 -18 0 -15 -8 C-8 -4 -3 2 0 10 Z" fill="#FB7185" opacity="0.75" />
        <path d="M0 10 C10 8 18 0 15 -8 C8 -4 3 2 0 10 Z" fill="#FB7185" opacity="0.75" />
      </g>
    </svg>

    <div className="mt-3">
      <p className="font-serif text-gold-300 font-bold text-sm sm:text-base tracking-widest uppercase">
        ॥ रुक्मिणी कल्याणम् ॥
      </p>
      <p className="font-serif text-gold-200/90 text-xs sm:text-sm italic mt-1 max-w-xl leading-relaxed">
        "कृष्णाय वासुदेवाय हरये परमात्मने। <br className="hidden sm:inline" />
        प्रणत क्लेशनाशाय गोविन्दाय नमो नमः॥"
      </p>
    </div>
  </div>
);

// Auspicious Peacock Feather Decorative Divider
export const PeacockFeatherDivider = ({ title = '॥ शुभ विवाह ॥' }) => (
  <div className="flex items-center justify-center gap-4 my-8">
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-500 to-gold-400 opacity-60"></div>
    <div className="flex items-center gap-2 text-gold-400">
      <span className="text-sm">🪶</span>
      <span className="font-serif tracking-widest text-xs sm:text-sm uppercase px-2 font-bold text-gold-gradient">
        {title}
      </span>
      <span className="text-sm">🪶</span>
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-500 to-gold-400 opacity-60"></div>
  </div>
);
