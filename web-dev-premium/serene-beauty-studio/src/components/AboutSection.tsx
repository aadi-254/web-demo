import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content animation
      gsap.set(contentRef.current, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });
        },
      });

      // Stats animation
      if (statsRef.current) {
        const statItems = statsRef.current.children;
        gsap.set(statItems, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(statItems, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '15+', label: 'Years of Excellence' },
    { value: '50+', label: 'Expert Stylists' },
    { value: '10K+', label: 'Happy Clients' },
    { value: '25+', label: 'Awards Won' },
  ];

  return (
    <section ref={sectionRef} className="section-luxury bg-warm-beige">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="text-eyebrow mb-4 block">Our Story</span>
            <h2 className="text-headline text-charcoal mb-8">
              Crafting Beauty<br />
              <em className="text-gold">Since 2009</em>
            </h2>
            <div className="divider-gold-lg mb-8 mx-0" />
            <p className="text-body-large text-muted-foreground mb-6">
              Lumière was born from a vision to create a sanctuary where beauty 
              transcends the ordinary. Our team of world-class artisans combines 
              traditional techniques with innovative approaches to deliver 
              transformative experiences.
            </p>
            <p className="text-body-large text-muted-foreground mb-10">
              Every treatment is a journey, every visit an escape into elegance. 
              We believe that true beauty emerges when artistry meets intention.
            </p>
            <Link to="/contact" className="btn-luxury-primary">
              Experience Lumière
            </Link>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-8 bg-ivory/50 backdrop-blur-sm"
              >
                <span className="font-heading text-5xl text-gold block mb-2">
                  {stat.value}
                </span>
                <span className="text-charcoal-light text-sm tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
