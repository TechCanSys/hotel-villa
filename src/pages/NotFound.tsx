
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-hotel-background pt-24">
        <div className="text-center px-4 max-w-xl">
          <h1 className="text-8xl font-bold text-hotel mb-4">404</h1>
          <p className="text-2xl text-hotel-text mb-8">Oops! Page not found</p>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="bg-hotel hover:bg-hotel-dark text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
