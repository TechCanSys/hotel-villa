
import { Utensils, Wine, Car, Wifi, MapPin, Coffee } from 'lucide-react';

const services = [
  {
    icon: <Utensils size={28} />,
    title: "Fine Dining",
    description: "Exquisite culinary experiences featuring local and international cuisine prepared by our world-class chefs."
  },
  {
    icon: <Wifi size={28} />,
    title: "Free Wi-Fi",
    description: "Stay connected with complimentary high-speed internet access throughout the entire hotel."
  },
  {
    icon: <Car size={28} />,
    title: "Airport Transfer",
    description: "Enjoy convenient and comfortable transportation to and from the airport with our dedicated shuttle service."
  },
  {
    icon: <Coffee size={28} />,
    title: "Breakfast",
    description: "Start your day with our delicious gourmet breakfast featuring a variety of fresh and healthy options."
  },
  {
    icon: <Wine size={28} />,
    title: "Bar & Lounge",
    description: "Relax and unwind in our elegant bar and lounge offering an extensive selection of fine wines and spirits."
  },
  {
    icon: <MapPin size={28} />,
    title: "City Tours",
    description: "Explore the beauty and culture of the surrounding area with our professionally guided city tours."
  }
];

const Services = () => {
  return (
    <section className="py-24 md:py-32 bg-hotel-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hotel-text">
            Exceptional Services
          </h2>
          <p className="text-gray-600">
            We offer a wide range of services designed to enhance your stay and provide you with unmatched comfort and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-hotel mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-hotel-text">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
