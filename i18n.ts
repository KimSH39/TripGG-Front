// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import HttpBackend from 'i18next-http-backend'; // Remove this
// import LanguageDetector from 'i18next-browser-languagedetector'; // Remove this

import enCommon from '@/locales/en/common.json';
import koCommon from '@/locales/ko/common.json';
import zhCNCommon from '@/locales/zh-CN/common.json';
import zhTWCommon from '@/locales/zh-TW/common.json';
import jaCommon from '@/locales/ja/common.json';
import viCommon from '@/locales/vi/common.json';

const resources = {
    en: { common: enCommon },
    ko: { common: koCommon },
    'zh-CN': { common: zhCNCommon },
    'zh-TW': { common: zhTWCommon },
    ja: { common: jaCommon },
    vi: { common: viCommon },
};

const i18nConfig = {
    fallbackLng: 'en',
    debug: true, // You might want to set this to false in production
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    ns: ['common'], // Specify your namespaces here
    defaultNS: 'common',
    resources: resources, // Add resources directly here
};

i18n.use(initReactI18next).init(i18nConfig);

export default i18n;
