
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import BackgroundSlider from './hero/BackgroundSlider';

const heroImages = [
  'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744816599225-y5hqufx243r.jpg',
  'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744816637524-7xsx2l1g27b.jpg',
  'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744816614166-qp1psup096b.jpg',
  'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744816622385-9k83niy7xyr.jpg',
  'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744816629914-sxgpmhvvqr.jpg'
];

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-screen">
      <BackgroundSlider images={heroImages} />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white z-10 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
          {t("Experience Luxury & Comfort", "Experimente Luxo & Conforto")}
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {t(
            "Discover the perfect blend of elegance, comfort, and exceptional service at Hotel Villa Capricho",
            "Descubra a combinação perfeita de elegância, conforto e serviço excepcional no Hotel Villa Capricho"
          )}
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Link to="/rooms" className="bg-hotel hover:bg-hotel-dark text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300">
            {t("Book Now", "Reserve Agora")}
          </Link>
          <Link
            to="/rooms"
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
          >
            {t("View Rooms", "Ver Quartos")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
