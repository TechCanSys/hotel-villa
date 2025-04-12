
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero */}
      <div className="h-96 bg-gradient-to-r from-hotel to-hotel-dark flex items-center justify-center text-white mt-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("Our Services", "Nossos Serviços")}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t(
              "Experience luxury and comfort with our premium hotel services",
              "Experimente luxo e conforto com nossos serviços premium de hotel"
            )}
          </p>
        </div>
      </div>
      
      {/* Services */}
      <Services />
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
