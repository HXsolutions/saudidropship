
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Box, Menu, User, LogOut } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from './ui/sheet';
import { useState } from 'react';
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="https://i.postimg.cc/PJJ3GBtV/image.png" alt="SaudiDropship Logo" width={180} height={40} />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-primary transition-colors">
            All Products
          </Link>
          <Link href="/how-it-works" className="hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
            <Button asChild>
                <Link href="/register">Register</Link>
            </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={24} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <SheetHeader>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation links for SaudiDropship.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full py-6">
                <Link href="/" className="flex items-center gap-2 mb-8">
                  <Image src="https://i.postimg.cc/PJJ3GBtV/image.png" alt="SaudiDropship Logo" width={180} height={40} />
                </Link>
                <nav className="flex flex-col gap-6 text-lg font-medium text-slate-600">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors"
                  >
                    All Products
                  </Link>
                  <Link
                    href="/how-it-works"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors"
                  >
                    How It Works
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
