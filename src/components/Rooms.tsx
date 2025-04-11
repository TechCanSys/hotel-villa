
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Coffee, Tv, Bath } from 'lucide-react';

const roomsData = [
  {
    id: 1,
    title: 'Deluxe Room',
    description: 'Spacious room with city view and modern amenities for a comfortable stay.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    price: 150,
    capacity: '2 Adults',
    amenities: ['Free WiFi', 'Coffee Maker', 'Smart TV', 'Luxury Bathroom']
  },
  {
    id: 2,
    title: 'Executive Suite',
    description: 'Elegant suite with separate living area, panoramic view and premium amenities.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 250,
    capacity: '2 Adults, 1 Child',
    amenities: ['Free WiFi', 'Coffee Maker', 'Smart TV', 'Luxury Bathroom']
  },
  {
    id: 3,
    title: 'Luxury Suite',
    description: 'Spacious luxury suite with a stunning sea view, private balcony and premium amenities.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 350,
    capacity: '2 Adults, 2 Children',
    amenities: ['Free WiFi', 'Coffee Maker', 'Smart TV', 'Luxury Bathroom']
  }
];

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case 'Free WiFi':
      return <Wifi size={18} />;
    case 'Coffee Maker':
      return <Coffee size={18} />;
    case 'Smart TV':
      return <Tv size={18} />;
    case 'Luxury Bathroom':
      return <Bath size={18} />;
    default:
      return null;
  }
};

const Rooms = () => {
  const [activeRoom, setActiveRoom] = useState(0);

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
            Accommodation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hotel-text">
            Our Luxurious Rooms & Suites
          </h2>
          <p className="text-gray-600">
            Experience the perfect blend of comfort and luxury in our well-appointed rooms and suites, designed to make your stay memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roomsData.map((room, index) => (
            <div 
              key={room.id} 
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 room-card"
            >
              <div className="overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.title} 
                  className="w-full h-64 object-cover room-img"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-hotel-text">{room.title}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-hotel text-xl font-semibold">${room.price}<span className="text-sm text-gray-500">/night</span></span>
                  <span className="text-gray-500 text-sm">{room.capacity}</span>
                </div>
                <div className="flex flex-wrap gap-3 mb-6">
                  {room.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-1 text-gray-600 text-sm">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  to={`/rooms/${room.id}`} 
                  className="block w-full py-3 text-center bg-hotel hover:bg-hotel-dark text-white font-medium rounded transition-colors duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/rooms" 
            className="inline-flex items-center gap-2 text-hotel hover:text-hotel-dark transition-colors font-medium"
          >
            View All Rooms <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
