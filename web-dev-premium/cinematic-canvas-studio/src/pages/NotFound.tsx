import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <MainLayout showScene3D={false}>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-[12rem] md:text-[16rem] font-display text-gradient-gold leading-none mb-4">
            404
          </h1>
          <p className="text-2xl md:text-3xl font-display tracking-wider text-foreground mb-4">
            PAGE NOT FOUND
          </p>
          <p className="text-muted-foreground font-body max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/">
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
