import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * NewsletterSection Component
 * Email capture section with animated reveal
 */
const NewsletterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Animate content elements
    gsap.from(content.querySelectorAll('.reveal-item'), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      // Here you would typically send the email to your backend
      console.log('Newsletter signup:', email);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-primary text-primary-foreground py-24 md:py-32"
    >
      <div className="section-padding">
        <div
          ref={contentRef}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Title */}
          <p className="reveal-item text-editorial text-primary-foreground/60 mb-4">
            Stay Connected
          </p>
          <h2 className="reveal-item heading-editorial text-3xl md:text-5xl mb-6">
            Join the Atelier
          </h2>
          <p className="reveal-item text-primary-foreground/70 mb-10 max-w-md mx-auto">
            Be the first to know about new collections, exclusive events, 
            and behind-the-scenes content.
          </p>

          {/* Form */}
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="reveal-item flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-transparent border border-primary-foreground/30 px-6 py-4 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-primary-foreground text-primary px-8 py-4 text-editorial transition-all hover:bg-accent hover:text-accent-foreground"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <p className="reveal-item text-accent text-lg">
              Thank you for subscribing!
            </p>
          )}

          {/* Privacy Note */}
          <p className="reveal-item text-xs text-primary-foreground/40 mt-6">
            By subscribing, you agree to receive marketing communications from Atelier.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
