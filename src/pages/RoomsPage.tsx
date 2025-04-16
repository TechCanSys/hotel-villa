
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFetchData } from '@/hooks/useSupabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Wifi, Coffee, Tv, Bath, BedDouble, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type Room = {
  id: string;
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
  image: string;
  price: number;
  capacity: string;
  capacity_pt: string;
  amenities: string[];
  amenities_pt: string[];
};

const getAmenityIcon = (amenity: string) => {
  if (amenity.includes('WiFi') || amenity.includes('Wi-Fi')) return <Wifi size={18} />;
  if (amenity.includes('Coffee') || amenity.includes('Café')) return <Coffee size={18} />;
  if (amenity.includes('TV') || amenity.includes('Televisão')) return <Tv size={18} />;
  if (amenity.includes('Bathroom') || amenity.includes('Banheiro')) return <Bath size={18} />;
  return null;
};

const RoomsPage = () => {
  const { language, t } = useLanguage();
  const { data: rooms, isLoading } = useFetchData<Room>('rooms');
  const [filter, setFilter] = useState('all');

  // Use only Supabase data
  const displayRooms = rooms || [];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
              {t("Accommodation", "Acomodação")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-hotel-text">
              {t("Our Luxurious Rooms & Suites", "Nossos Quartos & Suítes Luxuosos")}
            </h1>
            <p className="text-gray-600">
              {t(
                "Experience the perfect blend of comfort and luxury in our well-appointed rooms and suites, designed to make your stay memorable.",
                "Experimente a combinação perfeita de conforto e luxo em nossos quartos e suítes bem equipados, projetados para tornar a sua estadia memorável."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayRooms.map((room) => (
              <div 
                key={room.id} 
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={language === 'en' ? room.title : room.title_pt} 
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-hotel-text">
                    {language === 'en' ? room.title : room.title_pt}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'en' ? room.description : room.description_pt}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <BedDouble size={18} />
                      <span>{language === 'en' ? room.capacity : room.capacity_pt}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {(language === 'en' ? room.amenities : room.amenities_pt).map((amenity, i) => (
                      <div key={i} className="flex items-center gap-1 text-gray-600 text-sm">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-hotel text-xl font-semibold">
                      {room.price.toLocaleString('pt-MZ')} MZN<span className="text-sm text-gray-500">{t("/night", "/noite")}</span>
                    </span>
                  </div>
                  
                  <Link 
                    to={`/rooms/${room.id}`} 
                    className="block w-full py-3 text-center bg-hotel hover:bg-hotel-dark text-white font-medium rounded transition-colors duration-300"
                  >
                    {t("View Details", "Ver Detalhes")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomsPage;
