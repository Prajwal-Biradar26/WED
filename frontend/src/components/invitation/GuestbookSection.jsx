import React, { useState } from 'react';
import { guestbookService } from '../../services/api';
import { getTranslation } from '../../translations/i18n';
import { TraditionalDivider, LotusOrnament } from '../common/TraditionalOrnaments';

export const GuestbookSection = ({ wedding, blessings = [], language = 'en' }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedList, setSubmittedList] = useState(blessings);
  const [statusText, setStatusText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setStatusText('');

    try {
      const res = await guestbookService.submitBlessing({
        weddingId: wedding._id,
        name,
        message,
      });

      if (res.data?.success) {
        setStatusText('Thank you! Your heartfelt blessing has been received. 🙏');
        if (res.data.data) {
          setSubmittedList((prev) => [res.data.data, ...prev]);
        }
        setName('');
        setMessage('');
      }
    } catch (err) {
      setStatusText('Unable to submit blessing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="blessings" className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <TraditionalDivider text={getTranslation('blessTheCouple', language)} />
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient mt-2">
          Blessings & Best Wishes
        </h2>
        <p className="text-gold-200/80 font-sans text-sm sm:text-base mt-2 max-w-md mx-auto">
          Leave your warmest wishes, prayers, and thoughts for the couple as they step into married life.
        </p>
      </div>

      {/* Blessing Input Card */}
      <div className="bg-gradient-to-b from-[#4A0A17] to-[#2B050E] p-6 sm:p-8 rounded-3xl border border-gold-500/40 shadow-royal mb-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Anand Joshi & Family"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-1">
              Your Blessing Message *
            </label>
            <textarea
              rows="3"
              required
              placeholder="Write your prayers and warm blessings for Priya & Prajwal..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-gold-400 resize-none"
            ></textarea>
          </div>

          {statusText && (
            <p className="text-xs sm:text-sm text-gold-300 font-sans italic">{statusText}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-gold-glow transition-all"
          >
            {isSubmitting ? 'Sending...' : getTranslation('sendBlessing', language)}
          </button>
        </form>
      </div>

      {/* Display Approved Blessings Feed */}
      {submittedList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {submittedList.map((b, idx) => (
            <div
              key={b._id || idx}
              className="p-5 rounded-2xl bg-[#3B0811]/90 border border-gold-500/30 shadow-md relative flex flex-col justify-between"
            >
              <p className="font-serif italic text-stone-200 text-sm sm:text-base leading-relaxed mb-4">
                "{b.message}"
              </p>
              <div className="flex items-center justify-between border-t border-gold-500/20 pt-3">
                <span className="font-serif font-bold text-gold-300 text-xs sm:text-sm">
                  — {b.name}
                </span>
                <span className="text-xs text-gold-500">✨🙏</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
