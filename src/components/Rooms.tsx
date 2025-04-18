import { useLanguage } from '@/contexts/LanguageContext';
import { useFetchData } from '@/hooks/useSupabase';
import { Link } from 'react-router-dom';
import { BedDouble, Wifi, Tv, AirVent, Coffee, Waves } from 'lucide-react';

type Room = {
  id: string;
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
  price: number;
  capacity: number;
  amenities: string[];
  media: string[];
};

const Rooms = () => {
  const { t } = useLanguage();
  const { data: rooms, isLoading } = useFetchData<Room>('rooms');

  const fallbackRooms = [
    {
      id: '1',
      title: 'Deluxe Room',
      title_pt: 'Quarto Deluxe',
      description: 'Spacious room with king-size bed and ocean view',
      description_pt: 'Quarto espaçoso com cama king-size e vista para o oceano',
      price: 2500,
      capacity: 2,
      amenities: ['wifi', 'tv', 'ac', 'coffee'],
      media: []
    },
    {
      id: '2',
      title: 'Executive Suite',
      title_pt: 'Suíte Executiva',
      description: 'Luxurious suite with separate living area and balcony',
      description_pt: 'Suíte luxuosa com área de estar separada e varanda',
      price: 3500,
      capacity: 2,
      amenities: ['wifi', 'tv', 'ac', 'coffee', 'pool'],
      media: []
    }
  ];

  const displayRooms = rooms && rooms.length > 0 ? rooms : fallbackRooms;

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi size={18} />;
      case 'tv': return <Tv size={18} />;
      case 'ac': return <AirVent size={18} />;
      case 'coffee': return <Coffee size={18} />;
      case 'pool': return <Waves size={18} />;
      default: return null;
    }
  };

  return (
    <section className="py-24 bg-hotel-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
            {t("Our Accommodations", "Nossos Acomodações")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hotel-text">
            {t("Rooms & Suites", "Quartos & Suítes")}
          </h2>
          <p className="text-gray-600">
            {t(
              "Experience the perfect blend of comfort and luxury in our thoughtfully designed rooms.",
              "Experimente a combinação perfeita de conforto e luxo em nossos quartos cuidadosamente projetados."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <BedDouble size={48} className="text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-hotel-text">
                  {t(room.title, room.title_pt)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t(room.description, room.description_pt)}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-1 text-hotel">
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-hotel font-bold">
                    {new Intl.NumberFormat('pt-MZ', { 
                      style: 'currency', 
                      currency: 'MZN',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(room.price)}
                  </span>
                  <Link
                    to={`/rooms/${room.id}`}
                    className="text-hotel hover:text-hotel-dark font-medium"
                  >
                    {t("View Details", "Ver Detalhes")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;