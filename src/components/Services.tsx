
import { Utensils, Wine, Car, Wifi, MapPin, Coffee } from 'lucide-react';
import { useFetchData } from '@/hooks/useSupabase';
import { useLanguage } from '@/contexts/LanguageContext';

type Service = {
  id: string;
  icon: string;
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
};

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'Utensils': return <Utensils size={28} />;
    case 'Wine': return <Wine size={28} />;
    case 'Car': return <Car size={28} />;
    case 'Wifi': return <Wifi size={28} />;
    case 'MapPin': return <MapPin size={28} />;
    case 'Coffee': return <Coffee size={28} />;
    default: return <Utensils size={28} />;
  }
};

const Services = () => {
  const { language, t } = useLanguage();
  const { data: services, isLoading } = useFetchData<Service>('services');

  // Fallback data in case Supabase data isn't loaded yet
  const fallbackServices = [
    {
      id: '1',
      icon: 'Utensils',
      title: "Fine Dining",
      title_pt: "Gastronomia Refinada",
      description: "Exquisite culinary experiences featuring local and international cuisine prepared by our world-class chefs.",
      description_pt: "Experiências culinárias requintadas com cozinha local e internacional preparada pelos nossos chefs de classe mundial."
    },
    {
      id: '2',
      icon: 'Wifi',
      title: "Free Wi-Fi",
      title_pt: "Wi-Fi Gratuito",
      description: "Stay connected with complimentary high-speed internet access throughout the entire hotel.",
      description_pt: "Mantenha-se conectado com acesso gratuito à internet de alta velocidade em todo o hotel."
    },
    {
      id: '3',
      icon: 'Car',
      title: "Airport Transfer",
      title_pt: "Transporte para o Aeroporto",
      description: "Enjoy convenient and comfortable transportation to and from the airport with our dedicated shuttle service.",
      description_pt: "Desfrute de transporte conveniente e confortável de e para o aeroporto com nosso serviço de shuttle dedicado."
    },
    {
      id: '4',
      icon: 'Coffee',
      title: "Breakfast",
      title_pt: "Café da Manhã",
      description: "Start your day with our delicious gourmet breakfast featuring a variety of fresh and healthy options.",
      description_pt: "Comece o seu dia com o nosso delicioso café da manhã gourmet que apresenta uma variedade de opções frescas e saudáveis."
    },
    {
      id: '5',
      icon: 'Wine',
      title: "Bar & Lounge",
      title_pt: "Bar & Lounge",
      description: "Relax and unwind in our elegant bar and lounge offering an extensive selection of fine wines and spirits.",
      description_pt: "Relaxe no nosso elegante bar e lounge que oferece uma extensa seleção de vinhos finos e destilados."
    },
    {
      id: '6',
      icon: 'MapPin',
      title: "City Tours",
      title_pt: "Tours pela Cidade",
      description: "Explore the beauty and culture of the surrounding area with our professionally guided city tours.",
      description_pt: "Explore a beleza e a cultura da área ao redor com os nossos tours pela cidade profissionalmente guiados."
    }
  ];

  // Use Supabase data if available, otherwise use fallback
  const displayServices = services && services.length > 0 ? services : fallbackServices;

  return (
    <section className="py-24 md:py-32 bg-hotel-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
            {t("What We Offer", "O Que Oferecemos")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hotel-text">
            {t("Exceptional Services", "Serviços Excepcionais")}
          </h2>
          <p className="text-gray-600">
            {t(
              "We offer a wide range of services designed to enhance your stay and provide you with unmatched comfort and convenience.",
              "Oferecemos uma ampla gama de serviços projetados para melhorar sua estadia e proporcionar conforto e conveniência incomparáveis."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-hotel mb-4">{getServiceIcon(service.icon)}</div>
              <h3 className="text-xl font-bold mb-3 text-hotel-text">
                {language === 'en' ? service.title : service.title_pt}
              </h3>
              <p className="text-gray-600">
                {language === 'en' ? service.description : service.description_pt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
