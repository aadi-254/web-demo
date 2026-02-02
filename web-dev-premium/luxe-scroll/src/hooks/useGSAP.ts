import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP animations with ScrollTrigger
 * Handles cleanup automatically
 */
export const useGSAP = () => {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    return () => {
      // Kill all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  /**
   * Create a GSAP context for scoped animations
   */
  const createContext = (scope: Element | string) => {
    if (contextRef.current) {
      contextRef.current.revert();
    }
    contextRef.current = gsap.context(() => {}, scope);
    return contextRef.current;
  };

  /**
   * Animate elements on scroll reveal
   */
  const scrollReveal = (
    element: Element | string,
    options?: {
      y?: number;
      opacity?: number;
      duration?: number;
      delay?: number;
      stagger?: number;
      start?: string;
      end?: string;
    }
  ) => {
    const defaults = {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0,
      stagger: 0.1,
      start: 'top 85%',
      end: 'bottom 15%',
    };

    const config = { ...defaults, ...options };

    gsap.from(element, {
      y: config.y,
      opacity: config.opacity,
      duration: config.duration,
      delay: config.delay,
      stagger: config.stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: config.start,
        end: config.end,
        toggleActions: 'play none none reverse',
      },
    });
  };

  /**
   * Parallax effect for images
   */
  const parallax = (
    element: Element | string,
    options?: {
      yPercent?: number;
      start?: string;
      end?: string;
    }
  ) => {
    const defaults = {
      yPercent: -20,
      start: 'top bottom',
      end: 'bottom top',
    };

    const config = { ...defaults, ...options };

    gsap.to(element, {
      yPercent: config.yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: config.start,
        end: config.end,
        scrub: true,
      },
    });
  };

  /**
   * Text reveal animation with letter stagger
   */
  const textReveal = (element: Element | string, delay = 0) => {
    gsap.from(element, {
      y: '100%',
      opacity: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      stagger: 0.02,
    });
  };

  /**
   * Horizontal scroll section
   */
  const horizontalScroll = (
    container: Element | string,
    wrapper: Element | string
  ) => {
    const containerEl = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;
    
    if (!containerEl) return;

    const wrapperEl = typeof wrapper === 'string'
      ? containerEl.querySelector(wrapper)
      : wrapper;

    if (!wrapperEl) return;

    const items = wrapperEl.querySelectorAll('.horizontal-item');
    const totalWidth = Array.from(items).reduce((acc, item) => 
      acc + (item as HTMLElement).offsetWidth, 0
    );

    gsap.to(wrapperEl, {
      x: () => -(totalWidth - window.innerWidth + 100),
      ease: 'none',
      scrollTrigger: {
        trigger: containerEl,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });
  };

  return {
    gsap,
    ScrollTrigger,
    createContext,
    scrollReveal,
    parallax,
    textReveal,
    horizontalScroll,
  };
};

export default useGSAP;
