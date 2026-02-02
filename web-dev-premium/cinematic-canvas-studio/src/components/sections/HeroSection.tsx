import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial timeline animation on page load
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Animate title letters
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        tl.from(titleChars, {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.05,
          duration: 1.2,
        }, 0.3);
      }

      // Animate subtitle
      tl.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
      }, '-=0.6');

      // Animate CTA buttons
      tl.from(ctaRef.current?.children || [], {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
      }, '-=0.4');

      // Animate scroll indicator
      tl.from(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
      }, '-=0.2');

      // Continuous floating animation for scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const splitTitle = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block" style={{ transformStyle: 'preserve-3d' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video/Image Background Placeholder */}
      {/* Replace video/image here - Add your hero background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cinema-dark via-background to-cinema-charcoal">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(38_30%_10%/0.2)_0%,_transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p
          ref={subtitleRef}
          className="hero-subtitle mb-6 text-cinema-cream/80"
        >
          Premium Video Production
        </p>

        <h1
          ref={titleRef}
          className="hero-title text-foreground mb-8 overflow-hidden"
        >
          <span className="block">{splitTitle('CINEMATIC')}</span>
          <span className="block text-gradient-gold">{splitTitle('EXCELLENCE')}</span>
        </h1>

        <p className="max-w-2xl mx-auto text-muted-foreground font-body text-lg mb-12 leading-relaxed">
          We craft visual stories that captivate audiences and elevate brands. 
          From concept to final cut, every frame is a masterpiece.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero-filled" size="xl" className="group">
            <Play size={18} className="mr-2 group-hover:scale-110 transition-transform" />
            Watch Showreel
          </Button>
          <Button variant="hero" size="xl">
            Start Your Project
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground"
      >
        <span className="text-xs tracking-[0.3em] uppercase font-body">Scroll</span>
        <ArrowDown size={20} className="text-cinema-gold" />
      </div>

      {/* Decorative Lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cinema-gold/30 to-transparent hidden lg:block" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cinema-gold/30 to-transparent hidden lg:block" />
    </section>
  );
};

export default HeroSection;
