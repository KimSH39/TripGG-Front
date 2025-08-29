import type { Metadata } from 'next';
import '@fontsource/asta-sans/500.css'; // Import Asta Sans SemiBold (assuming 500 is semibold)
import '@fontsource/asta-sans';
import './globals.css';
import I18nProvider from '@/components/i18n-provider';

export const metadata: Metadata = {
    title: 'tripgg-front',
    description: 'tripgg-front',
    generator: 'tripgg-front',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <style>{`
html {
  font-family: 'Asta Sans SemiBold', 'Asta Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'Noto Sans CJK JP', 'Noto Sans CJK SC', 'Noto Sans CJK KR', 'Noto Sans CJK TC', 'Noto Sans Vietnamese';
}
                `}</style>
            </head>
            <body>
                <I18nProvider>
                    <div className="max-w-3xl mx-auto w-full">{children}</div>
                </I18nProvider>
            </body>
        </html>
    );
}
