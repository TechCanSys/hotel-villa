import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Welcome = () => {
  const { language, setLanguage, t } = useLanguage();

  const videos = [
    'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744818014524-hy5a9ll363p.mp4',
    'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744818036977-xj5farbrgoh.mp4',
  ];

  const fallbackImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35ad85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(videos.map(() => false));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 25000); // 25 segundos por vídeo

    return () => clearInterval(interval);
  }, [videos.length]);

  const handleVideoError = (index: number) => {
    const updatedErrors = [...errors];
    updatedErrors[index] = true;
    setErrors(updatedErrors);
  };

  return (
    <section className="py-24 md:py-32 bg-hotel-background">
      <div className="container mx-auto px-4">
        {/* Seletor de idioma */}
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="order-2 lg:order-1">
            <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
              {t('Welcome to Hotel Villa Capricho', 'Bem-vindo ao Hotel Villa Capricho')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hotel-text">
              {t('Experience Luxury Like Never Before', 'Experimente o luxo como nunca antes')}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t(
                'Nestled in the heart of Mozambique, Hotel Villa Capricho offers an unforgettable blend of luxury, comfort, and authentic hospitality. Our elegant establishment is designed to provide guests with a serene escape while ensuring all modern amenities are at your fingertips.',
                'No coração de Moçambique, o Hotel Villa Capricho oferece uma combinação inesquecível de luxo, conforto e hospitalidade autêntica. Nossa estrutura elegante proporciona aos hóspedes uma fuga serena com todas as comodidades modernas.'
              )}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t(
                'From our meticulously designed rooms to our world-class facilities, every aspect of Hotel Villa Capricho is crafted to exceed your expectations. Whether you\'re visiting for business or leisure, our dedicated staff ensures your stay is nothing short of extraordinary.',
                'Dos quartos projetados com cuidado às nossas instalações de classe mundial, cada detalhe do Hotel Villa Capricho é feito para superar suas expectativas. Seja a negócios ou lazer, nossa equipe dedicada garante uma estadia extraordinária.'
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="flex items-center gap-2 text-hotel hover:text-hotel-dark transition-colors font-medium"
              >
                {t('Discover Our Story', 'Conheça Nossa História')} <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Vídeo ou fallback */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl">
              {errors[currentIndex] ? (
                <img
                  src={fallbackImages[currentIndex]}
                  alt="Hotel Villa Capricho"
                  className="w-full h-full object-cover transition-opacity duration-25000"
                />
              ) : (
                <video
                  key={currentIndex}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => handleVideoError(currentIndex)}
                  className="w-full h-full object-cover transition-opacity duration-2000"
                >
                  <source src={videos[currentIndex]} type="video/mp4" />
                </video>
              )}

              <div className="absolute bottom-1 right-1 bg-hotel p-1 text-white rounded-lg shadow-lg max-w-xs">
                <p className="text-sm opacity-90">
                  {t('Of exceptional service and hospitality excellence', 'Excelência em hospitalidade e atendimento excepcional')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
