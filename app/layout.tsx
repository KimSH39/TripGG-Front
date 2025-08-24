import type { Metadata } from 'next';
import '@fontsource/asta-sans';
import './globals.css';

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
  font-family: 'Asta Sans', sans-serif;
}
                `}</style>
            </head>
            <body>
                <div className="max-w-3xl mx-auto w-full">{children}</div>
            </body>
        </html>
    );
}
