import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoomCard from '@/components/RoomCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

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
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-hotel-text">
            {t("Our Rooms", "Nossos Quartos")}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard 
                    key={room.id}
                    room={room}
                    language={language} images={[]}              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomsPage;