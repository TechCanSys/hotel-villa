
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import RoomCard from './RoomCard';
import { Loader2 } from 'lucide-react';
import { Json } from '@/integrations/supabase/types';

interface RoomData {
  id: string;
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
  price: number;
  image: string;
  amenities: string[];
  amenities_pt: string[];
  media: string[];
}

const Rooms = () => {
  const { language } = useLanguage();
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchRooms();
  }, []);
  
  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('price', { ascending: false });
        
      if (error) throw error;
      
      // Transform the data to match the component's needs
      const formattedRooms: RoomData[] = data.map(room => ({
        id: room.id,
        title: room.title,
        title_pt: room.title_pt,
        description: room.description,
        description_pt: room.description_pt,
        price: room.price,
        image: room.image,
        amenities: Array.isArray(room.amenities) ? room.amenities.map(item => String(item)) : [],
        amenities_pt: Array.isArray(room.amenities_pt) ? room.amenities_pt.map(item => String(item)) : [],
        media: Array.isArray(room.media) ? room.media.map(item => String(item)) : [room.image],
      }));
      
      setRooms(formattedRooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section id="rooms" className="py-24 md:py-32">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-hotel" />
        </div>
      </section>
    );
  }

  return (
    <section id="rooms" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
            {language === 'en' ? "Accommodation" : "Acomodação"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hotel-text">
            {language === 'en' ? "Our Luxurious Rooms" : "Nossos Quartos Luxuosos"}
          </h2>
          <p className="text-gray-600">
            {language === 'en' 
              ? "Choose from our luxury rooms, each designed to offer maximum comfort and elegance during your stay."
              : "Escolha entre nossos quartos de luxo, cada um projetado para oferecer o máximo conforto e elegância durante sua estadia."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room, idx) => (
            <div key={room.id} className="h-full flex">
              <RoomCard
                name={language === 'en' ? room.title : room.title_pt}
                description={language === 'en' ? room.description : room.description_pt}
                price={`${room.price.toLocaleString('pt-MZ')}MT`}
                images={room.media.map((url, index) => ({
                  url,
                  alt: `${language === 'en' ? room.title : room.title_pt} - Image ${index + 1}`
                }))}
                amenities={language === 'en' ? room.amenities : room.amenities_pt}
                featured={idx === 0} // First room is featured
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
