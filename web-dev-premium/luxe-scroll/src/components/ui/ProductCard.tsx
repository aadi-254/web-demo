import { useRef } from 'react';
import { gsap } from 'gsap';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  onQuickView?: (id: string) => void;
}

/**
 * ProductCard Component
 * Editorial-style product card with hover animations
 * Replace image prop with your product images
 */
const ProductCard = ({ id, name, price, image, category, onQuickView }: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!imageRef.current || !overlayRef.current) return;
    
    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.8,
      ease: 'power2.out',
    });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current || !overlayRef.current) return;
    
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      ref={cardRef}
      className="product-card group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onQuickView?.(id)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
        {/* Replace image here - Add your product images */}
        <img
          ref={imageRef}
          src={image}
          alt={name}
          className="product-card-image w-full h-full object-cover"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0"
        >
          <span className="text-editorial text-primary-foreground bg-primary px-6 py-3 transition-transform hover:scale-105">
            Quick View
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        {category && (
          <p className="text-editorial text-muted-foreground text-xs">
            {category}
          </p>
        )}
        <h3 className="heading-editorial text-lg md:text-xl text-foreground group-hover:text-accent transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground font-light">
          {formatPrice(price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
