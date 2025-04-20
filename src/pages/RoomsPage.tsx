
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoomCard from '@/components/RoomCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

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
  media: string[];
};

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language, t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('rooms')
          .select('*');

        if (error) throw error;
        
        if (data) {
          setRooms(data as Room[]);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        toast({
          title: t("Error", "Erro"),
          description: t("Failed to load rooms", "Falha ao carregar quartos"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [toast, t]);

  // Format room image data for the RoomCard component
  const formatRoomImages = (room: Room) => {
    // First try to use the media array if available
    if (room.media && Array.isArray(room.media) && room.media.length > 0) {
      return room.media.map((url, idx) => ({
        url,
        alt: `${room.title} image ${idx + 1}`
      }));
    }
    
    // Fall back to the image field if media is not available
    if (room.image) {
      return [{
        url: room.image,
        alt: `${room.title} main image`
      }];
    }
    
    // Default image if no images are available
    return [{
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: `${room.title} default image`
    }];
  };

  return (
    <>
      <Navbar />
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-hotel-text">
            {t("Our Rooms", "Nossos Quartos")}
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-hotel" />
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">{t("No rooms found", "Nenhum quarto encontrado")}</p>
              <Button 
                asChild 
                className="bg-hotel hover:bg-hotel/90 text-white"
              >
                <Link to="/">{t("Back to Home", "Voltar para Início")}</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room, index) => (
                <RoomCard 
                  key={room.id}
                  room={room}
                  language={language} 
                  images={formatRoomImages(room)}
                  featured={index === 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomsPage;
