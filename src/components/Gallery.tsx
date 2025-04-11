
import { useState } from 'react';
import { X } from 'lucide-react';
import { useFetchData } from '@/hooks/useSupabase';
import { useLanguage } from '@/contexts/LanguageContext';

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
  
  // Fallback images if Supabase data isn't loaded yet
  const fallbackImages = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'rooms',
      title: 'Luxury Suite',
      title_pt: 'Suíte de Luxo'
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'dining',
      title: 'Restaurant',
      title_pt: 'Restaurante'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'spa',
      title: 'Wellness Center',
      title_pt: 'Centro de Bem-estar'
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      category: 'rooms',
      title: 'Executive Room',
      title_pt: 'Quarto Executivo'
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      category: 'amenities',
      title: 'Swimming Pool',
      title_pt: 'Piscina'
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1621275471769-e6aa344546d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      category: 'dining',
      title: 'Bar & Lounge',
      title_pt: 'Bar & Lounge'
    }
  ];
  
  // Use Supabase data if available, otherwise use fallback
  const images = galleryImages && galleryImages.length > 0 ? galleryImages : fallbackImages;
  
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);
  
  const categories = ['all', ...new Set(images.map(img => img.category))];
  
  const getCategoryTranslation = (category: string) => {
    const translations: Record<string, string> = {
      'all': 'Todos',
      'rooms': 'Quartos',
      'dining': 'Restaurante',
      'spa': 'Spa',
      'amenities': 'Comodidades'
    };
    
    return language === 'en' 
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : translations[category] || category.charAt(0).toUpperCase() + category.slice(1);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
              onClick={() => setSelectedImage(image.url)}
            >
              <img 
                src={image.url} 
                alt={language === 'en' ? image.title : image.title_pt} 
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="text-xl font-bold">{language === 'en' ? image.title : image.title_pt}</h3>
                  <p className="text-sm mt-2 capitalize">{getCategoryTranslation(image.category)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
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
