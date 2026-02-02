import { ReactNode, useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import Navigation from './Navigation';
import Footer from './Footer';
import Scene3D from '@/components/three/Scene3D';

interface MainLayoutProps {
  children: ReactNode;
  showScene3D?: boolean;
}

const MainLayout = ({ children, showScene3D = true }: MainLayoutProps) => {
  useLenis();

  // Add film grain class to body
  useEffect(() => {
    document.body.classList.add('film-grain');
    return () => {
      document.body.classList.remove('film-grain');
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* 3D Background Scene */}
      {showScene3D && <Scene3D />}

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-0">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
