import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

/**
 * Footer Component
 * Minimal, editorial-style footer with social links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Collections', path: '/collections' },
      { name: 'New Arrivals', path: '/collections' },
      { name: 'Best Sellers', path: '/collections' },
    ],
    info: [
      { name: 'About Us', path: '/contact' },
      { name: 'Contact', path: '/contact' },
      { name: 'Shipping', path: '/contact' },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-padding py-16 md:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="heading-editorial text-3xl md:text-4xl mb-6">
              ATELIER
            </h2>
            <p className="text-primary-foreground/70 max-w-sm leading-relaxed">
              Curated luxury fashion for the modern individual. 
              Timeless pieces crafted with intention.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-editorial text-primary-foreground/50 mb-6">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="text-editorial text-primary-foreground/50 mb-6">
              Information
            </h3>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-line bg-primary-foreground/20 my-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-primary-foreground/50">
            © {currentYear} Atelier. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-all hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-all hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>

          {/* Newsletter Signup Teaser */}
          <p className="text-editorial text-primary-foreground/50">
            Subscribe for exclusive access
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
