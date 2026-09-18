import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer = ({ audioUrl, title = 'Traditional Shehnai Melodies', autoPlayTrigger = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // Fallback royalty-free Indian classical flute / shehnai stream if no URL provided
  const source = audioUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-flute-meditation-112194.mp3';

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => {
          console.warn('Audio play restricted by browser:', err);
        });
    }
  };

  // Start music smoothly when envelope is opened (which counts as user gesture)
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !hasInteracted) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // Browser prevented autoplay without prior click, keep muted icon
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger, hasInteracted]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <audio ref={audioRef} src={source} loop preload="auto" />

      {/* Floating Indian Classical Music Button */}
      <button
        onClick={togglePlay}
        title={isPlaying ? 'Pause Wedding Music' : 'Play Auspicious Music'}
        className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full shadow-gold-glow backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? 'bg-gold-500 text-maroon-950 font-medium'
            : 'bg-maroon-900/90 text-gold-400 border border-gold-500/50 hover:bg-maroon-800'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-serif tracking-wider hidden sm:inline">
              {title}
            </span>
            {/* Animated sound wave bars */}
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-maroon-950 animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-0.5 bg-maroon-950 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-0.5 bg-maroon-950 animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-5 h-5" />
            <span className="text-xs font-serif tracking-wider hidden sm:inline">
              Music Muted
            </span>
          </>
        )}
      </button>
    </div>
  );
};
