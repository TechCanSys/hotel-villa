
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="z-50">
          <div className="flex items-center">
            <span className={`text-2xl font-bold font-serif ${scrolled ? "text-hotel-text" : "text-white"}`}>
              NEW HOTEL
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {["Home", "Rooms", "Services", "Facilities", "Gallery", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`font-medium text-sm hover:text-hotel transition-colors ${
                scrolled ? "text-hotel-text" : "text-white"
              }`}
            >
              {item.toUpperCase()}
            </Link>
          ))}
          <Link
            to="/book-now"
            className={`font-medium text-sm px-4 py-2 rounded border-2 transition-colors ${
              scrolled
                ? "text-hotel border-hotel hover:bg-hotel hover:text-white"
                : "text-white border-white hover:bg-white hover:text-hotel-text"
            }`}
          >
            BOOK NOW
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`lg:hidden z-50 ${scrolled || isOpen ? "text-hotel-text" : "text-white"}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col p-10 transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-6 mt-16">
          {["Home", "Rooms", "Services", "Facilities", "Gallery", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-hotel-text text-lg font-medium hover:text-hotel transition-colors"
              onClick={toggleMenu}
            >
              {item}
            </Link>
          ))}
          <Link
            to="/book-now"
            className="bg-hotel text-white font-medium px-6 py-3 rounded text-center hover:bg-hotel-dark transition-colors mt-4"
            onClick={toggleMenu}
          >
            BOOK NOW
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
