'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin') || pathname === '/login';

  if (isAdminPage) {
    return <main className="h-full">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
};
