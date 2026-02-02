import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '@/components/layout/Layout';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Contact Page
 * Minimal contact form with store information
 */
const Contact = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!hero || !form || !info) return;

    // Hero animation
    gsap.from(hero.querySelectorAll('.reveal-item'), {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // Form animation
    gsap.from(form.querySelectorAll('.form-item'), {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.3,
      ease: 'power3.out',
    });

    // Info animation
    gsap.from(info.querySelectorAll('.info-item'), {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.5,
      ease: 'power3.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to your backend
  };

  // Store information - Replace with your actual store details
  const storeInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Fashion Avenue\nNew York, NY 10001',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@atelier.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (212) 555-0123',
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon - Sat: 10am - 7pm\nSun: 12pm - 6pm',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 md:pt-40 pb-16 md:pb-24 bg-background"
      >
        <div className="section-padding">
          <p className="reveal-item text-editorial text-muted-foreground mb-4">
            Get in Touch
          </p>
          <h1 className="reveal-item heading-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8">
            Contact
          </h1>
          <p className="reveal-item text-lg text-muted-foreground max-w-lg">
            We'd love to hear from you. Whether you have a question about our 
            collections, sizing, or anything else, our team is ready to help.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-line section-padding">
        <div className="h-px bg-border" />
      </div>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {/* Contact Form */}
            <div>
              <h2 className="heading-editorial text-2xl md:text-3xl text-foreground mb-8">
                Send a Message
              </h2>

              {!isSubmitted ? (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="form-item">
                    <label
                      htmlFor="name"
                      className="block text-editorial text-muted-foreground mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border border-border px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="form-item">
                    <label
                      htmlFor="email"
                      className="block text-editorial text-muted-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border border-border px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="form-item">
                    <label
                      htmlFor="subject"
                      className="block text-editorial text-muted-foreground mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border border-border px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="form-item">
                    <label
                      htmlFor="message"
                      className="block text-editorial text-muted-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full bg-transparent border border-border px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="form-item w-full md:w-auto bg-primary text-primary-foreground px-12 py-4 text-editorial transition-all hover:bg-accent hover:text-accent-foreground"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="bg-secondary p-8 text-center">
                  <p className="heading-editorial text-2xl text-foreground mb-4">
                    Thank You
                  </p>
                  <p className="text-muted-foreground">
                    We've received your message and will get back to you shortly.
                  </p>
                </div>
              )}
            </div>

            {/* Store Info */}
            <div ref={infoRef}>
              <h2 className="heading-editorial text-2xl md:text-3xl text-foreground mb-8">
                Store Information
              </h2>

              <div className="space-y-8">
                {storeInfo.map((item, index) => (
                  <div key={index} className="info-item flex gap-4">
                    <div className="flex-shrink-0">
                      <item.icon
                        className="w-5 h-5 text-accent"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3 className="text-editorial text-muted-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-foreground whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="info-item mt-12 aspect-video bg-secondary flex items-center justify-center">
                <p className="text-editorial text-muted-foreground">
                  {/* Replace with actual map component or embed */}
                  Map Placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
