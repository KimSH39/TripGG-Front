'use client';

import { useEffect } from 'react';
import i18n from '@/i18n';
import { initReactI18next } from 'react-i18next';

export function I18nProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (!i18n.isInitialized) {
            i18n.use(initReactI18next).init({
                react: { useSuspense: false },
            });
        }
    }, []);

    return <>{children}</>;
}
