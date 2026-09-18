import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { rsvpService } from '../../services/api';
import { getTranslation } from '../../translations/i18n';
import { TraditionalDivider } from '../common/TraditionalOrnaments';

export const RSVPForm = ({ wedding, events = [], language = 'en' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attending: 'attending',
    guestsCount: 1,
    foodPreference: 'vegetarian',
    eventsAttending: [],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEventCheckbox = (eventName) => {
    setFormData((prev) => {
      const exists = prev.eventsAttending.includes(eventName);
      return {
        ...prev,
        eventsAttending: exists
          ? prev.eventsAttending.filter((e) => e !== eventName)
          : [...prev.eventsAttending, eventName],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const payload = {
        weddingId: wedding._id,
        ...formData,
      };

      const res = await rsvpService.submitRSVP(payload);

      if (res.data?.success) {
        setSuccessMessage(res.data.message || 'Your RSVP has been joyfully received! 🙏❤️');

        // Confetti celebration
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#FFD700', '#FF4500', '#580D1A'],
          });
        } catch (confettiErr) {
          console.warn(confettiErr);
        }
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Unable to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-16 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <TraditionalDivider text="Grace Us With Your Presence" />
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient mt-2">
          {getTranslation('willYouAttend', language)}
        </h2>
        <p className="text-gold-200/80 font-sans text-sm sm:text-base mt-2">
          Kindly confirm your attendance by submitting your RSVP response below.
        </p>
      </div>

      <div className="bg-gradient-to-b from-[#4A0A17] to-[#28050C] p-6 sm:p-10 rounded-3xl border-2 border-gold-500/40 shadow-royal">
        {successMessage ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 border border-gold-400 flex items-center justify-center mx-auto text-3xl mb-4">
              🙏
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-300 mb-2">
              Dhanyavaad!
            </h3>
            <p className="text-stone-200 font-sans text-base max-w-md mx-auto">
              {successMessage}
            </p>
            <button
              onClick={() => setSuccessMessage('')}
              className="mt-6 text-xs text-gold-400 underline font-sans uppercase tracking-wider"
            >
              Update or submit another response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="p-3 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-xs sm:text-sm">
                {errorMessage}
              </div>
            )}

            {/* Attendance Status */}
            <div>
              <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-3">
                Will you be able to attend? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.attending === 'attending'
                      ? 'bg-gold-500/20 border-gold-400 text-gold-200'
                      : 'bg-black/30 border-stone-700 text-stone-300 hover:border-gold-500/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="attending"
                    checked={formData.attending === 'attending'}
                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    className="accent-gold-500"
                  />
                  <span className="font-serif font-medium text-sm">
                    {getTranslation('joyfullyAccepts', language)}
                  </span>
                </label>

                <label
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.attending === 'declined'
                      ? 'bg-gold-500/20 border-gold-400 text-gold-200'
                      : 'bg-black/30 border-stone-700 text-stone-300 hover:border-gold-500/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="declined"
                    checked={formData.attending === 'declined'}
                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    className="accent-gold-500"
                  />
                  <span className="font-serif font-medium text-sm">
                    {getTranslation('regretfullyDeclines', language)}
                  </span>
                </label>
              </div>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2">
                  Full Name & Family *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kulkarni & Family"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            {formData.attending === 'attending' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Number of guests */}
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2">
                      {getTranslation('numberOfGuests', language)}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="15"
                      value={formData.guestsCount}
                      onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                      className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Food Preference */}
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2">
                      {getTranslation('foodPreference', language)}
                    </label>
                    <select
                      value={formData.foodPreference}
                      onChange={(e) => setFormData({ ...formData, foodPreference: e.target.value })}
                      className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-gold-400"
                    >
                      <option value="vegetarian">{getTranslation('vegetarian', language)}</option>
                      <option value="non-vegetarian">{getTranslation('nonVegetarian', language)}</option>
                      <option value="jain">{getTranslation('jain', language)}</option>
                      <option value="other">Other / Fasting</option>
                    </select>
                  </div>
                </div>

                {/* Events Attending */}
                {events.length > 0 && (
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2">
                      Which ceremonies will you attend?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {events.map((ev, i) => (
                        <label
                          key={i}
                          className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/30 border border-gold-500/20 text-xs text-stone-200 cursor-pointer hover:border-gold-500/40"
                        >
                          <input
                            type="checkbox"
                            checked={formData.eventsAttending.includes(ev.name)}
                            onChange={() => handleEventCheckbox(ev.name)}
                            className="accent-gold-500"
                          />
                          <span>{ev.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Note / Blessing message */}
            <div>
              <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2">
                A Note for the Couple
              </label>
              <textarea
                rows="3"
                placeholder="Share your wishes or any special dietary requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-gold-400 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 text-maroon-950 font-serif font-bold text-sm uppercase tracking-widest shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Recording RSVP...' : getTranslation('sendRSVP', language)}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
