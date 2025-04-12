
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero */}
      <div className="h-80 bg-gradient-to-r from-hotel to-hotel-dark flex items-center justify-center text-white mt-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("Contact Us", "Contate-nos")}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t(
              "Get in touch with our team for bookings and inquiries",
              "Entre em contato com nossa equipe para reservas e informações"
            )}
          </p>
        </div>
      </div>
      
      {/* Contact Form */}
      <div className="py-16">
        <Contact />
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
