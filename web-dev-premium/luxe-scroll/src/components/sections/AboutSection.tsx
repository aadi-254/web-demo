import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * AboutSection Component
 * Brand story section with animated text reveal
 */
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Animate content elements
    gsap.from(content.querySelectorAll('.reveal-item'), {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
      },
    });

    // Animate the decorative line
    gsap.from('.decorative-line', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-background py-32 md:py-48"
    >
      <div className="section-padding">
        <div className="max-w-4xl mx-auto text-center" ref={contentRef}>
          {/* Decorative Line */}
          <div className="decorative-line w-24 h-px bg-accent mx-auto mb-12" />

          {/* Quote */}
          <blockquote className="reveal-item heading-editorial text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-12">
            "Fashion is not about utility. An accessory is merely a piece of 
            <span className="text-accent"> iconography</span> used to express 
            individual identity."
          </blockquote>

          {/* Author */}
          <p className="reveal-item text-editorial text-muted-foreground mb-8">
            — Atelier Philosophy
          </p>

          {/* CTA */}
          <Link
            to="/contact"
            className="reveal-item inline-flex items-center gap-3 text-editorial text-foreground gold-underline py-2"
          >
            Discover Our Story
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
