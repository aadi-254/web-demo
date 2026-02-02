import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cinema-dark via-background to-cinema-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(38_40%_12%/0.3)_0%,_transparent_60%)]" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cinema-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          <p className="text-cinema-gold text-sm tracking-[0.3em] uppercase font-body mb-6">
            Let's Create Together
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-wider text-foreground mb-8">
            READY TO BRING YOUR<br />
            <span className="text-gradient-gold">VISION TO LIFE?</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            From initial concept to final delivery, we're here to transform your ideas 
            into compelling visual stories that resonate with your audience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero-filled" size="xl" className="group">
              Start Your Project
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero" size="xl">
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
