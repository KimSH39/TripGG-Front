'use client';

import '@/i18n';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// import enCommon from '../../../public/locales/en/common.json';
// import koCommon from '../../../public/locales/ko/common.json';
// import zhCNCommon from '../../../public/locales/zh-CN/common.json';
// import zhTWCommon from '../../../public/locales/zh-TW/common.json';
// import jaCommon from '../../../public/locales/ja/common.json';
// import viCommon from '../../../public/locales/vi/common.json';

export default function LanguageSelectPage() {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default to English
    // Default to English

    const languages = [
        { name: 'Korean(한국어)', value: 'Korean', flag: '/images/korea_flag.png' }, // Assuming flag images will be added
        { name: 'English', value: 'English', flag: '/images/us_flag.png' },
        { name: 'Chinese (Simplified)(简体中文)', value: 'Chinese-Simplified', flag: '/images/china_flag.png' },
        { name: 'Chinese (Traditional) (繁體中文)', value: 'Chinese-Traditional', flag: '/images/taiwan_flag.png' },
        { name: 'Japanese (日本語)', value: 'Japanese', flag: '/images/japan_flag.png' },
        { name: 'Vietnamese (Tiếng Việt)', value: 'Vietnamese', flag: '/images/vietnam_flag.png' },
    ];

    const getConfirmButtonText = () => {
        const langCodeMap: { [key: string]: string } = {
            Korean: 'ko',
            English: 'en',
            'Chinese-Simplified': 'zh-CN',
            'Chinese-Traditional': 'zh-TW',
            Japanese: 'ja',
            Vietnamese: 'vi',
        };
        const langCode = langCodeMap[selectedLanguage] || 'en'; // Fallback to English if not found
        return t('confirm_button', { lng: langCode });
    };

    const getTitleText = () => {
        const langCodeMap: { [key: string]: string } = {
            Korean: 'ko',
            English: 'en',
            'Chinese-Simplified': 'zh-CN',
            'Chinese-Traditional': 'zh-TW',
            Japanese: 'ja',
            Vietnamese: 'vi',
        };
        const langCode = langCodeMap[selectedLanguage] || 'en'; // Fallback to English if not found
        return t('select_language_title', { lng: langCode });
    };

    const handleLanguageSelect = (languageValue: string) => {
        setSelectedLanguage(languageValue);
        console.log(`Language selected: ${languageValue}`);
    };

    const handleConfirm = () => {
        const languageToConfirm = selectedLanguage || 'English'; // Use 'English' if no language is selected
        if (languageToConfirm) {
            const languageCode = {
                Korean: 'ko',
                English: 'en',
                'Chinese-Simplified': 'zh-CN',
                'Chinese-Traditional': 'zh-TW',
                Japanese: 'ja',
                Vietnamese: 'vi',
            }[languageToConfirm];
            if (languageCode) {
                i18n.changeLanguage(languageCode);
                console.log(`Language confirmed: ${languageToConfirm} (${languageCode})`);
                router.push('/home'); // Redirect to home page after confirmation
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4 bg-white">
            <h1 className="text-2xl font-bold mb-8 mt-16">{getTitleText()}</h1>
            <div className="w-full max-w-sm">
                {languages.map((lang) => (
                    <button
                        key={lang.value}
                        className={`flex items-center w-full p-3 mb-3 rounded-lg shadow-sm transition-all duration-200
                                    ${
                                        selectedLanguage === lang.value
                                            ? 'bg-blue-50 border-2 border-blue-500'
                                            : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                                    }`}
                        onClick={() => handleLanguageSelect(lang.value)}
                    >
                        {/* Placeholder for flag image */}
                        <div className="mr-3 flex items-center justify-center overflow-hidden">
                            {/* You'll need to add actual flag images to your public/images directory */}
                            <Image src={lang.flag} alt={`${lang.name} flag`} width={32} height={20} />
                        </div>
                        <span className="text-base font-medium">{lang.name}</span>
                    </button>
                ))}

                {/* 확인 버튼 */}
                <button
                    onClick={handleConfirm}
                    disabled={!selectedLanguage}
                    className={`w-full p-4 font-semibold rounded-lg transition-colors duration-200 mt-6 ${
                        selectedLanguage
                            ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {getConfirmButtonText()}
                </button>
            </div>
        </div>
    );
}
