import en from './en.json';
import hi from './hi.json';
import kn from './kn.json';

export const translations = {
  en,
  hi,
  kn,
};

export const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
];

export const getTranslation = (key, lang = 'en') => {
  const selected = translations[lang] || translations.en;
  return selected[key] || translations.en[key] || key;
};
