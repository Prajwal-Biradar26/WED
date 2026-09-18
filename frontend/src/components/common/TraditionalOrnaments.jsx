import React from 'react';

// Ornate Golden Mandala
export const MandalaOrnament = ({ className = 'w-16 h-16 text-gold-500 opacity-90', size = 64 }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.8" />
    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" />
    <circle cx="50" cy="50" r="6" fill="currentColor" />
    {/* 8-fold symmetrical petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 50 50)`}>
        <path
          d="M50 20 C46 30 46 40 50 50 C54 40 54 30 50 20 Z"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M50 10 C42 22 44 38 50 50 C56 38 58 22 50 10 Z"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle cx="50" cy="14" r="2" fill="currentColor" />
      </g>
    ))}
  </svg>
);

// Auspicious Brass Diya with Flame
export const DiyaOrnament = ({ className = 'w-10 h-10 text-gold-500' }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Flame glow */}
    <path
      d="M32 6 C32 6 25 18 25 25 C25 29 28 32 32 32 C36 32 39 29 39 25 C39 18 32 6 32 6 Z"
      fill="#F59E0B"
      className="animate-pulse"
    />
    <path
      d="M32 14 C32 14 28 21 28 25 C28 27.5 29.8 29.5 32 29.5 C34.2 29.5 36 27.5 36 25 C36 21 32 14 32 14 Z"
      fill="#FDE047"
    />
    {/* Brass Lamp Bowl */}
    <path
      d="M10 32 C12 44 22 50 32 50 C42 50 52 44 54 32 C54 32 40 37 32 37 C24 37 10 32 10 32 Z"
      fill="currentColor"
      stroke="#B88D27"
      strokeWidth="1.5"
    />
    {/* Lamp Pedestal */}
    <path d="M28 50 L26 56 L38 56 L36 50 Z" fill="currentColor" stroke="#B88D27" strokeWidth="1" />
    <rect x="20" y="56" width="24" height="4" rx="2" fill="currentColor" />
  </svg>
);

// Sacred Kalash with Coconut and Mango Leaves
export const KalashOrnament = ({ className = 'w-12 h-12 text-gold-500' }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Coconut */}
    <path d="M26 18 C26 12 32 6 32 6 C32 6 38 12 38 18 Z" fill="#92400E" stroke="currentColor" strokeWidth="1" />
    {/* Mango Leaves */}
    <path d="M22 22 C14 18 16 10 16 10 C16 10 24 14 24 22 Z" fill="#15803D" opacity="0.8" />
    <path d="M42 22 C50 18 48 10 48 10 C48 10 40 14 40 22 Z" fill="#15803D" opacity="0.8" />
    {/* Kalash Pot */}
    <path
      d="M22 24 L42 24 C44 26 48 30 48 36 C48 46 38 52 32 52 C26 52 16 46 16 36 C16 30 20 26 22 24 Z"
      fill="currentColor"
      stroke="#B88D27"
      strokeWidth="1.5"
    />
    {/* Swastika/Auspicious marking */}
    <circle cx="32" cy="38" r="4" fill="#800020" />
    {/* Base */}
    <path d="M24 52 L40 52 L38 58 L26 58 Z" fill="currentColor" stroke="#B88D27" />
  </svg>
);

// Sacred Lotus
export const LotusOrnament = ({ className = 'w-10 h-10 text-gold-500' }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 14 C30 24 28 36 32 44 C36 36 34 24 32 14 Z" fill="currentColor" fillOpacity="0.8" />
    <path d="M32 44 C24 40 16 32 14 22 C22 24 28 32 32 44 Z" fill="currentColor" fillOpacity="0.5" />
    <path d="M32 44 C40 40 48 32 50 22 C42 24 36 32 32 44 Z" fill="currentColor" fillOpacity="0.5" />
    <path d="M32 44 C20 46 12 40 8 32 C16 34 24 38 32 44 Z" fill="currentColor" fillOpacity="0.3" />
    <path d="M32 44 C44 46 52 40 56 32 C48 34 40 38 32 44 Z" fill="currentColor" fillOpacity="0.3" />
    <path d="M20 46 C26 50 38 50 44 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Traditional Golden Line Border with Lotus Center
export const TraditionalDivider = ({ text, className = 'my-6' }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-500 to-gold-400 opacity-60"></div>
    <div className="flex items-center gap-2 text-gold-400">
      <span className="text-xs">✦</span>
      {text ? <span className="font-serif tracking-widest text-sm uppercase px-2 font-medium">{text}</span> : <LotusOrnament className="w-6 h-6 text-gold-500" />}
      <span className="text-xs">✦</span>
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-500 to-gold-400 opacity-60"></div>
  </div>
);
