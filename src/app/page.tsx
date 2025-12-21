
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Check, ChevronRight, Warehouse, Globe, Store, Users, FileCheck, Wallet, Award, Banknote, TrendingUp, PackageCheck } from 'lucide-react';
import DashboardPreview from '@/components/dashboard-preview';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import Image from 'next/image';


export default function Home() {

  const partnerLogos = [
    { src: 'https://i.postimg.cc/zBvdR99T/image.png', alt: 'Aramex' },
    { src: 'https://i.postimg.cc/QMswVY8n/image.png', alt: 'SMSA' },
    { src: 'https://i.postimg.cc/G2jcHsnB/image.png', alt: 'J&T Express' },
    { src: 'https://i.postimg.cc/vHZmxXBR/image.png', alt: 'DHL' },
  ];

  return (
    <>
      <section className="relative pt-20 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-background to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimateOnScroll>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-6 md:mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-xs font-medium text-primary uppercase tracking-wide">New Platform Features Live</span>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6 leading-tight">
              Dropshipping &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Reseller Solutions</span>
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              SaudiDropship is a complete platform empowering sellers across Saudi Arabia with winning products, local fulfillment, and reliable Cash on Delivery support.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto hover:scale-105 shadow-lg shadow-blue-500/20">
              <Link href="/register">
                Register Now
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto hover:bg-slate-50">
              <Link href="/products">
                View Products
              </Link>
            </Button>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.4} className="mt-16 mx-auto max-w-4xl">
            <DashboardPreview />
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">Everything You Need to Scale</h2>
            <p className="text-slate-500">Comprehensive solutions for modern ecommerce entrepreneurs.</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimateOnScroll>
              <div className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Warehouse size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">Reliable Fulfillment</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">Secure, scalable warehousing and fast fulfillment services across Saudi Arabia.</p>
                <a href="#" className="inline-flex items-center text-primary text-sm font-medium hover:gap-2 transition-all">Start Here <ChevronRight size={16} className="ml-1" /></a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Globe size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">Global Sourcing</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">Access trending and tested products sourced directly from trusted suppliers.</p>
                <a href="#" className="inline-flex items-center text-primary text-sm font-medium hover:gap-2 transition-all">Contact Us <ChevronRight size={16} className="ml-1" /></a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Store size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">List Your Products</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">Sell your own products in Saudi Arabia using our logistics infrastructure and COD delivery network.</p>
                <a href="#" className="inline-flex items-center text-primary text-sm font-medium hover:gap-2 transition-all">Learn More <ChevronRight size={16} className="ml-1" /></a>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
            <AnimateOnScroll>
              <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-8 md:p-12 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div className="absolute top-0 right-0 p-6 opacity-5"><span className="text-9xl font-bold tracking-tighter">KSA</span></div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold uppercase tracking-wide mb-6 border border-green-100"><span className="w-2 h-2 rounded-full bg-green-500"></span> Saudi Arabia</div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-tight">KSA Sellers Registration</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">Join SaudiDropship to access thousands of top-selling products stored in local Saudi warehouses. Start selling online without inventory and reduce delivery times significantly.</p>
                </div>
                <Button className="w-full sm:w-auto bg-foreground text-background hover:bg-slate-800 group" asChild>
                  <Link href="/register">Register for KSA Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link>
                </Button>
              </div>
            </AnimateOnScroll>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <AnimateOnScroll>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">Powering eCommerce in KSA</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">SaudiDropship is a leading dropshipping platform trusted by over 7,000 resellers. With a 85% Cash on Delivery success rate, we provide a reliable ecosystem for sustainable growth.</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Check size={14} /></div>
                  <span className="text-slate-700 font-medium">95% of products stocked locally</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Check size={14} /></div>
                  <span className="text-slate-700 font-medium">Nationwide delivery coverage</span>
                </div>
              </div>
              <Link href="/about" className="text-primary font-medium hover:text-blue-800 transition-colors inline-flex items-center gap-2">Learn More About Us <ArrowRight size={16} /></Link>
            </AnimateOnScroll>
            <AnimateOnScroll className="grid grid-cols-2 gap-4">
              <div className="bg-background p-6 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center hover:border-blue-100 transition-colors">
                <span className="text-4xl font-semibold text-foreground tracking-tight mb-2">7k+</span>
                <span className="text-sm text-slate-500">Active Resellers</span>
              </div>
              <div className="bg-background p-6 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center hover:border-blue-100 transition-colors">
                <span className="text-4xl font-semibold text-foreground tracking-tight mb-2">500k+</span>
                <span className="text-sm text-slate-500">Successful Deliveries</span>
              </div>
              <div className="bg-background p-6 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center hover:border-blue-100 transition-colors col-span-2">
                <span className="text-4xl font-semibold text-green-500 tracking-tight mb-2">85%</span>
                <span className="text-sm text-slate-500">COD Delivery Success Rate</span>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">Why Choose SaudiDropship</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimateOnScroll>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-4"><Users size={20} /></div>
                <h4 className="font-semibold text-foreground mb-2">Trusted Community</h4>
                <p className="text-xs text-slate-500">Trusted by thousands of resellers worldwide.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-4"><FileCheck size={20} /></div>
                <h4 className="font-semibold text-foreground mb-2">Easy Access</h4>
                <p className="text-xs text-slate-500">No company documents required to start.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-4"><Wallet size={20} /></div>
                <h4 className="font-semibold text-foreground mb-2">Zero Investment</h4>
                <p className="text-xs text-slate-500">Zero upfront investment required.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.3}>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-4"><Award size={20} /></div>
                <h4 className="font-semibold text-foreground mb-2">Winning Products</h4>
                <p className="text-xs text-slate-500">Only proven, winning products listed.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-4"><Banknote size={20} /></div>
                <h4 className="font-semibold text-foreground mb-2">Fast Payouts</h4>
                <p className="text-xs text-slate-500">Payments released within 7 days.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-4"><TrendingUp size={20} /></div>
                <h4 className="font-semibold text-foreground mb-2">High Margins</h4>
                <p className="text-xs text-slate-500">Set your own prices for high profit margins.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2} className="sm:col-span-2">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-4"><PackageCheck size={20} /></div>
                <h4 className="font-semibold text-foreground mb-2">Full Logistics Support</h4>
                <p className="text-xs text-slate-500">Complete shipping and returns support included.</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 mb-8 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Our Reliable Delivery Partners</p>
        </div>
        <div className="marquee-container">
          <div className="marquee-content">
            {partnerLogos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="inline-block mx-6 md:mx-12 object-contain"
                unoptimized
              />
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {partnerLogos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="inline-block mx-6 md:mx-12 object-contain"
                unoptimized
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-foreground to-foreground pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">Start Selling Without Inventory Today</h2>
            <p className="text-lg text-slate-400 mb-10 max-w-4xl mx-auto">Build, launch, and scale your dropshipping business with SaudiDropship's proven infrastructure.</p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto animate-pulse-glow">
              <Link href="/register">Register Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent text-white border-slate-700 hover:border-slate-600 hover:bg-foreground hover:text-white">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
