'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function LanguageSelectPage() {
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState('Korean'); // Default to Korean

    const languages = [
        { name: 'Korean(한국어)', value: 'Korean', flag: '/images/korea_flag.png' }, // Assuming flag images will be added
        { name: 'English', value: 'English', flag: '/images/us_flag.png' },
        { name: 'Chinese (Simplified)(简体中文)', value: 'Chinese-Simplified', flag: '/images/china_flag.png' },
        { name: 'Chinese (Traditional) (繁體中文)', value: 'Chinese-Traditional', flag: '/images/taiwan_flag.png' },
        { name: 'Japanese (日本語)', value: 'Japanese', flag: '/images/japan_flag.png' },
        { name: 'Vietnamese (Tiếng Việt)', value: 'Vietnamese', flag: '/images/vietnam_flag.png' },
    ];

    const handleLanguageSelect = (languageValue: string) => {
        setSelectedLanguage(languageValue);
        // Here you would typically save the language selection to a context, local storage, or a store
        // For now, we'll just log it and navigate
        console.log(`Selected language: ${languageValue}`);
        router.push('/home'); // Redirect to home page after selection
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4 bg-white">
            <h1 className="text-2xl font-bold mb-8 mt-16">Please select your language!</h1>
            <div className="w-full max-w-sm">
                {languages.map((lang) => (
                    <button
                        key={lang.value}
                        className={`flex items-center w-full p-4 mb-4 rounded-lg shadow-sm transition-all duration-200
                                    ${
                                        selectedLanguage === lang.value
                                            ? 'bg-blue-50 border-2 border-blue-500'
                                            : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                                    }`}
                        onClick={() => handleLanguageSelect(lang.value)}
                    >
                        {/* Placeholder for flag image */}
                        <div className="mr-4 flex items-center justify-center overflow-hidden">
                            {/* You'll need to add actual flag images to your public/images directory */}
                            <Image src={lang.flag} alt={`${lang.name} flag`} width={40} height={24} />
                        </div>
                        <span className="text-lg font-medium">{lang.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
