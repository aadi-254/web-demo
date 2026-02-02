import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: 'mailto:hello@lumiere.com', label: 'Email' },
  ];

  return (
    <footer className="bg-charcoal text-ivory py-20">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-3xl mb-4">Lumière</h3>
            <p className="text-ivory/70 text-sm leading-relaxed font-light">
              A sanctuary of beauty and wellness, where luxury meets tranquility.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-eyebrow mb-6 text-gold-light">Navigate</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-ivory/70 hover:text-gold transition-colors duration-300 text-sm font-light"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-eyebrow mb-6 text-gold-light">Services</h4>
            <ul className="space-y-3">
              {['Hair Styling', 'Makeup Artistry', 'Skincare', 'Spa & Wellness', 'Nail Care'].map((item) => (
                <li key={item}>
                  <span className="text-ivory/70 text-sm font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-eyebrow mb-6 text-gold-light">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-ivory/70 text-sm font-light">
                  123 Elegance Avenue<br />
                  Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <a href="tel:+1234567890" className="text-ivory/70 hover:text-gold text-sm font-light transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a href="mailto:hello@lumiere.com" className="text-ivory/70 hover:text-gold text-sm font-light transition-colors">
                  hello@lumiere.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-ivory/50 text-xs font-light">
            © {currentYear} Lumière Beauty Studio. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-ivory/50 hover:text-gold transition-all duration-300 hover:scale-110"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
