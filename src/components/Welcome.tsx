
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <section className="py-24 md:py-32 bg-hotel-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
              Welcome to Hotel Villa Capricho
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hotel-text">
              Experience Luxury Like Never Before
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Nestled in the heart of Mozambique, Hotel Villa Capricho offers an unforgettable blend of luxury, comfort, and authentic hospitality. Our elegant establishment is designed to provide guests with a serene escape while ensuring all modern amenities are at your fingertips.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              From our meticulously designed rooms to our world-class facilities, every aspect of Hotel Villa Capricho is crafted to exceed your expectations. Whether you're visiting for business or leisure, our dedicated staff ensures your stay is nothing short of extraordinary.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/about" 
                className="flex items-center gap-2 text-hotel hover:text-hotel-dark transition-colors font-medium"
              >
                Discover Our Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Hotel Lobby" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
              <div className="absolute bottom-6 right-6 bg-hotel p-6 text-white rounded-lg shadow-lg max-w-xs">
                <p className="font-medium mb-2 text-lg"></p>
                <p className="text-sm opacity-90">Of exceptional service and hospitality excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
