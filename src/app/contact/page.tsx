'use client';

import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { WhatsAppIcon } from '@/components/icons';
import AnimateOnScroll from '@/components/AnimateOnScroll';


export default function ContactPage() {
  const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966112345678';
  
  const handleWhatsAppClick = () => {
    const message = `Hello SaudiDropship, I have a question.`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/$+923150414574?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-background to-background pointer-events-none"></div>
        <AnimateOnScroll className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary leading-tight">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            We're here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </AnimateOnScroll>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Contact Form */}
            <AnimateOnScroll className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-6">Send us a Message</h2>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-slate-600 mb-1">First Name</label>
                            <Input id="firstName" type="text" placeholder="John" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-slate-600 mb-1">Last Name</label>
                            <Input id="lastName" type="text" placeholder="Doe" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-600 mb-1">Message</label>
                        <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
                    </div>
                    <Button type="submit" className="w-full text-base py-3">
                        <Send className="mr-2" size={18}/>
                        Send Message
                    </Button>
                </form>
            </AnimateOnScroll>

            {/* Contact Details */}
            <div className="space-y-8 mt-8 md:mt-0">
              <AnimateOnScroll className="flex items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-xl flex items-center justify-center text-primary border-2 border-blue-100">
                  <Mail size={32} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-navy mb-1">Email Us</h3>
                  <p className="text-slate-500 mb-2 text-sm sm:text-base">For general inquiries and support.</p>
                  <a href="mailto:support@saudidropship.com" className="text-base md:text-lg font-medium text-primary hover:underline break-all">
                    support@saudidropship.com
                  </a>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.1} className="flex items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border-2 border-green-100">
                  <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-navy mb-1">WhatsApp Us</h3>
                  <p className="text-slate-500 mb-2 text-sm sm:text-base">Chat with our friendly support team.</p>
                  <button onClick={handleWhatsAppClick} className="text-base md:text-lg font-medium text-primary hover:underline">
                    +923150414574
                    +966 50 814 2659
                  </button>
                </div>
              </AnimateOnScroll>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
