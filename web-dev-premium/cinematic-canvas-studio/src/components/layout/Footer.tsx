import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Linkedin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative bg-cinema-dark border-t border-border/30">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link 
              to="/" 
              className="text-3xl font-display tracking-[0.2em] text-foreground inline-block"
            >
              VERTEX<span className="text-cinema-gold">.</span>
            </Link>
            <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xs">
              Crafting cinematic experiences through motion, design, and technology. 
              Every frame tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-display tracking-[0.3em] uppercase text-foreground">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-cinema-gold transition-colors duration-300 text-sm font-body flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight 
                      size={14} 
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h4 className="text-sm font-display tracking-[0.3em] uppercase text-foreground">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:border-cinema-gold hover:text-cinema-gold transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm font-body">
              hello@vertexstudio.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs font-body tracking-wider">
            © {currentYear} VERTEX STUDIO. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-body tracking-wider">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
