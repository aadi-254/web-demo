import { useState, useRef, useEffect, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Scene3DBackground from '@/components/Scene3DBackground';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useSmoothScroll();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.children;
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

      // Form animation
      if (formRef.current) {
        gsap.set(formRef.current, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: formRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(formRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            });
          },
        });
      }

      // Info animation
      if (infoRef.current) {
        gsap.set(infoRef.current, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: infoRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(infoRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.2,
              ease: 'power3.out',
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success('Thank you! We will contact you shortly to confirm your appointment.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Elegance Avenue\nBeverly Hills, CA 90210',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '(123) 456-7890',
      href: 'tel:+1234567890',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'hello@lumiere.com',
      href: 'mailto:hello@lumiere.com',
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon - Sat: 9am - 8pm\nSunday: 10am - 6pm',
    },
  ];

  return (
    <div className="relative overflow-x-hidden">
      <div className="grain-overlay" />
      <Navigation />

      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-cream overflow-hidden pt-24">
          <Scene3DBackground variant="contact" className="opacity-40" />
          <div ref={headerRef} className="container-luxury text-center relative z-10">
            <span className="text-eyebrow mb-4 block">Get in Touch</span>
            <h1 className="text-display text-charcoal mb-6">
              Book Your <em className="text-gold">Experience</em>
            </h1>
            <div className="divider-gold-lg mb-8" />
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Ready to transform? Schedule your appointment and let us 
              create a personalized beauty experience just for you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-luxury bg-ivory">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Booking Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                <h2 className="text-subheadline text-charcoal mb-8">
                  Book an Appointment
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="input-luxury"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className="input-luxury"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="input-luxury"
                    />
                  </div>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="input-luxury appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select Service</option>
                      <option value="hair">Hair Styling</option>
                      <option value="makeup">Makeup Artistry</option>
                      <option value="skincare">Skincare</option>
                      <option value="nails">Nail Care</option>
                      <option value="spa">Spa & Wellness</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input-luxury"
                    required
                  />
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Additional Notes (optional)"
                    rows={4}
                    className="input-luxury resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-luxury-gold w-full md:w-auto flex items-center justify-center gap-3 group"
                >
                  <span>Request Appointment</span>
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Contact Info */}
              <div ref={infoRef} className="space-y-8">
                <h2 className="text-subheadline text-charcoal mb-8">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="group">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                        <info.icon size={20} className="text-gold" />
                      </div>
                      <h3 className="text-charcoal font-medium mb-2">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-muted-foreground font-light hover:text-gold transition-colors duration-300 whitespace-pre-line"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground font-light whitespace-pre-line">
                          {info.content}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="mt-12 aspect-video bg-warm-beige overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={48} className="text-gold mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground text-sm">
                        Interactive Map
                        <br />
                        <span className="text-xs">(Replace with Google Maps embed)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
