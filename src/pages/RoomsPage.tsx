
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

  // Fallback data if Supabase hasn't loaded yet
  const fallbackRooms = [
    {
      id: '1',
      title: 'Deluxe Room',
      title_pt: 'Quarto Deluxe',
      description: 'Spacious room with city view and modern amenities for a comfortable stay.',
      description_pt: 'Quarto espaçoso com vista para a cidade e comodidades modernas para uma estadia confortável.',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      price: 150,
      capacity: '2 Adults',
      capacity_pt: '2 Adultos',
      amenities: ['Free WiFi', 'Coffee Maker', 'Smart TV', 'Luxury Bathroom'],
      amenities_pt: ['Wi-Fi Grátis', 'Cafeteira', 'Smart TV', 'Banheiro de Luxo']
    },
    {
      id: '2',
      title: 'Executive Suite',
      title_pt: 'Suíte Executiva',
      description: 'Elegant suite with separate living area, panoramic view and premium amenities.',
      description_pt: 'Suíte elegante com área de estar separada, vista panorâmica e comodidades premium.',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: 250,
      capacity: '2 Adults, 1 Child',
      capacity_pt: '2 Adultos, 1 Criança',
      amenities: ['Free WiFi', 'Coffee Maker', 'Smart TV', 'Luxury Bathroom'],
      amenities_pt: ['Wi-Fi Grátis', 'Cafeteira', 'Smart TV', 'Banheiro de Luxo']
    },
    {
      id: '3',
      title: 'Luxury Suite',
      title_pt: 'Suíte de Luxo',
      description: 'Spacious luxury suite with a stunning sea view, private balcony and premium amenities.',
      description_pt: 'Suíte de luxo espaçosa com uma vista deslumbrante para o mar, varanda privativa e comodidades premium.',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: 350,
      capacity: '2 Adults, 2 Children',
      capacity_pt: '2 Adultos, 2 Crianças',
      amenities: ['Free WiFi', 'Coffee Maker', 'Smart TV', 'Luxury Bathroom'],
      amenities_pt: ['Wi-Fi Grátis', 'Cafeteira', 'Smart TV', 'Banheiro de Luxo']
    },
    {
      id: '4',
      title: 'Standard Room',
      title_pt: 'Quarto Padrão',
      description: 'Comfortable room with essential amenities for a pleasant stay.',
      description_pt: 'Quarto confortável com comodidades essenciais para uma estadia agradável.',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      price: 120,
      capacity: '2 Adults',
      capacity_pt: '2 Adultos',
      amenities: ['Free WiFi', 'TV', 'Air Conditioning'],
      amenities_pt: ['Wi-Fi Grátis', 'TV', 'Ar Condicionado']
    }
  ];

  // Use Supabase data if available, otherwise use fallback
  const displayRooms = rooms && rooms.length > 0 ? rooms : fallbackRooms;

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
                      ${room.price}<span className="text-sm text-gray-500">{t("/night", "/noite")}</span>
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
