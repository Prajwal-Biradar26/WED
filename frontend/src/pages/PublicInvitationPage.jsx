import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Globe, Sparkles } from 'lucide-react';
import { weddingService } from '../services/api';
import { EnvelopeOpening } from '../components/invitation/EnvelopeOpening';
import { HeroSection } from '../components/invitation/HeroSection';
import { DivineBlessingsSection } from '../components/invitation/DivineBlessingsSection';
import { WelcomeSection } from '../components/invitation/WelcomeSection';
import { BrideGroomSection } from '../components/invitation/BrideGroomSection';
import { CountdownTimer } from '../components/invitation/CountdownTimer';
import { EventsSection } from '../components/invitation/EventsSection';
import { VenueSection } from '../components/invitation/VenueSection';
import { StoryTimeline } from '../components/invitation/StoryTimeline';
import { PhotoGallery } from '../components/invitation/PhotoGallery';
import { VideoGallery } from '../components/invitation/VideoGallery';
import { FamilySection } from '../components/invitation/FamilySection';
import { GuestbookSection } from '../components/invitation/GuestbookSection';
import { MusicPlayer } from '../components/invitation/MusicPlayer';
import { WhatsAppShareModal } from '../components/invitation/WhatsAppShareModal';
import { TEMPLATES } from '../templates/templateStyles';
import { languages } from '../translations/i18n';
import { MandalaOrnament, DiyaOrnament } from '../components/common/TraditionalOrnaments';
import { GaneshaArtwork } from '../components/common/DivineDeities';

