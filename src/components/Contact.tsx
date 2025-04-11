
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section className="py-24 md:py-32 bg-hotel-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hotel-text">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-8">
              Have questions or want to make a reservation? Our friendly team is here to assist you. Reach out to us through any of the contact methods below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-hotel/10 text-hotel rounded-full">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-hotel-text mb-1">Address</h3>
                  <p className="text-gray-600">Av. 25 de Setembro, Maputo, Mozambique</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-hotel/10 text-hotel rounded-full">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-hotel-text mb-1">Phone</h3>
                  <p className="text-gray-600">+258 84 123 4567</p>
                  <p className="text-gray-600">+258 21 123 456</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-hotel/10 text-hotel rounded-full">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-hotel-text mb-1">Email</h3>
                  <p className="text-gray-600">info@newhotel.co.mz</p>
                  <p className="text-gray-600">reservations@newhotel.co.mz</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-hotel/10 text-hotel rounded-full">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-hotel-text mb-1">Working Hours</h3>
                  <p className="text-gray-600">Reception: 24/7</p>
                  <p className="text-gray-600">Restaurant: 6:30 AM - 10:30 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-hotel-text">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel"
                    placeholder="Booking inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full p-3 bg-hotel hover:bg-hotel-dark text-white font-medium rounded-md transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
