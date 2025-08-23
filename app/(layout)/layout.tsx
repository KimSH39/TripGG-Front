import BottomNavigation from '@/components/bottom-navigation';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="max-w-3xl mx-auto w-full min-h-screen pb-16">{children}</div>
            <BottomNavigation />
        </>
    );
}
