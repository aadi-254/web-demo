import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import product images - Replace these with your product images
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';

/**
 * Collections Page
 * Shop page with product grid and category filters
 */
const Collections = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'knitwear', name: 'Knitwear' },
    { id: 'tops', name: 'Tops' },
    { id: 'accessories', name: 'Accessories' },
  ];

  // Sample products - Replace with your product data
  const products = [
    {
      id: '1',
      name: 'Cashmere Knit',
      price: 890,
      image: product1,
      category: 'Knitwear',
      categoryId: 'knitwear',
    },
    {
      id: '2',
      name: 'Tailored Blazer',
      price: 1250,
      image: product2,
      category: 'Outerwear',
      categoryId: 'outerwear',
    },
    {
      id: '3',
      name: 'Silk Blouse',
      price: 650,
      image: product3,
      category: 'Tops',
      categoryId: 'tops',
    },
    {
      id: '4',
      name: 'Heritage Watch',
      price: 2400,
      image: product4,
      category: 'Accessories',
      categoryId: 'accessories',
    },
    {
      id: '5',
      name: 'Wool Overcoat',
      price: 1850,
      image: product2,
      category: 'Outerwear',
      categoryId: 'outerwear',
    },
    {
      id: '6',
      name: 'Merino Cardigan',
      price: 720,
      image: product1,
      category: 'Knitwear',
      categoryId: 'knitwear',
    },
    {
      id: '7',
      name: 'Linen Shirt',
      price: 480,
      image: product3,
      category: 'Tops',
      categoryId: 'tops',
    },
    {
      id: '8',
      name: 'Leather Belt',
      price: 350,
      image: product4,
      category: 'Accessories',
      categoryId: 'accessories',
    },
  ];

  // Filter products by category
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.categoryId === activeCategory);

  useEffect(() => {
    const hero = heroRef.current;
    const grid = gridRef.current;

    if (!hero || !grid) return;

    // Hero animation
    gsap.from(hero.querySelectorAll('.reveal-item'), {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Animate grid items when filter changes
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    gsap.from(grid.querySelectorAll('.product-item'), {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.out',
    });
  }, [activeCategory]);

  const handleQuickView = (id: string) => {
    console.log('Quick view product:', id);
    // Implement quick view modal here
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 md:pt-40 pb-16 md:pb-24 bg-background"
      >
        <div className="section-padding">
          <p className="reveal-item text-editorial text-muted-foreground mb-4">
            Shop
          </p>
          <h1 className="reveal-item heading-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8">
            Collections
          </h1>
          <p className="reveal-item text-lg text-muted-foreground max-w-lg">
            Discover our curated selection of timeless pieces, 
            crafted with the finest materials and attention to detail.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-line section-padding">
        <div className="h-px bg-border" />
      </div>

      {/* Filters & Products */}
      <section className="py-12 md:py-16 bg-background">
        <div className="section-padding">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 md:gap-8 mb-12 md:mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`text-editorial py-2 transition-all ${
                  activeCategory === category.id
                    ? 'text-foreground border-b border-accent'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  onQuickView={handleQuickView}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Collections;
