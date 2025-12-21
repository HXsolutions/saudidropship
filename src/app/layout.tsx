import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { Inter } from 'next/font/google';
import AppLayout from './AppLayout';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SaudiDropship | Dropshipping & Reseller Platform',
  description: 'A complete platform empowering sellers across Saudi Arabia with winning products, local fulfillment, and reliable Cash on Delivery support.',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth`}>
      <body className="bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
        <FirebaseClientProvider>
            <AppLayout>
              {children}
            </AppLayout>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
