import Link from 'next/link';
import { Box, Youtube, Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
                <div className="col-span-2 lg:col-span-2">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                        <Image src="https://i.postimg.cc/PJJ3GBtV/image.png" alt="SaudiDropship Logo" width={180} height={40} />
                    </Link>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
                        The Kingdom's trusted dropshipping platform. Enabling entrepreneurs to scale without borders.
                    </p>
                    <div className="flex gap-4 text-slate-400">
                        <a href="#" className="hover:text-primary transition-colors"><Youtube size={20} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
                    <ul className="space-y-3 text-sm text-slate-500">
                        <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><Link href="/register" className="hover:text-primary transition-colors">Register Now</Link></li>
                        <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                        <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-foreground mb-4">Policies</h4>
                    <ul className="space-y-3 text-sm text-slate-500">
                        <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-foreground mb-4">Company</h4>
                    <ul className="space-y-3 text-sm text-slate-500">
                        <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                <p>© {year} SaudiDropship. All rights reserved. | Powered by <a href="https://haxxcelsolutions.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Haxxcel Solutions</a></p>
                <div className="flex items-center gap-6">
                    <span>Saudi Arabia</span>
                </div>
            </div>
        </div>
    </footer>
  );
}
