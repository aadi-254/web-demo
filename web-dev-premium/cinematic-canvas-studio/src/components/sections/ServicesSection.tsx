import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Camera, Palette, Wand2, Music, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Film,
    title: 'Video Production',
    description: 'Full-service video production from concept development to final delivery, including commercials, brand films, and documentaries.',
  },
  {
    icon: Camera,
    title: 'Cinematography',
    description: 'Stunning visuals captured with state-of-the-art equipment and techniques that bring your vision to life.',
  },
  {
    icon: Palette,
    title: 'Color Grading',
    description: 'Professional color correction and grading that establishes mood, enhances storytelling, and creates visual consistency.',
  },
  {
    icon: Wand2,
    title: 'VFX & Motion',
    description: 'Visual effects and motion graphics that seamlessly blend with live action to create impossible worlds.',
  },
  {
    icon: Music,
    title: 'Sound Design',
    description: 'Immersive audio experiences with custom sound design, mixing, and original music composition.',
  },
  {
    icon: Layers,
    title: 'Post Production',
    description: 'Expert editing, compositing, and finishing services that transform raw footage into polished content.',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            end: 'top 25%',
            toggleActions: 'play none none reverse',
          },
          y: 80,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-cinema-dark"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(38_20%_8%/0.3)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-cinema-gold text-sm tracking-[0.3em] uppercase font-body mb-4">
            What We Do
          </p>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-display tracking-wider text-foreground"
          >
            OUR <span className="text-gradient-gold">SERVICES</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group cursor-pointer"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-sm border border-cinema-gold/30 flex items-center justify-center mb-6 group-hover:border-cinema-gold group-hover:bg-cinema-gold/10 transition-all duration-500">
                <service.icon className="w-6 h-6 text-cinema-gold" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-display tracking-wider text-foreground mb-4 group-hover:text-cinema-gold transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                {service.description}
              </p>

              {/* Hover indicator */}
              <div className="mt-6 flex items-center gap-2 text-cinema-gold opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <span className="text-xs tracking-[0.2em] uppercase font-body">Learn More</span>
                <span className="text-lg">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
