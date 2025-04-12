
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { title: "Home", title_pt: "Início", path: "/" },
    { title: "Rooms", title_pt: "Quartos", path: "/rooms" },
    { title: "Services", title_pt: "Serviços", path: "/services" },
    { title: "Gallery", title_pt: "Galeria", path: "/gallery" },
    { title: "Contact", title_pt: "Contato", path: "/contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white text-hotel-text shadow-md py-4' : 'bg-transparent text-white py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center">
          Hotel Villa Capricho
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`font-medium hover:text-hotel transition-colors ${
                location.pathname === link.path ? 'text-hotel' : ''
              }`}
            >
              {t(link.title, link.title_pt)}
            </Link>
          ))}
          <Link 
            to="/rooms" 
            className={`py-2 px-4 rounded-md ${
              isScrolled 
                ? 'bg-hotel text-white hover:bg-hotel-dark' 
                : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
            } transition-colors`}
          >
            {t("Book Now", "Reserve Agora")}
          </Link>
          <Link 
            to="/admin" 
            className="text-gray-400 hover:text-hotel transition-colors"
            title={t("Admin Login", "Login de Administrador")}
            aria-label={t("Admin Login", "Login de Administrador")}
          >
            <Lock size={20} />
          </Link>
          <LanguageSwitcher />
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-4">
          <LanguageSwitcher />
          <Link 
            to="/admin" 
            className="text-gray-400 hover:text-hotel transition-colors mr-2"
            title={t("Admin Login", "Login de Administrador")}
            aria-label={t("Admin Login", "Login de Administrador")}
          >
            <Lock size={20} />
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-md ${
              isScrolled ? 'text-hotel-text hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label={isMenuOpen ? t("Close menu", "Fechar menu") : t("Open menu", "Abrir menu")}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-hotel-text py-4 shadow-md">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`py-2 font-medium ${
                  location.pathname === link.path ? 'text-hotel' : 'hover:text-hotel'
                }`}
              >
                {t(link.title, link.title_pt)}
              </Link>
            ))}
            <Link 
              to="/rooms" 
              className="py-2 px-4 bg-hotel text-white rounded-md text-center hover:bg-hotel-dark transition-colors"
            >
              {t("Book Now", "Reserve Agora")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
