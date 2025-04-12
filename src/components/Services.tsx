
import { useState, useEffect } from 'react';
import { Utensils, Wine, ShowerHead, Users, Pool, DollarSign } from 'lucide-react';
import { useFetchData } from '@/hooks/useSupabase';
import { useLanguage } from '@/contexts/LanguageContext';

type Service = {
  id: string;
  icon: string;
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
  price?: number;
};

type ExchangeRate = {
  rate: number;
  timestamp: number;
};

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'Utensils': return <Utensils size={28} />;
    case 'Wine': return <Wine size={28} />;
    case 'ShowerHead': return <ShowerHead size={28} />;
    case 'Users': return <Users size={28} />;
    case 'Pool': return <Pool size={28} />;
    case 'DollarSign': return <DollarSign size={28} />;
    default: return <Utensils size={28} />;
  }
};

const Services = () => {
  const { language, t } = useLanguage();
  const { data: services, isLoading } = useFetchData<Service>('services');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoadingRate, setIsLoadingRate] = useState<boolean>(false);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setIsLoadingRate(true);
        // Using a free API for MZN to USD conversion
        const response = await fetch('https://open.er-api.com/v6/latest/MZN');
        const data = await response.json();
        setExchangeRate(data.rates.USD);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        // Fallback rate if API fails
        setExchangeRate(0.016);
      } finally {
        setIsLoadingRate(false);
      }
    };

    fetchExchangeRate();
  }, []);

  // Format currency in Metical
  const formatMZN = (amount: number) => {
    return new Intl.NumberFormat('pt-MZ', { 
      style: 'currency', 
      currency: 'MZN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format currency in USD
  const formatUSD = (amount: number) => {
    if (!exchangeRate) return '';
    
    const usdAmount = amount * exchangeRate;
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(usdAmount);
  };

  // Fallback data in case Supabase data isn't loaded yet
  const fallbackServices = [
    {
      id: '1',
      icon: 'Utensils',
      title: "Restaurant & Bar",
      title_pt: "Restaurante & Bar",
      description: "Experience exquisite dining and refreshing drinks at our elegant restaurant and bar.",
      description_pt: "Experimente uma refeição requintada e bebidas refrescantes no nosso elegante restaurante e bar.",
      price: 500
    },
    {
      id: '2',
      icon: 'ShowerHead',
      title: "Laundry Service",
      title_pt: "Serviço de Lavandaria",
      description: "Keep your clothes fresh and clean with our premium laundry service available daily.",
      description_pt: "Mantenha suas roupas frescas e limpas com o nosso serviço de lavandaria premium disponível diariamente.",
      price: 300
    },
    {
      id: '3',
      icon: 'Users',
      title: "Meeting Room",
      title_pt: "Sala de Reuniões",
      description: "Host your business meetings or events in our fully equipped meeting room with modern amenities.",
      description_pt: "Realize suas reuniões de negócios ou eventos na nossa sala de reuniões totalmente equipada com comodidades modernas.",
      price: 2000
    },
    {
      id: '4',
      icon: 'Pool',
      title: "Swimming Pool",
      title_pt: "Piscina",
      description: "Relax and unwind in our luxurious swimming pool with comfortable loungers and pool service.",
      description_pt: "Relaxe na nossa piscina luxuosa com espreguiçadeiras confortáveis e serviço de piscina.",
      price: 150
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
            {t("Our Premium Services", "Nossos Serviços Premium")}
          </h2>
          <p className="text-gray-600">
            {t(
              "We offer a wide range of services designed to enhance your stay and provide you with unmatched comfort and convenience.",
              "Oferecemos uma ampla gama de serviços projetados para melhorar sua estadia e proporcionar conforto e conveniência incomparáveis."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {displayServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-hotel">{getServiceIcon(service.icon)}</div>
                {service.price && (
                  <div className="text-right">
                    <div className="text-xl font-bold text-hotel">{formatMZN(service.price)}</div>
                    {exchangeRate && (
                      <div className="text-sm text-gray-500">
                        {isLoadingRate ? 'Loading...' : formatUSD(service.price)}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
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