export const PublicInvitationPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const fetchWedding = async () => {
      try {
        setLoading(true);
        // If no slug in URL, default to preloaded royal Indian sample wedding
        const res = await weddingService.getPublicWedding(slug || 'prajwal-and-priya');
        if (res.data?.success) {
          setData(res.data.data);
          if (res.data.data.wedding?.language) {
            setLanguage(res.data.data.wedding.language);
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Wedding invitation not found or is currently private.');
      } finally {
        setLoading(false);
      }
    };

    fetchWedding();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#24040A] text-gold-400 p-4 text-center">
        <MandalaOrnament size={90} className="w-20 h-20 text-gold-400 animate-spin-slow mb-4" />
        <h2 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-bold">
          ॥ शुभ विवाह ॥
        </h2>
        <p className="text-gold-200/80 font-sans text-sm mt-2">
          Seeking divine blessings of Lord Ganesha & Lord Krishna...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#24040A] text-stone-200 p-6 text-center">
        <div className="p-8 rounded-3xl bg-[#4A0A17] border border-gold-500/40 max-w-md shadow-2xl">
          <DiyaOrnament className="w-16 h-16 text-gold-400 mx-auto mb-4" />
          <h1 className="font-serif text-3xl font-bold text-gold-gradient mb-2">
            Invitation Unavailable
          </h1>
          <p className="text-stone-300 font-sans text-sm mb-6">{error}</p>
        </div>
      </div>
    );
  }

  const { wedding, events, story, media, familyMembers, guestbookMessages } = data;
  const templateConfig = TEMPLATES[wedding.template] || TEMPLATES['traditional-royal'];

  return (
    <div className={`min-h-screen ${templateConfig.bg} text-stone-100 selection:bg-gold-500 selection:text-maroon-950 overflow-x-hidden relative`}>
      {/* 1. Traditional Envelope Opening Experience */}
      {!isOpened && (
        <EnvelopeOpening
          wedding={wedding}
          language={language}
          onOpen={() => setIsOpened(true)}
        />
      )}

      {/* Floating Header Controls: Language switcher & WhatsApp Share */}
      <header className="fixed top-4 right-4 z-40 flex items-center gap-2">
        {/* Language selector */}
        <div className="flex items-center bg-[#4A0A17]/85 backdrop-blur-md border border-gold-500/40 rounded-full px-2.5 py-1 text-xs text-gold-300 shadow-md">
          <Globe className="w-3.5 h-3.5 mr-1 text-gold-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent border-none focus:outline-none cursor-pointer font-serif uppercase tracking-wider text-xs"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code} className="bg-maroon-950 text-gold-200">
                {l.native}
              </option>
            ))}
          </select>
        </div>

        {/* WhatsApp Share Button */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="p-2.5 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-bold shadow-gold-glow hover:brightness-110 transition-all flex items-center gap-1.5 text-xs font-serif"
          title="Share Invitation with Family"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </header>

      {/* 2. Hero Section (No RSVP button, authentic Indian couple & Ganesha invocation) */}
      <HeroSection wedding={wedding} language={language} />

      {/* 3. Divine Sri Krishna & Rukmini Kalyanam Section */}
      <DivineBlessingsSection language={language} />

      {/* 4. Welcome Section with Parents' Blessings */}
      <WelcomeSection wedding={wedding} language={language} />

      {/* 5. Bride & Groom Portrait Section */}
      <BrideGroomSection wedding={wedding} language={language} />

      {/* 6. Auspicious Muhurtham Countdown Section */}
      <CountdownTimer weddingDate={wedding.weddingDate} language={language} />

      {/* 7. Wedding Ceremonies & Unlimited Events (With working Google Maps buttons) */}
      <EventsSection events={events} language={language} />

      {/* 8. Dedicated "Where We Celebrate" Venue Section with Google Maps Search & Directions */}
      <VenueSection events={events} wedding={wedding} language={language} />

      {/* 9. Love Story Timeline */}
      <StoryTimeline milestones={story} language={language} />

      {/* 10. Indian Wedding Photo Moments with Lightbox */}
      <PhotoGallery media={media} language={language} />

      {/* 11. Cinematic Video Moments */}
      <VideoGallery wedding={wedding} media={media} language={language} />

      {/* 12. Traditional Family Section (Parents & Elders) */}
      <FamilySection familyMembers={familyMembers} language={language} />

      {/* 13. Optional Live Stream Section */}
      {wedding.liveStreamUrl && (
        <section className="py-16 px-4 max-w-4xl mx-auto text-center">
          <div className="p-8 rounded-3xl bg-[#4A0A17] border border-gold-500/40 shadow-royal">
            <span className="inline-block px-3 py-1 bg-red-600 text-white rounded-full text-xs font-serif font-bold uppercase tracking-widest mb-3 animate-pulse">
              🔴 Live Stream
            </span>
            <h3 className="font-serif text-3xl font-bold text-gold-gradient mb-4">
              Watch Our Wedding Live
            </h3>
            <p className="text-stone-300 font-sans text-sm mb-6">
              For loved ones joining us in spirit from afar, witness the sacred Vedic rituals in real time.
            </p>
            <a
              href={wedding.liveStreamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-serif font-bold text-xs uppercase tracking-widest shadow-lg transition-all"
            >
              Join Live Broadcast
            </a>
          </div>
        </section>
      )}

      {/* 14. Guestbook Blessings & Prayers ("Bless the Couple") */}
      <GuestbookSection wedding={wedding} blessings={guestbookMessages} language={language} />

      {/* 15. Sacred Closing Footer */}
      <footer className="py-16 px-4 text-center border-t border-gold-500/20 bg-[#160205]">
        <GaneshaArtwork className="w-14 h-14 text-gold-400 mx-auto mb-3" showShloka={false} />
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient mb-2">
          {wedding.brideName} & {wedding.groomName}
        </h2>
        <p className="text-stone-300 font-serif italic max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-4">
          "{wedding.closingMessage || 'Your love, prayers, and gracious presence will make our wedding day truly memorable and blessed.'}"
        </p>
        {wedding.weddingHashtag && (
          <p className="text-gold-400 font-serif tracking-widest text-sm font-semibold mb-6">
            {wedding.weddingHashtag}
          </p>
        )}
        <div className="flex items-center justify-center gap-2 text-gold-400 text-xs font-serif">
          <span>🪔</span>
          <span>शुभ विवाह · मंगलमय जीवन</span>
          <span>🪔</span>
        </div>
      </footer>

      {/* 16. Background Classical Shehnai / Bansuri Floating Player */}
      <MusicPlayer
        audioUrl={wedding.musicUrl}
        title={wedding.musicTitle}
        autoPlayTrigger={isOpened}
      />

      {/* 17. WhatsApp Share Modal */}
      <WhatsAppShareModal
        wedding={wedding}
        language={language}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};
