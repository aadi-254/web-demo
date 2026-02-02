import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import serviceHair from '@/assets/service-hair.jpg';
import serviceMakeup from '@/assets/service-makeup.jpg';
import serviceSkin from '@/assets/service-skin.jpg';
import serviceNails from '@/assets/service-nails.jpg';
import serviceSpa from '@/assets/service-spa.jpg';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    name: 'Hair Styling',
    description: 'Expert cuts, colors, and styling for your perfect look',
    image: serviceHair,
    price: 'From $120',
  },
  {
    id: 2,
    name: 'Makeup Artistry',
    description: 'Flawless makeup for every occasion and celebration',
    image: serviceMakeup,
    price: 'From $150',
  },
  {
    id: 3,
    name: 'Skincare',
    description: 'Rejuvenating facials and advanced skin treatments',
    image: serviceSkin,
    price: 'From $180',
  },
  {
    id: 4,
    name: 'Nail Care',
    description: 'Luxurious manicures and pedicures with premium polish',
    image: serviceNails,
    price: 'From $65',
  },
  {
    id: 5,
    name: 'Spa & Wellness',
    description: 'Relaxing massages and holistic body treatments',
    image: serviceSpa,
    price: 'From $200',
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.set(cardRef.current, { opacity: 0, y: 60 });

    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="service-card group cursor-pointer">
      <div className="service-card-image">
        <img src={service.image} alt={service.name} loading="lazy" />
        <div className="service-card-overlay">
          <span className="text-ivory text-sm tracking-widest uppercase font-medium">
            View Details
          </span>
        </div>
      </div>
      <div className="service-card-content">
        <h3 className="font-heading text-2xl text-charcoal mb-2">{service.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 font-light">{service.description}</p>
        <span className="text-gold font-medium text-sm tracking-wide">{service.price}</span>
      </div>
    </div>
  );
};

const ServicesPreview = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-luxury bg-cream">
      <div className="container-luxury">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-eyebrow mb-4 block">Our Expertise</span>
          <h2 className="text-headline text-charcoal mb-6">
            Signature Services
          </h2>
          <div className="divider-gold-lg mb-8" />
          <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
            Indulge in our curated collection of luxury beauty services, 
            each designed to enhance your natural radiance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/services" className="btn-luxury-outline">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
export { services, ServiceCard };
