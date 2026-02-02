import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import useLenis from '@/hooks/useLenis';
import CustomCursor from '@/components/ui/CustomCursor';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout Component
 * Wraps all pages with header, footer, smooth scroll, and custom cursor
 */
const Layout = ({ children }: LayoutProps) => {
  // Initialize smooth scrolling
  useLenis();

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Custom cursor for desktop */}
      <CustomCursor />
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
