import type { Metadata } from 'next';
import './globals.css';
import '@fontsource/asta-sans/500.css';
import '@fontsource/asta-sans';
import ClientProviders from './ClientProviders';

export const metadata: Metadata = {
    title: 'tripgg-front',
    description: 'tripgg-front',
    generator: 'tripgg-front',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    );
}
