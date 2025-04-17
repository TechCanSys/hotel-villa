
import { useLanguage } from '@/contexts/LanguageContext';
import RoomCard from './RoomCard';

const Rooms = () => {
  const { language } = useLanguage();
  
  const rooms = [
    {
      name: language === 'en' ? "Presidential Room" : "Quarto Presidencial",
      description: language === 'en' 
        ? "Experience the height of luxury in our Presidential Room. With a spacious King Size bed and a private living room with comfortable sofas, perfect for small meetings or moments of relaxation. Elegantly decorated, this room offers stunning views and premium amenities for a truly exceptional stay."
        : "Experimente o auge do luxo em nosso Quarto Presidencial. Com uma espaçosa cama King Size e uma sala de estar privativa com sofás confortáveis, perfeita para pequenas reuniões ou momentos de relaxamento. Decorado com elegância, este quarto oferece vistas deslumbrantes e comodidades premium para uma estadia verdadeiramente excepcional.",
      price: "10.000,00MT",
      images: [
        {
          url: "https://vazqzipehewahhcqtdfw.supabase.co/storage/v1/object/public/media/1743768194266-Pre.jpg",
          alt: language === 'en' ? "Presidential Room - Living Room" : "Quarto Presidencial - Sala de Estar"
        },
        {
          url: "https://vazqzipehewahhcqtdfw.supabase.co/storage/v1/object/public/media/1743770387004-Pre1.jpg",
          alt: language === 'en' ? "Presidential Room - Room View" : "Quarto Presidencial - Vista do Quarto"
        },
        {
          url: "https://vazqzipehewahhcqtdfw.supabase.co/storage/v1/object/public/media/1743770409827-Pre2.jpg",
          alt: language === 'en' ? "Presidential Room - Entertainment Area" : "Quarto Presidencial - Área de Entretenimento"
        },
        {
          url: "https://vazqzipehewahhcqtdfw.supabase.co/storage/v1/object/public/media/1743770463084-Pre3.jpg",
          alt: language === 'en' ? "Presidential Room - Master Bedroom" : "Quarto Presidencial - Quarto Principal"
        }
      ],
      amenities: language === 'en' 
        ? ["King Size", "Meeting Room", "Wi-Fi", "Breakfast", "Minibar", "Flat Screen TV", "Air Conditioning", "Safe"]
        : ["King Size", "Sala de Reunião", "Wi-Fi", "Pequeno Almoço", "Minibar", "TV de Tela Plana", "Ar Condicionado", "Cofre"],
      featured: true
    },
    {
      name: language === 'en' ? "Executive Room" : "Quarto Executivo",
      description: language === 'en'
        ? "Our Executive Room offers the perfect balance between comfort and functionality. Designed for discerning travelers, this elegant room features sophisticated decor, a spacious work area, and all the essential amenities to ensure a productive and pleasant stay."
        : "Nosso Quarto Executivo oferece o equilíbrio perfeito entre conforto e funcionalidade. Projetado para viajantes exigentes, este quarto elegante apresenta uma decoração sofisticada, área de trabalho espaçosa e todas as comodidades essenciais para garantir uma estadia produtiva e agradável.",
      price: "5.000,00MT",
      images: [
        {
          url: "https://vazqzipehewahhcqtdfw.supabase.co/storage/v1/object/public/media/1743770673769-Exec2.jpg",
          alt: language === 'en' ? "Executive Room - Overview" : "Quarto Executivo - Visão Geral"
        },
        {
          url: "https://vazqzipehewahhcqtdfw.supabase.co/storage/v1/object/public/media/1743780610139-Exec.jpg",
          alt: language === 'en' ? "Executive Room - Work Area" : "Quarto Executivo - Área de Trabalho"
        },
        {
          url: "https://vazqzipehewahhcqtdfw.supabase.co/storage/v1/object/public/media/1743770645858-Exec1.jpg",
          alt: language === 'en' ? "Executive Room - Bathroom" : "Quarto Executivo - Casa de Banho"
        }
      ],
      amenities: language === 'en'
        ? ["Queen Size", "Work Area", "Wi-Fi", "Breakfast", "Flat Screen TV", "Air Conditioning", "Safe"]
        : ["Cama Queen Size", "Área de Trabalho", "Wi-Fi", "Pequeno Almoço", "TV de Tela Plana", "Ar Condicionado", "Cofre"],
      promotion: language === 'en' ? "15% discount for 3+ night stays" : "15% de desconto para estadias de 3+ noites"
    }
  ];

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
          {rooms.map((room, index) => (
            <div key={index} className="h-full flex">
              <RoomCard
                name={room.name}
                description={room.description}
                price={room.price}
                images={room.images}
                amenities={room.amenities}
                promotion={room.promotion}
                featured={room.featured}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
