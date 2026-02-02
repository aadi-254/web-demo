import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import lookbook images - Replace these with your editorial images
import lookbook1 from '@/assets/lookbook-1.jpg';
import lookbook2 from '@/assets/lookbook-2.jpg';
import lookbook3 from '@/assets/lookbook-3.jpg';

/**
 * LookbookSection Component
 * Editorial-style image gallery with parallax and reveal effects
 */
const LookbookSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Lookbook images data - Replace with your images
  const lookbookImages = [
    {
      id: '1',
      image: lookbook1,
      title: 'Ethereal Movement',
      description: 'Spring 2025',
    },
    {
      id: '2',
      image: lookbook2,
      title: 'Intimate Details',
      description: 'Accessories',
    },
    {
      id: '3',
      image: lookbook3,
      title: 'Bold Silhouettes',
      description: 'Outerwear',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    // Title animation
    gsap.from(title.querySelectorAll('.reveal-item'), {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
      },
    });

    // Image reveal and parallax
    imagesRef.current.forEach((imageContainer, index) => {
      if (!imageContainer) return;

      const image = imageContainer.querySelector('img');
      const overlay = imageContainer.querySelector('.image-overlay');
      const content = imageContainer.querySelector('.image-content');

      // Reveal animation
      gsap.from(overlay, {
        scaleY: 1,
        transformOrigin: index % 2 === 0 ? 'bottom' : 'top',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: imageContainer,
          start: 'top 70%',
        },
      });

      // Content reveal
      if (content) {
        gsap.from(content, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageContainer,
            start: 'top 70%',
          },
        });
      }

      // Parallax effect
      if (image) {
        gsap.to(image, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: imageContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-secondary py-24 md:py-32"
    >
      {/* Section Title */}
      <div
        ref={titleRef}
        className="section-padding mb-16 md:mb-24"
      >
        <p className="reveal-item text-editorial text-muted-foreground mb-4">
          Editorial
        </p>
        <h2 className="reveal-item heading-editorial text-4xl md:text-6xl text-foreground">
          The Lookbook
        </h2>
      </div>

      {/* Image Grid */}
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {lookbookImages.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (imagesRef.current[index] = el)}
              className={`relative overflow-hidden ${
                index === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
              }`}
            >
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden">
                {/* Replace image here - Add your lookbook images */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[120%] object-cover"
                  loading="lazy"
                />

                {/* Reveal Overlay */}
                <div
                  className="image-overlay absolute inset-0 bg-secondary origin-bottom"
                  style={{ transform: 'scaleY(0)' }}
                />
              </div>

              {/* Content Overlay */}
              <div className="image-content absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-primary/60 to-transparent">
                <p className="text-editorial text-primary-foreground/70 mb-2">
                  {item.description}
                </p>
                <h3 className="heading-editorial text-2xl md:text-3xl text-primary-foreground">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LookbookSection;
