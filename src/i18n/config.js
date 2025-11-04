import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enCommon from '../locales/en/common.json';
import enTours from '../locales/en/tours.json';
import enBooking from '../locales/en/booking.json';
import enMockData from '../locales/en/mockData.json';

import idCommon from '../locales/id/common.json';
import idTours from '../locales/id/tours.json';
import idBooking from '../locales/id/booking.json';
import idMockData from '../locales/id/mockData.json';

const resources = {
  en: {
    common: enCommon,
    tours: enTours,
    booking: enBooking,
    mockData: enMockData,
  },
  id: {
    common: idCommon,
    tours: idTours,
    booking: idBooking,
    mockData: idMockData,
  },
};

// Get saved language from localStorage or default to 'id'
const getInitialLanguage = () => {
  try {
    return localStorage.getItem('language') || 'id';
  } catch {
    return 'id';
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'id',
    defaultNS: 'common',
    ns: ['common', 'tours', 'booking', 'mockData'],

    interpolation: {
      escapeValue: false,
    },

    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
    },

    debug: false,
  });

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
