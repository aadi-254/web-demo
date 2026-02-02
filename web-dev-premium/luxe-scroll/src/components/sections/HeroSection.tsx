import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Replace hero image here - use your own fashion hero image
import heroImage from '@/assets/hero-fashion.jpg';

/**
 * HeroSection Component
 * Full-screen hero with GSAP text animations and parallax
 */
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const cta = ctaRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;

    if (!section || !heading || !subheading || !cta || !image || !overlay) return;

    // Create animation timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate overlay reveal
    tl.to(overlay, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.2,
      ease: 'power4.inOut',
    });

    // Animate heading with letter reveal effect
    const headingChars = heading.querySelectorAll('.char');
    tl.from(
      headingChars,
      {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    // Animate subheading
    tl.from(
      subheading,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    // Animate CTA
    tl.from(
      cta,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.6'
    );

    // Parallax effect on scroll
    gsap.to(image.querySelector('img'), {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Split heading text into individual characters for animation
  const headingText = 'New Collection';
  const splitText = headingText.split('').map((char, i) => (
    <span key={i} className="char inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {/* Replace image here - Add your hero fashion image */}
        <img
          src={heroImage}
          alt="Fashion collection hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay for reveal animation */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background z-10"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient z-20" />

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col justify-end section-padding pb-16 md:pb-24">
        <div className="max-w-4xl">
          {/* Season Tag */}
          <p className="text-editorial text-primary-foreground/80 mb-4">
            Spring / Summer 2025
          </p>

          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="heading-display text-6xl md:text-8xl lg:text-9xl text-primary-foreground mb-6 overflow-hidden"
          >
            {splitText}
          </h1>

          {/* Subheading */}
          <p
            ref={subheadingRef}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-lg mb-8 font-light"
          >
            Discover timeless elegance crafted with intention. 
            Where modern design meets artisanal quality.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="flex items-center gap-6">
            <Link
              to="/collections"
              className="inline-flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 text-editorial transition-all hover:bg-accent hover:text-accent-foreground"
            >
              View Collection
            </Link>
            <Link
              to="/collections"
              className="text-editorial text-primary-foreground/80 gold-underline py-2"
            >
              Explore All
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ArrowDown className="w-6 h-6 text-primary-foreground/60" strokeWidth={1} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
