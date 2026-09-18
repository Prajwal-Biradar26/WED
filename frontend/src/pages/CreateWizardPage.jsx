import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Calendar,
  Heart,
  Image,
  Palette,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Eye,
  Plus,
  Trash2,
} from 'lucide-react';
import { weddingService, eventService, aiService } from '../services/api';
import { generateGoogleMapsUrl, generateGoogleDirectionsUrl } from '../services/mapsService';
import { TEMPLATES } from '../templates/templateStyles';
import { DiyaOrnament, MandalaOrnament } from '../components/common/TraditionalOrnaments';

export const CreateWizardPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiTone, setAiTone] = useState('traditional');
  const [error, setError] = useState('');

  // Main Form Data
  const [formData, setFormData] = useState({
    // Step 1: Couple Details
    brideName: 'Priya Kulkarni',
    groomName: 'Prajwal Patil',
    brideParents: 'Smt. Shailaja & Sri. Ramesh Kulkarni',
    groomParents: 'Smt. Sunanda & Sri. Mallikarjun Patil',
    brideBio: 'A passionate classical dancer and architect.',
    groomBio: 'A technology strategist with a love for Carnatic music.',
    bridePhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    groomPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    couplePhoto: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',

    // Step 2: Wedding Details
    weddingDate: '2026-12-25',
    weddingTime: '10:30 AM',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    language: 'en',
    weddingHashtag: '#PriyaWedsPrajwal',
    weddingDescription: 'Two souls, one sacred bond. Blessed by elders, we invite you to celebrate our holy matrimony.',
    welcomeMessage: 'With the divine blessings of Lord Ganesha and our parents, we invite you to join our sacred celebration.',
    closingMessage: 'Your loving presence and prayers are the greatest gift we could ever receive.',

    // Step 3: Template & Theme
    template: 'traditional-royal',
    musicTitle: 'Auspicious Classical Shehnai & Flute',
    musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-flute-meditation-112194.mp3',

    // Step 4: Events List
    events: [
      {
        name: 'Sacred Muhurtham (Wedding Ceremony)',
        description: 'Vedic rituals, Kanyadaana, Mangalasutra Dharana & Saptapadi vows.',
        date: '2026-12-25',
        startTime: '10:30 AM',
        endTime: '01:30 PM',
        dressCode: 'Traditional Silk Sarees & Dhotis',
        venueName: 'Sri Sai Convention Hall',
        venueAddress: 'Solapur Road, Vijayapura, Karnataka',
      },
      {
        name: 'Grand Wedding Reception',
        description: 'An evening of felicitation, royal feast, and celebration.',
        date: '2026-12-26',
        startTime: '07:00 PM',
        endTime: '11:00 PM',
        dressCode: 'Royal Ethnic & Evening Formal',
        venueName: 'The Leela Palace Grand Ballroom',
        venueAddress: 'Old Airport Road, Bengaluru, Karnataka',
      },
    ],
  });

  // AI Content Generator handler
  const handleAIGenerate = async () => {
    setAiGenerating(true);
    setError('');

    try {
      const res = await aiService.generateContent({
        brideName: formData.brideName,
        groomName: formData.groomName,
        weddingDate: formData.weddingDate,
        city: formData.city,
        tone: aiTone,
        language: formData.language,
      });

      if (res.data?.success && res.data?.data) {
        const gen = res.data.data;
        setFormData((prev) => ({
          ...prev,
          welcomeMessage: gen.welcomeMessage || prev.welcomeMessage,
          weddingDescription: gen.invitationMessage || prev.weddingDescription,
          closingMessage: gen.closingMessage || prev.closingMessage,
          brideBio: gen.coupleIntroduction || prev.brideBio,
        }));
      }
    } catch (err) {
      console.warn('AI generation error:', err);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAddEvent = () => {
    setFormData((prev) => ({
      ...prev,
      events: [
        ...prev.events,
        {
          name: 'Mehendi & Sangeet Celebration',
          description: 'Henna, folk dance, and music.',
          date: prev.weddingDate,
          startTime: '06:00 PM',
          endTime: '10:00 PM',
          dressCode: 'Festive Indo-Western',
          venueName: '',
          venueAddress: '',
        },
      ],
    }));
  };

  const handleRemoveEvent = (index) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index),
    }));
  };

  const handleEventChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.events];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, events: updated };
    });
  };

  const handleFinalPublish = async (shouldPublish = true) => {
    setIsSubmitting(true);
    setError('');

    try {
      // 1. Create Wedding Record
      const weddingPayload = {
        ...formData,
        status: shouldPublish ? 'published' : 'draft',
      };

      const res = await weddingService.createWedding(weddingPayload);
      if (res.data?.success) {
        const newWedding = res.data.data;

        // 2. Create Events
        for (const ev of formData.events) {
          await eventService.createEvent(newWedding._id, {
            ...ev,
            googleMapsUrl: generateGoogleMapsUrl(ev.venueName, ev.venueAddress),
            googleDirectionsUrl: generateGoogleDirectionsUrl(ev.venueName, ev.venueAddress),
          });
        }

        // Navigate to public page or dashboard
        if (shouldPublish) {
          navigate(`/w/${newWedding.slug}`);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating wedding invitation.');
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, title: 'Couple' },
    { num: 2, title: 'Details' },
    { num: 3, title: 'Template' },
    { num: 4, title: 'Events & Maps' },
    { num: 5, title: 'Publish' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D060E] via-[#3B0811] to-[#1A0307] text-stone-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Wizard Header */}
        <div className="text-center mb-8">
          <DiyaOrnament className="w-10 h-10 text-gold-400 mx-auto mb-2" />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient">
            Create Wedding Invitation
          </h1>
          <p className="text-stone-300 font-sans text-xs sm:text-sm mt-1">
            Follow the guided steps to craft your luxury traditional digital card.
          </p>

          {/* Steps Progress Indicator */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 overflow-x-auto py-2">
            {stepsList.map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <button
                  onClick={() => setStep(s.num)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-serif text-xs font-bold transition-all ${
                    step === s.num
                      ? 'bg-gold-500 text-maroon-950 shadow-gold-glow scale-110'
                      : step > s.num
                      ? 'bg-green-700 text-white'
                      : 'bg-[#580D1A] text-gold-300 border border-gold-500/40'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </button>
                <span
                  className={`text-xs font-serif uppercase tracking-wider hidden sm:inline ${
                    step === s.num ? 'text-gold-300 font-bold' : 'text-stone-400'
                  }`}
                >
                  {s.title}
                </span>
                {s.num < stepsList.length && (
                  <span className="text-gold-500/40 text-xs hidden sm:inline">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-900/60 border border-red-500/50 text-red-200 text-xs font-sans">
            {error}
          </div>
        )}

        {/* STEP 1: Couple Details */}
        {step === 1 && (
          <div className="bg-gradient-to-b from-[#4A0A17] to-[#2B050E] p-6 sm:p-10 rounded-3xl border-2 border-gold-500/40 shadow-royal space-y-6">
            <h2 className="font-serif text-2xl font-bold text-gold-gradient border-b border-gold-500/30 pb-3">
              1. Bride & Groom Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Bride Details */}
              <div className="space-y-4 p-4 rounded-2xl bg-black/20 border border-gold-500/20">
                <h3 className="font-serif text-lg font-bold text-gold-300">The Bride</h3>
                <div>
                  <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Bride Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.brideName}
                    onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Bride's Parents</label>
                  <input
                    type="text"
                    value={formData.brideParents}
                    onChange={(e) => setFormData({ ...formData, brideParents: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Bride Photo URL</label>
                  <input
                    type="url"
                    value={formData.bridePhoto}
                    onChange={(e) => setFormData({ ...formData, bridePhoto: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Bride Short Bio</label>
                  <textarea
                    rows="2"
                    value={formData.brideBio}
                    onChange={(e) => setFormData({ ...formData, brideBio: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Groom Details */}
              <div className="space-y-4 p-4 rounded-2xl bg-black/20 border border-gold-500/20">
                <h3 className="font-serif text-lg font-bold text-gold-300">The Groom</h3>
                <div>
                  <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Groom Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.groomName}
                    onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Groom's Parents</label>
                  <input
                    type="text"
                    value={formData.groomParents}
                    onChange={(e) => setFormData({ ...formData, groomParents: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Groom Photo URL</label>
                  <input
                    type="url"
                    value={formData.groomPhoto}
                    onChange={(e) => setFormData({ ...formData, groomPhoto: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Groom Short Bio</label>
                  <textarea
                    rows="2"
                    value={formData.groomBio}
                    onChange={(e) => setFormData({ ...formData, groomBio: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif uppercase text-gold-200 mb-1">
                Couple Hero Photo URL
              </label>
              <input
                type="url"
                value={formData.couplePhoto}
                onChange={(e) => setFormData({ ...formData, couplePhoto: e.target.value })}
                className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Next: Wedding Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Wedding Details & AI Writer */}
        {step === 2 && (
          <div className="bg-gradient-to-b from-[#4A0A17] to-[#2B050E] p-6 sm:p-10 rounded-3xl border-2 border-gold-500/40 shadow-royal space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold-500/30 pb-3">
              <h2 className="font-serif text-2xl font-bold text-gold-gradient">
                2. Wedding Details & Content
              </h2>

              {/* AI Writer Tool */}
              <div className="flex items-center gap-2">
                <select
                  value={aiTone}
                  onChange={(e) => setAiTone(e.target.value)}
                  className="bg-black/40 border border-gold-500/40 rounded-full px-3 py-1.5 text-xs text-gold-300 font-serif"
                >
                  <option value="traditional">Traditional Tone</option>
                  <option value="romantic">Romantic Tone</option>
                  <option value="royal">Royal Tone</option>
                  <option value="elegant">Elegant Tone</option>
                  <option value="simple">Simple Tone</option>
                </select>
                <button
                  type="button"
                  onClick={handleAIGenerate}
                  disabled={aiGenerating}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow hover:brightness-110"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{aiGenerating ? 'Generating...' : '✨ AI Writer'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Wedding Date *</label>
                <input
                  type="date"
                  required
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Wedding Time</label>
                <input
                  type="text"
                  value={formData.weddingTime}
                  onChange={(e) => setFormData({ ...formData, weddingTime: e.target.value })}
                  className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm text-stone-100"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi (हिन्दी)</option>
                  <option value="kn">Kannada (ಕನ್ನಡ)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif uppercase text-gold-200 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-serif uppercase text-gold-200 mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-serif uppercase text-gold-200 mb-1">Hashtag</label>
                <input
                  type="text"
                  value={formData.weddingHashtag}
                  onChange={(e) => setFormData({ ...formData, weddingHashtag: e.target.value })}
                  className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif uppercase text-gold-200 mb-1">
                Welcome Message (Editable)
              </label>
              <textarea
                rows="2"
                value={formData.welcomeMessage}
                onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-serif uppercase text-gold-200 mb-1">
                Wedding Invitation Description
              </label>
              <textarea
                rows="2"
                value={formData.weddingDescription}
                onChange={(e) => setFormData({ ...formData, weddingDescription: e.target.value })}
                className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-sm resize-none"
              ></textarea>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-2.5 rounded-full border border-gold-500/40 text-gold-300 font-serif text-xs uppercase flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Next: Choose Template</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Template Selection */}
        {step === 3 && (
          <div className="bg-gradient-to-b from-[#4A0A17] to-[#2B050E] p-6 sm:p-10 rounded-3xl border-2 border-gold-500/40 shadow-royal space-y-6">
            <h2 className="font-serif text-2xl font-bold text-gold-gradient border-b border-gold-500/30 pb-3">
              3. Select Traditional Indian Template
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Object.values(TEMPLATES).map((t) => (
                <div
                  key={t.id}
                  onClick={() => setFormData({ ...formData, template: t.id })}
                  className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    formData.template === t.id
                      ? 'border-gold-400 bg-[#580D1A] shadow-gold-glow scale-105'
                      : 'border-gold-500/30 bg-black/30 hover:border-gold-500/70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-gold-300">
                        {t.badge}
                      </span>
                      {formData.template === t.id && (
                        <CheckCircle className="w-5 h-5 text-gold-400" />
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-stone-100">{t.name}</h3>
                    <p className="text-stone-300 text-xs font-sans mt-2">{t.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: t.primaryColor }}></span>
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: t.accentColor }}></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-full border border-gold-500/40 text-gold-300 font-serif text-xs uppercase flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Next: Events & Venues</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Events & Google Maps Locations */}
        {step === 4 && (
          <div className="bg-gradient-to-b from-[#4A0A17] to-[#2B050E] p-6 sm:p-10 rounded-3xl border-2 border-gold-500/40 shadow-royal space-y-6">
            <div className="flex items-center justify-between border-b border-gold-500/30 pb-3">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gold-gradient">
                  4. Wedding Ceremonies & Venues
                </h2>
                <p className="text-xs text-gold-300/80 font-sans">
                  Google Maps URLs are automatically generated for every venue.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddEvent}
                className="px-4 py-2 rounded-full bg-[#580D1A] border border-gold-400 text-gold-300 text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold-500 hover:text-maroon-950"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="space-y-6">
              {formData.events.map((ev, index) => {
                const mapsPreview = generateGoogleMapsUrl(ev.venueName, ev.venueAddress);

                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-black/30 border border-gold-500/30 space-y-4 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
                        Event #{index + 1}
                      </span>
                      {formData.events.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEvent(index)}
                          className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-serif uppercase text-gold-200 mb-1">
                          Event Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={ev.name}
                          onChange={(e) => handleEventChange(index, 'name', e.target.value)}
                          className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-serif uppercase text-gold-200 mb-1">
                          Dress Code / Attire
                        </label>
                        <input
                          type="text"
                          value={ev.dressCode}
                          onChange={(e) => handleEventChange(index, 'dressCode', e.target.value)}
                          className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-serif uppercase text-gold-200 mb-1">
                          Date *
                        </label>
                        <input
                          type="date"
                          value={ev.date}
                          onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                          className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-sm text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-serif uppercase text-gold-200 mb-1">
                          Start Time
                        </label>
                        <input
                          type="text"
                          value={ev.startTime}
                          onChange={(e) => handleEventChange(index, 'startTime', e.target.value)}
                          className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-serif uppercase text-gold-200 mb-1">
                          End Time
                        </label>
                        <input
                          type="text"
                          value={ev.endTime}
                          onChange={(e) => handleEventChange(index, 'endTime', e.target.value)}
                          className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-sm"
                        />
                      </div>
                    </div>

                    {/* Venue & Google Maps Integration */}
                    <div className="p-4 rounded-xl bg-maroon-950/50 border border-gold-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-gold-300 text-xs font-serif uppercase">
                        <MapPin className="w-4 h-4 text-gold-400" />
                        <span>Venue & Google Maps Navigation</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-stone-300 mb-1">Venue Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Sri Sai Convention Hall"
                            value={ev.venueName}
                            onChange={(e) => handleEventChange(index, 'venueName', e.target.value)}
                            className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-stone-300 mb-1">Venue Address</label>
                          <input
                            type="text"
                            placeholder="e.g. Solapur Road, Vijayapura, Karnataka"
                            value={ev.venueAddress}
                            onChange={(e) => handleEventChange(index, 'venueAddress', e.target.value)}
                            className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-sm"
                          />
                        </div>
                      </div>

                      {mapsPreview && (
                        <div className="flex items-center justify-between bg-black/30 p-2.5 rounded-lg text-xs">
                          <span className="text-green-400 flex items-center gap-1 font-sans">
                            ✓ Google Maps location link generated
                          </span>
                          <a
                            href={mapsPreview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold-300 underline font-serif hover:text-gold-200"
                          >
                            Open Google Maps
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-full border border-gold-500/40 text-gold-300 font-serif text-xs uppercase flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Next: Review & Publish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Publish */}
        {step === 5 && (
          <div className="bg-gradient-to-b from-[#4A0A17] to-[#2B050E] p-6 sm:p-10 rounded-3xl border-2 border-gold-500/40 shadow-royal space-y-6 text-center">
            <MandalaOrnament size={70} className="w-16 h-16 text-gold-400 mx-auto" />
            <h2 className="font-serif text-3xl font-bold text-gold-gradient">
              Ready to Publish Your Royal Invitation!
            </h2>
            <p className="text-stone-300 font-sans text-sm max-w-md mx-auto">
              Your digital wedding invitation will be live instantly with a unique URL, animated envelope opening, Google Maps locations, and WhatsApp sharing.
            </p>

            <div className="p-6 rounded-2xl bg-black/40 border border-gold-500/30 max-w-md mx-auto text-left space-y-2 text-xs font-sans">
              <p>
                <strong className="text-gold-300">Couple:</strong> {formData.brideName} & {formData.groomName}
              </p>
              <p>
                <strong className="text-gold-300">Wedding Date:</strong> {formData.weddingDate}
              </p>
              <p>
                <strong className="text-gold-300">Location:</strong> {formData.city}, {formData.state}
              </p>
              <p>
                <strong className="text-gold-300">Template:</strong> {TEMPLATES[formData.template]?.name}
              </p>
              <p>
                <strong className="text-gold-300">Ceremonies:</strong> {formData.events.length} events configured
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleFinalPublish(true)}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 text-maroon-950 font-serif font-bold text-sm uppercase tracking-widest shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Publishing...' : '✨ PUBLISH INVITATION'}</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleFinalPublish(false)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#580D1A] border border-gold-500/60 text-gold-300 font-serif font-bold text-xs uppercase tracking-wider hover:bg-gold-500 hover:text-maroon-950 transition-all"
              >
                Save as Draft
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
