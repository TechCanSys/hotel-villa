
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import { useLanguage } from '@/contexts/LanguageContext';

const GalleryPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero */}
      <div className="h-80 bg-gradient-to-r from-hotel to-hotel-dark flex items-center justify-center text-white mt-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("Gallery", "Galeria")}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t(
              "Discover the beauty and luxury of our hotel",
              "Descubra a beleza e o luxo do nosso hotel"
            )}
          </p>
        </div>
      </div>
      
      {/* Gallery */}
      <div className="py-16">
        <Gallery />
      </div>
      
      <Footer />
    </div>
  );
};

export default GalleryPage;
