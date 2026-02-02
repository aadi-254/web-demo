import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-charcoal overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container-luxury relative z-10">
        <div ref={contentRef} className="text-center max-w-3xl mx-auto">
          <span className="text-eyebrow mb-6 block text-gold-light">
            Begin Your Journey
          </span>
          <h2 className="text-headline text-ivory mb-8">
            Ready to Experience<br />
            <em className="text-gold">Luxury Beauty?</em>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-gold mx-auto mb-8" />
          <p className="text-ivory/70 text-lg font-light mb-12 leading-relaxed">
            Book your appointment today and let our expert team craft 
            a personalized beauty experience just for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-luxury-gold">
              Book Your Appointment
            </Link>
            <a
              href="tel:+1234567890"
              className="btn-luxury text-ivory border border-ivory/30 hover:bg-ivory hover:text-charcoal transition-all"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
