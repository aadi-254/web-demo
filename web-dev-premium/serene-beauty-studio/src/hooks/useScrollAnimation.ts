import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
}

export const useScrollAnimation = (
  animationCallback: (element: HTMLElement, gsapInstance: typeof gsap) => void,
  options: UseScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const {
      trigger,
      start = 'top 85%',
      end = 'bottom 15%',
      scrub = false,
      once = true,
    } = options;

    const ctx = gsap.context(() => {
      animationCallback(element, gsap);
      
      ScrollTrigger.create({
        trigger: trigger || element,
        start,
        end,
        scrub,
        once,
        onEnter: () => {
          element.classList.add('revealed');
        },
      });
    }, element);

    return () => ctx.revert();
  }, [animationCallback, options]);

  return elementRef;
};

// Pre-built animation hooks
export const useFadeUp = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    gsap.set(element, { opacity: 0, y: 60 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: 'power3.out',
          });
        },
      });
    });

    return () => ctx.revert();
  }, [delay]);

  return ref;
};

export const useParallax = (speed = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
};

export const useTextReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const text = element.textContent || '';
    
    // Split text into characters
    element.innerHTML = text
      .split('')
      .map((char) => `<span class="split-char">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const chars = element.querySelectorAll('.split-char');

    gsap.set(chars, { opacity: 0, y: '100%' });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out',
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

export const useStaggerReveal = (staggerDelay = 0.1) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const children = container.children;

    gsap.set(children, { opacity: 0, y: 40 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: staggerDelay,
            ease: 'power3.out',
          });
        },
      });
    });

    return () => ctx.revert();
  }, [staggerDelay]);

  return containerRef;
};
