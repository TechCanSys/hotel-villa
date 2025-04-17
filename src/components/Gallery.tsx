
import { useState } from 'react';
import { X } from 'lucide-react';
import { useFetchData } from '@/hooks/useSupabase';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type GalleryImage = {
  id: string;
  url: string;
  category: string;
  title: string;
  title_pt: string;
};

const Gallery = () => {
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const { data: galleryImages, isLoading } = useFetchData<GalleryImage>('gallery');
  
  const images = galleryImages || [];
  
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);
  
  const categories = [
    'all',
    'rooms',
    'dining',
    'meeting',
    'pool',
    'misc'
  ];
  
  const getCategoryTranslation = (category: string) => {
    const translations: Record<string, string> = {
      'all': 'Todas',
      'rooms': 'Quartos',
      'dining': 'Restaurante',
      'meeting': 'Sala de Reunião',
      'pool': 'Piscina',
      'misc': 'Diversos'
    };
    
    return language === 'en' 
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : translations[category] || category;
  };
  
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
            {t("Our Gallery", "Nossa Galeria")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hotel-text">
            {t("Explore Our Beautiful Spaces", "Explore Nossos Belos Espaços")}
          </h2>
          <p className="text-gray-600 mb-8">
            {t(
              "Take a visual journey through our elegant hotel and discover the luxurious experiences awaiting you.",
              "Faça uma jornada visual pelo nosso elegante hotel e descubra as experiências luxuosas que o aguardam."
            )}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === category
                    ? 'bg-hotel text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {getCategoryTranslation(category)}
              </button>
            ))}
          </div>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {filteredImages.map((image) => (
              <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                <div 
                  className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer h-72 mx-2"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <img 
                    src={image.url} 
                    alt={language === 'en' ? image.title : image.title_pt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="text-xl font-bold">{language === 'en' ? image.title : image.title_pt}</h3>
                      <p className="text-sm mt-2 capitalize">{getCategoryTranslation(image.category)}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
        
        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-hotel transition-colors"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>
              <img 
                src={selectedImage} 
                alt="Gallery" 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
