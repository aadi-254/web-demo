import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Scene3DBackground from '@/components/Scene3DBackground';

import serviceHair from '@/assets/service-hair.jpg';
import serviceMakeup from '@/assets/service-makeup.jpg';
import serviceSkin from '@/assets/service-skin.jpg';
import serviceNails from '@/assets/service-nails.jpg';
import serviceSpa from '@/assets/service-spa.jpg';

gsap.registerPlugin(ScrollTrigger);

const allServices = [
  {
    id: 1,
    category: 'Hair',
    name: 'Hair Styling',
    description: 'Expert cuts, colors, and styling for your perfect look. Our master stylists create personalized looks that enhance your natural beauty.',
    image: serviceHair,
    treatments: [
      { name: 'Precision Haircut', price: '$120' },
      { name: 'Color & Highlights', price: '$250' },
      { name: 'Balayage', price: '$350' },
      { name: 'Bridal Styling', price: '$400' },
      { name: 'Deep Conditioning', price: '$80' },
    ],
  },
  {
    id: 2,
    category: 'Beauty',
    name: 'Makeup Artistry',
    description: 'Flawless makeup for every occasion. From natural everyday looks to glamorous evening transformations.',
    image: serviceMakeup,
    treatments: [
      { name: 'Natural Glam', price: '$150' },
      { name: 'Evening Makeup', price: '$180' },
      { name: 'Bridal Makeup', price: '$350' },
      { name: 'Makeup Lesson', price: '$200' },
      { name: 'Lash Extensions', price: '$250' },
    ],
  },
  {
    id: 3,
    category: 'Skin',
    name: 'Skincare',
    description: 'Rejuvenating facials and advanced skin treatments using the finest products and techniques.',
    image: serviceSkin,
    treatments: [
      { name: 'Signature Facial', price: '$180' },
      { name: 'Hydrafacial', price: '$250' },
      { name: 'Anti-Aging Treatment', price: '$320' },
      { name: 'Chemical Peel', price: '$200' },
      { name: 'LED Light Therapy', price: '$150' },
    ],
  },
  {
    id: 4,
    category: 'Nails',
    name: 'Nail Care',
    description: 'Luxurious manicures and pedicures with premium polish and meticulous attention to detail.',
    image: serviceNails,
    treatments: [
      { name: 'Classic Manicure', price: '$65' },
      { name: 'Gel Manicure', price: '$85' },
      { name: 'Spa Pedicure', price: '$95' },
      { name: 'Nail Art', price: '$40+' },
      { name: 'Mani-Pedi Combo', price: '$140' },
    ],
  },
  {
    id: 5,
    category: 'Wellness',
    name: 'Spa & Wellness',
    description: 'Relaxing massages and holistic body treatments for complete rejuvenation of body and mind.',
    image: serviceSpa,
    treatments: [
      { name: 'Swedish Massage', price: '$200' },
      { name: 'Deep Tissue Massage', price: '$250' },
      { name: 'Hot Stone Therapy', price: '$280' },
      { name: 'Aromatherapy', price: '$220' },
      { name: 'Body Wrap', price: '$180' },
    ],
  },
];

const ServiceDetailCard = ({ service, index }: { service: typeof allServices[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, y: 60 });

      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(cardRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        },
      });

      // Image parallax
      if (imageRef.current) {
        gsap.to(imageRef.current.querySelector('img'), {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [index]);

  const isReversed = index % 2 === 1;

  return (
    <div
      ref={cardRef}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image */}
      <div
        ref={imageRef}
        className={`relative overflow-hidden aspect-[4/5] ${isReversed ? 'lg:order-2' : ''}`}
      >
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
      </div>

      {/* Content */}
      <div className={`${isReversed ? 'lg:order-1' : ''}`}>
        <span className="text-eyebrow mb-4 block">{service.category}</span>
        <h2 className="text-subheadline text-charcoal mb-4">{service.name}</h2>
        <div className="divider-gold mb-6 mx-0" />
        <p className="text-muted-foreground mb-8 font-light leading-relaxed">
          {service.description}
        </p>

        {/* Treatments List */}
        <div className="space-y-4">
          {service.treatments.map((treatment) => (
            <div
              key={treatment.name}
              className="flex justify-between items-center py-3 border-b border-border group hover:border-gold transition-colors duration-300"
            >
              <span className="text-charcoal font-light group-hover:text-gold transition-colors duration-300">
                {treatment.name}
              </span>
              <span className="text-gold font-medium">{treatment.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  useSmoothScroll();

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = headerRef.current?.children;
      if (elements) {
        gsap.set(elements, { opacity: 0, y: 40 });
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.3,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <div className="grain-overlay" />
      <Navigation />

      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-cream overflow-hidden pt-24">
          <Scene3DBackground variant="minimal" className="opacity-40" />
          <div ref={headerRef} className="container-luxury text-center relative z-10">
            <span className="text-eyebrow mb-4 block">Our Expertise</span>
            <h1 className="text-display text-charcoal mb-6">
              Our <em className="text-gold">Services</em>
            </h1>
            <div className="divider-gold-lg mb-8" />
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive range of luxury beauty services, 
              each designed to pamper, transform, and rejuvenate.
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="section-luxury bg-ivory">
          <div className="container-luxury space-y-32">
            {allServices.map((service, index) => (
              <ServiceDetailCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
