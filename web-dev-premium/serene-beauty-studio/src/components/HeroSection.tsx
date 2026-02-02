import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene3DBackground from '@/components/Scene3DBackground';
import heroImage from '@/assets/hero-salon.jpg';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(headingRef.current, { opacity: 0, y: 80 });
      gsap.set(subheadingRef.current, { opacity: 0, y: 40 });
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });
      gsap.set(imageRef.current, { opacity: 0, scale: 1.1 });

      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
      })
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=1'
        )
        .to(
          subheadingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        );

      // Parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImage}
          alt="Lumière Beauty Studio Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-ivory/10 to-ivory/80" />
        <div className="absolute inset-0 bg-charcoal/20" />
      </div>

      {/* 3D Background Elements */}
      <Scene3DBackground variant="hero" className="z-10 opacity-60" />

      {/* Content */}
      <div className="relative z-20 container-luxury text-center pt-20">
        <span className="text-eyebrow mb-6 block">Welcome to Lumière</span>
        
        <h1
          ref={headingRef}
          className="text-display text-charcoal mb-8 max-w-4xl mx-auto"
        >
          Where Beauty
          <br />
          <em className="text-gold">Becomes Art</em>
        </h1>

        <p
          ref={subheadingRef}
          className="text-body-large text-charcoal-light max-w-2xl mx-auto mb-12"
        >
          Experience the pinnacle of luxury beauty services in an atmosphere of 
          refined elegance and tranquil sophistication.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="btn-luxury-gold">
            Book Appointment
          </Link>
          <Link to="/services" className="btn-luxury-outline">
            Explore Services
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent animate-pulse-soft" />
      </div>
    </section>
  );
};

export default HeroSection;
