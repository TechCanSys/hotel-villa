
import { useLanguage } from '@/contexts/LanguageContext';
import { useFetchData } from '@/hooks/useSupabase';
import { Link } from 'react-router-dom';
import { BedDouble, Wifi, Tv, AirVent, Coffee, Waves } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import RoomCard from './RoomCard';

type Room = {
  id: string;
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
  price: number;
  capacity: string;
  capacity_pt: string;
  amenities: string[];
  amenities_pt: string[];
  media: string[];
};

const Rooms = () => {
  const { t, language } = useLanguage();
  const { data: rooms, isLoading, error } = useFetchData<Room>('rooms');
  const { toast } = useToast();

  const fallbackRooms = [
    {
      id: '1',
      title: 'Deluxe Room',
      title_pt: 'Quarto Deluxe',
      description: 'Spacious room with king-size bed and ocean view',
      description_pt: 'Quarto espaçoso com cama king-size e vista para o oceano',
      price: 2500,
      capacity: '2 Adults',
      capacity_pt: '2 Adultos',
      amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
      amenities_pt: ['Wi-Fi', 'TV', 'Ar Condicionado', 'Mini Bar'],
      media: []
    },
    {
      id: '2',
      title: 'Executive Suite',
      title_pt: 'Suíte Executiva',
      description: 'Luxurious suite with separate living area and balcony',
      description_pt: 'Suíte luxuosa com área de estar separada e varanda',
      price: 3500,
      capacity: '2 Adults',
      capacity_pt: '2 Adultos',
      amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Jacuzzi'],
      amenities_pt: ['Wi-Fi', 'TV', 'Ar Condicionado', 'Mini Bar', 'Jacuzzi'],
      media: []
    }
  ];

  if (error) {
    toast({
      title: t("Error", "Erro"),
      description: t("Failed to load rooms", "Falha ao carregar quartos"),
      variant: "destructive",
    });
  }

  // Use Supabase data if available, otherwise use fallback
  const displayRooms = rooms && rooms.length > 0 ? rooms : fallbackRooms;

  // Transform room data for RoomCard component
  const formatRoomImages = (room: Room) => {
    if (room.media && Array.isArray(room.media) && room.media.length > 0) {
      return room.media.map((url, idx) => ({
        url,
        alt: `${room.title} image ${idx + 1}`
      }));
    }
    
    // Default image if no media is available
    return [{
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: `${room.title} default image`
    }];
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
          {displayRooms.map((room, roomIndex) => (
            <RoomCard
              key={room.id}
              room={room}
              images={formatRoomImages(room)}
              featured={roomIndex === 0}
              language={language}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/rooms">
            <Button className="bg-hotel hover:bg-hotel/90 text-white">
              {t("View All Rooms", "Ver Todos os Quartos")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
