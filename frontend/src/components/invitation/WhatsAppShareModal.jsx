import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, X } from 'lucide-react';
import { getTranslation } from '../../translations/i18n';

export const WhatsAppShareModal = ({ wedding, isOpen, onClose, language = 'en' }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const url = `${window.location.origin}/w/${wedding?.slug}`;
  const dateStr = wedding?.weddingDate
    ? new Date(wedding.weddingDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const shareText = `💍 *You're Cordially Invited!* 💍\n\nJoin us in celebrating the sacred wedding of\n*${wedding?.brideName}* ❤️ *${wedding?.groomName}*\n\n📅 Date: ${dateStr}\n📍 Location: ${wedding?.city || 'India'}, ${wedding?.state || ''}\n\nView our wedding invitation & details:\n👉 ${url}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#4A0A17] to-[#2B050E] rounded-3xl border-2 border-gold-500/50 p-6 sm:p-8 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold-400 hover:text-stone-100 p-2"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-7 h-7" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2">
          Share Wedding Invitation
        </h3>
        <p className="text-stone-300 text-xs sm:text-sm font-sans mb-6">
          Send the invitation to your friends and family on WhatsApp with a personalized message.
        </p>

        {/* Formatted Preview Box */}
        <div className="bg-black/40 border border-gold-500/30 rounded-xl p-4 text-left font-mono text-xs text-stone-300 mb-6 whitespace-pre-line leading-relaxed max-h-40 overflow-y-auto">
          {shareText}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{getTranslation('shareOnWhatsApp', language)}</span>
          </a>

          <button
            onClick={copyToClipboard}
            className="w-full py-3.5 rounded-full bg-[#580D1A] hover:bg-gold-500 hover:text-maroon-950 border border-gold-400/60 text-gold-300 font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            <span>{copied ? getTranslation('linkCopied', language) : getTranslation('copyInvitationLink', language)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
