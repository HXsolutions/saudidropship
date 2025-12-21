import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Target, Zap, Gem, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from '@/components/AnimateOnScroll';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'dallah-1');

  const values = [
      {
          icon: Target,
          title: "Our Mission",
          description: "To make high-quality products accessible to everyone in Saudi Arabia through a seamless, reliable dropshipping platform."
      },
      {
          icon: Zap,
          title: "Empowerment",
          description: "We empower sellers by handling product sourcing, inventory, and logistics, so they can focus on building their brand."
      },
      {
          icon: Gem,
          title: "Partnership",
          description: "We are more than a supplier; we are your partner in success, dedicated to helping your business thrive in the Saudi market."
      },
      {
          icon: Rocket,
          title: "Innovation",
          description: "Leveraging technology like WhatsApp for streamlined ordering to stay ahead in the fast-paced world of e-commerce."
      }
  ]

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-background to-background pointer-events-none"></div>
        <AnimateOnScroll className="container mx-auto px-4 text-center relative z-10" once={false}>
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary leading-tight">
            About SaudiDropship
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            Pioneering the future of e-commerce in the Kingdom of Saudi Arabia.
          </p>
        </AnimateOnScroll>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <AnimateOnScroll className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 order-last md:order-first" once={false}>
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </AnimateOnScroll>
            <AnimateOnScroll className="space-y-6 text-foreground/90" once={false}>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">Our Story</h2>
              <p className="text-lg leading-relaxed">
                SaudiDropship was born from a simple idea: we saw the incredible potential of local entrepreneurs and the growing demand for unique goods, but noticed a gap in the market for a service that truly understands the local landscape.
              </p>
              <p className="text-lg leading-relaxed">
                Our journey began with a commitment to bridge that gap, creating a platform built on reliability, local expertise, and a deep-seated desire to see Saudi businesses succeed.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
              <AnimateOnScroll className="text-center mb-12 md:mb-16" once={false}>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">Our Core Values</h2>
                  <p className="text-lg text-muted-foreground mt-2">The principles that guide our every decision.</p>
              </AnimateOnScroll>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {values.map((value, index) => (
                      <AnimateOnScroll key={index} delay={index * 0.1} once={false}>
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-5 border-2 border-primary/20">
                                <value.icon size={32} />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                            <p className="text-sm text-muted-foreground">{value.description}</p>
                        </div>
                      </AnimateOnScroll>
                  ))}
              </div>
          </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white border-t border-slate-100">
        <AnimateOnScroll className="container mx-auto px-4 text-center" once={false}>
            <h2 className="text-3xl font-semibold text-foreground mb-4">Ready to Join Us?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Become a part of a growing community of entrepreneurs building their future with SaudiDropship.</p>
            <Button asChild size="lg" className="animate-pulse-glow">
              <Link href="/register">Start Selling Today</Link>
            </Button>
        </AnimateOnScroll>
      </section>
    </div>
  );
}
