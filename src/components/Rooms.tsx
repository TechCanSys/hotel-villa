
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Coffee, Tv, Bath } from 'lucide-react';
import { useFetchData } from '@/hooks/useSupabase';
import { useLanguage } from '@/contexts/LanguageContext';

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

const Rooms = () => {
  const { language, t } = useLanguage();
  const { data: rooms, isLoading } = useFetchData<Room>('rooms');
  const [activeRoom, setActiveRoom] = useState(0);

  // Fall back to static data if no rooms are loaded yet
  const displayRooms = rooms && rooms.length > 0 ? rooms : [
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
    }
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
            {t("Accommodation", "Acomodação")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hotel-text">
            {t("Our Luxurious Rooms & Suites", "Nossos Quartos & Suítes Luxuosos")}
          </h2>
          <p className="text-gray-600">
            {t(
              "Experience the perfect blend of comfort and luxury in our well-appointed rooms and suites, designed to make your stay memorable.",
              "Experimente a combinação perfeita de conforto e luxo em nossos quartos e suítes bem equipados, projetados para tornar a sua estadia memorável."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayRooms.map((room) => (
            <div 
              key={room.id} 
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 room-card"
            >
              <div className="overflow-hidden">
                <img 
                  src={room.image} 
                  alt={language === 'en' ? room.title : room.title_pt} 
                  className="w-full h-64 object-cover room-img"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-hotel-text">
                  {language === 'en' ? room.title : room.title_pt}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-hotel text-xl font-semibold">
                    {room.price.toLocaleString('pt-MZ')} MZN<span className="text-sm text-gray-500">{t("/night", "/noite")}</span>
                  </span>
                  <span className="text-gray-500 text-sm">
                    {language === 'en' ? room.capacity : room.capacity_pt}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mb-6">
                  {(language === 'en' ? room.amenities : room.amenities_pt).map((amenity, i) => (
                    <div key={i} className="flex items-center gap-1 text-gray-600 text-sm">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  to={`/rooms/${room.id}`} 
                  className="block w-full py-3 text-center bg-hotel hover:bg-hotel-dark text-white font-medium rounded transition-colors duration-300"
                >
                {t("Book Now", "Reserve Agora")}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/rooms" 
            className="inline-flex items-center gap-2 text-hotel hover:text-hotel-dark transition-colors font-medium"
          >
            {t("View All Rooms", "Ver Todos os Quartos")} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
