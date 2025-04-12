
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-hotel-accent text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 font-serif">HOTEL VILLA CAPRICHO</h3>
            <p className="mb-6 text-gray-300">
              {t(
                "Experience luxury and comfort like never before at our prestigious hotel in Moamba, Mozambique. Inaugurated in September 2024.",
                "Experimente luxo e conforto como nunca antes em nosso prestigioso hotel em Moamba, Moçambique. Inaugurado em Setembro de 2024."
              )}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-hotel transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-hotel transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-hotel transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-hotel transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">{t("Quick Links", "Links Rápidos")}</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Rooms', 'Services', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-hotel flex items-center transition-colors"
                  >
                    <ArrowRight size={16} className="mr-2" /> {t(item, 
                      item === 'Home' ? 'Início' : 
                      item === 'About Us' ? 'Sobre Nós' : 
                      item === 'Rooms' ? 'Quartos' : 
                      item === 'Services' ? 'Serviços' : 
                      item === 'Gallery' ? 'Galeria' : 'Contato'
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">{t("Contact Info", "Informações de Contato")}</h4>
            <address className="not-italic text-gray-300 space-y-3">
              <p>Moamba, Maputo, Mozambique</p>
              <p>+258 84 031 7375 | +258 85 760 4763</p>
              <p>info@villacapricho.pt</p>
              <p>reservas@hotelvillacapricho.pt</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">{t("Newsletter", "Newsletter")}</h4>
            <p className="text-gray-300 mb-4">
              {t(
                "Subscribe to our newsletter to receive the latest updates and promotions.",
                "Inscreva-se em nossa newsletter para receber as últimas atualizações e promoções."
              )}
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder={t("Your Email Address", "Seu Endereço de Email")}
                className="p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel"
                aria-label={t("Email for newsletter", "Email para newsletter")}
              />
              <button
                type="submit"
                className="p-3 bg-hotel hover:bg-hotel-dark text-white font-medium rounded-md transition-colors"
              >
                {t("Subscribe", "Inscrever-se")}
              </button>
            </form>
          </div>
        </div>
        
        <div className="py-6 border-t border-gray-700 text-center md:flex md:justify-between md:text-left text-gray-300">
          <p>&copy; {currentYear} Hotel Villa Capricho. {t("All rights reserved.", "Todos os direitos reservados.")}</p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-hotel transition-colors">{t("Privacy Policy", "Política de Privacidade")}</Link>
            <span className="mx-2">|</span>
            <Link to="/terms-conditions" className="hover:text-hotel transition-colors">{t("Terms & Conditions", "Termos e Condições")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
