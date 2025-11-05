import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';

function LanguageSwitcher({ isScrolled = false }) {
  const { i18n, t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
          isScrolled
            ? 'bg-secondary/10 hover:bg-secondary/20 text-secondary'
            : 'bg-white/10 hover:bg-white/20 text-white'
        }`}
        aria-label={t('aria.changeLanguage')}
        aria-expanded={isOpen}
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">{currentLanguage.flag}</span>
        <span className="text-sm font-medium hidden md:inline">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fade-in-up">
          <div className="py-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                  i18n.language === lang.code ? 'bg-primary/5' : ''
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="flex-1 text-left text-sm font-medium text-secondary">
                  {lang.name}
                </span>
                {i18n.language === lang.code && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
