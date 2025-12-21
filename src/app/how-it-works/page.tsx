'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserPlus, ShoppingCart, Truck, Wallet, Settings } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion, useScroll, useSpring } from 'framer-motion';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const Step = ({
  icon: Icon,
  title,
  description,
  imageUrl,
  imageAlt,
  imageHint,
  isReversed = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageHint: string;
  isReversed?: boolean;
}) => {
  const direction = isReversed ? -100 : 100;
  const imageDirection = isReversed ? 100 : -100;

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex relative flex-row items-center justify-between w-full mb-8">
        {/* Text Content */}
        <AnimateOnScroll
          variants={{
            hidden: { opacity: 0, x: direction },
            visible: { opacity: 1, x: 0 },
          }}
          className={`w-full md:w-5/12 ${isReversed ? 'md:order-2' : ''}`}
        >
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-border text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary shadow-md mx-auto md:mx-0">
                <Icon size={24} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">{title}</h3>
            </div>
            <p className="text-muted-foreground text-base">{description}</p>
          </div>
        </AnimateOnScroll>

        {/* Image */}
        <AnimateOnScroll
          variants={{
            hidden: { opacity: 0, x: imageDirection },
            visible: { opacity: 1, x: 0 },
          }}
          className="w-full md:w-5/12 flex justify-center mt-6 md:mt-0"
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={400}
            height={400}
            className="rounded-lg object-contain w-full max-w-xs md:max-w-none"
            data-ai-hint={imageHint}
          />
        </AnimateOnScroll>

        {/* Timeline Dot for Desktop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-background z-10 flex items-center justify-center border-4 border-border">
          <div className="w-4 h-4 bg-primary rounded-full" />
        </div>
      </div>
      
      {/* Mobile View */}
      <AnimateOnScroll className="md:hidden bg-white p-6 rounded-2xl shadow-lg border border-border flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4 w-full">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary shadow-md">
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>
        <Image
            src={imageUrl}
            alt={imageAlt}
            width={400}
            height={400}
            className="rounded-lg object-contain w-full max-w-xs my-4"
            data-ai-hint={imageHint}
        />
        <p className="text-muted-foreground text-base text-center">{description}</p>
      </AnimateOnScroll>
    </>
  );
};

export default function HowItWorksPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const steps = [
    {
      icon: UserPlus,
      title: 'Register Your Account',
      description: 'Create an account to start your e-commerce journey.',
      imageUrl: PlaceHolderImages.find(p => p.id === 'form-icon')?.imageUrl || 'https://i.postimg.cc/90fg91fr/image.png',
      imageAlt: 'Illustration of a registration form',
      imageHint: 'form icon',
    },
    {
      icon: ShoppingCart,
      title: 'Place Your First Order',
      description: 'Send your first order via WhatsApp to verify your account.',
      imageUrl: PlaceHolderImages.find(p => p.id === 'phone-order')?.imageUrl || 'https://picsum.photos/seed/phone-order/600/400',
      imageAlt: 'Illustration of placing an order on a phone',
      imageHint: 'phone order',
      isReversed: true,
    },
    {
      icon: Settings,
      title: 'Integrate Your Store',
      description: 'Connect your store to automate order processing.',
      imageUrl: PlaceHolderImages.find(p => p.id === 'puzzle-integration')?.imageUrl || 'https://picsum.photos/seed/puzzle-integration/600/400',
      imageAlt: 'Illustration of puzzle pieces connecting',
      imageHint: 'puzzle integration',
    },
    {
      icon: Truck,
      title: 'We Ship For You',
      description: 'We ship products directly to your customer with tracking.',
      imageUrl: PlaceHolderImages.find(p => p.id === 'delivery-package')?.imageUrl || 'https://picsum.photos/seed/delivery-package/600/400',
      imageAlt: 'Illustration of a delivery package',
      imageHint: 'delivery package',
      isReversed: true,
    },
    {
      icon: Wallet,
      title: 'Receive Your Profit',
      description: 'Your profit is transferred to you every Friday.',
      imageUrl: PlaceHolderImages.find(p => p.id === 'money-laptop')?.imageUrl || 'https://picsum.photos/seed/money-laptop/600/400',
      imageAlt: 'Illustration of money from a laptop',
      imageHint: 'money laptop',
    },
  ];

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            How It Works
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Starting your business with SaudiDropship is simple and straightforward.
          </p>
        </AnimateOnScroll>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline bar for desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-border top-0 hidden md:block" />
          <motion.div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-primary top-0 origin-top hidden md:block" style={{ scaleY: scaleX }} />
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Step key={index} {...step} />
            ))}
          </div>
        </div>

        <AnimateOnScroll className="text-center mt-16 md:mt-20">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-glow">
            <Link href="/register">Get Started Now</Link>
          </Button>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
