
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BedDouble, Users } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen">
      {/* Background Image Slider */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white z-10 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
          Experience Luxury & Comfort
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Discover the perfect blend of elegance, comfort, and exceptional service at New Hotel
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Link
            to="/book-now"
            className="bg-hotel hover:bg-hotel-dark text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
          >
            Book Now
          </Link>
          <Link
            to="/rooms"
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
          >
            View Rooms
          </Link>
        </div>
      </div>
      
      {/* Booking Form */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg transform translate-y-1/2 z-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
          <div className="flex flex-col">
            <label className="text-hotel-text font-medium mb-2 flex items-center gap-2">
              <Calendar size={18} />
              Check In
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-hotel"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-hotel-text font-medium mb-2 flex items-center gap-2">
              <Calendar size={18} />
              Check Out
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-hotel"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-hotel-text font-medium mb-2 flex items-center gap-2">
              <Users size={18} />
              Guests
            </label>
            <select className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-hotel">
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>2 Adults, 1 Child</option>
              <option>2 Adults, 2 Children</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-hotel-text font-medium mb-2 flex items-center gap-2">
              <BedDouble size={18} />
              Room Type
            </label>
            <select className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-hotel">
              <option>Any</option>
              <option>Standard</option>
              <option>Deluxe</option>
              <option>Suite</option>
            </select>
          </div>
        </div>
        <div className="bg-hotel text-white text-center py-3 rounded-b-3xl hover:bg-hotel-dark transition-colors cursor-pointer">
          <span className="font-medium">Check Availability</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
