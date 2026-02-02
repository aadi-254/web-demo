import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, MapPin, Phone, Send, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'sonner';

const Contact = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.contact-hero-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // Form animation
      gsap.from('.contact-form', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4,
      });

      // Info cards animation
      gsap.from('.contact-info-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.6,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    toast.success('Message sent successfully! We\'ll be in touch soon.');
    setFormData({ name: '', email: '', company: '', budget: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@vertexstudio.com',
      href: 'mailto:hello@vertexstudio.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Los Angeles, CA',
      href: '#',
    },
  ];

  return (
    <MainLayout showScene3D={false}>
      <div ref={pageRef} className="bg-background">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(38_20%_8%/0.3)_0%,_transparent_50%)]" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <p className="contact-hero-content text-cinema-gold text-sm tracking-[0.3em] uppercase font-body mb-4">
                Get In Touch
              </p>
              <h1 className="contact-hero-content text-5xl md:text-7xl lg:text-8xl font-display tracking-wider text-foreground mb-6">
                LET'S CREATE<br />
                <span className="text-gradient-gold">TOGETHER</span>
              </h1>
              <p className="contact-hero-content text-muted-foreground font-body text-lg max-w-2xl leading-relaxed">
                Have a project in mind? We'd love to hear about it. Drop us a line and 
                let's start a conversation about bringing your vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="contact-form">
                <h2 className="text-2xl font-display tracking-wider text-foreground mb-8">
                  START A PROJECT
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-body text-muted-foreground mb-2 tracking-wider uppercase">
                        Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-cinema-charcoal border-border focus:border-cinema-gold transition-colors h-12"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-muted-foreground mb-2 tracking-wider uppercase">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-cinema-charcoal border-border focus:border-cinema-gold transition-colors h-12"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-body text-muted-foreground mb-2 tracking-wider uppercase">
                        Company
                      </label>
                      <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-cinema-charcoal border-border focus:border-cinema-gold transition-colors h-12"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-muted-foreground mb-2 tracking-wider uppercase">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full h-12 bg-cinema-charcoal border border-border rounded-sm px-3 text-foreground focus:border-cinema-gold transition-colors focus:outline-none focus:ring-2 focus:ring-ring font-body"
                      >
                        <option value="">Select budget</option>
                        <option value="5k-15k">$5,000 - $15,000</option>
                        <option value="15k-30k">$15,000 - $30,000</option>
                        <option value="30k-50k">$30,000 - $50,000</option>
                        <option value="50k+">$50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-body text-muted-foreground mb-2 tracking-wider uppercase">
                      Project Details *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-cinema-charcoal border-border focus:border-cinema-gold transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button type="submit" variant="hero-filled" size="xl" className="w-full sm:w-auto group">
                    Send Message
                    <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-display tracking-wider text-foreground mb-8">
                    CONTACT INFO
                  </h2>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <a
                        key={index}
                        href={info.href}
                        className="contact-info-card flex items-center gap-4 p-6 bg-cinema-charcoal border border-border rounded-sm hover:border-cinema-gold transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 rounded-sm border border-cinema-gold/30 flex items-center justify-center group-hover:border-cinema-gold group-hover:bg-cinema-gold/10 transition-all duration-300">
                          <info.icon className="w-5 h-5 text-cinema-gold" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-body mb-1">
                            {info.label}
                          </p>
                          <p className="text-foreground font-body">
                            {info.value}
                          </p>
                        </div>
                        <ArrowUpRight 
                          size={20} 
                          className="text-muted-foreground group-hover:text-cinema-gold transition-colors" 
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Office Hours */}
                <div className="contact-info-card p-8 bg-cinema-charcoal border border-border rounded-sm">
                  <h3 className="text-lg font-display tracking-wider text-foreground mb-6">
                    OFFICE HOURS
                  </h3>
                  <div className="space-y-3 font-body text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="text-foreground">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="text-foreground">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="text-foreground">Closed</span>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="contact-info-card aspect-video rounded-sm overflow-hidden border border-border">
                  {/* Replace with actual map or image */}
                  <div className="w-full h-full bg-cinema-charcoal flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={40} className="text-cinema-gold mx-auto mb-4" />
                      <p className="text-muted-foreground text-sm font-body">
                        Map placeholder - Replace with actual map
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Contact;
