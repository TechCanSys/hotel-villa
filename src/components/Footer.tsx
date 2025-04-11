
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hotel-accent text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 font-serif">NEW HOTEL</h3>
            <p className="mb-6 text-gray-300">
              Experience luxury and comfort like never before at our prestigious hotel in the heart of Mozambique.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-hotel transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-hotel transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-hotel transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-hotel transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Rooms', 'Services', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-hotel flex items-center transition-colors"
                  >
                    <ArrowRight size={16} className="mr-2" /> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <address className="not-italic text-gray-300 space-y-3">
              <p>Av. 25 de Setembro, Maputo, Mozambique</p>
              <p>+258 84 123 4567</p>
              <p>info@newhotel.co.mz</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter to receive the latest updates and promotions.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your Email Address"
                className="p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel"
              />
              <button
                type="submit"
                className="p-3 bg-hotel hover:bg-hotel-dark text-white font-medium rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="py-6 border-t border-gray-700 text-center md:flex md:justify-between md:text-left text-gray-300">
          <p>&copy; {currentYear} New Hotel. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-hotel transition-colors">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link to="/terms-conditions" className="hover:text-hotel transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
