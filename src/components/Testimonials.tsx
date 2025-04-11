
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    position: "Business Traveler",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    text: "My stay at New Hotel was exceptional. The staff went above and beyond to ensure my comfort. The rooms are elegantly furnished and the amenities are top-notch. I highly recommend this hotel for both business and leisure travelers."
  },
  {
    id: 2,
    name: "John Doe",
    position: "Tourist",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "From the moment I arrived, I was treated like royalty. The attention to detail and personalized service made my vacation truly memorable. The hotel's location is perfect for exploring the city, and the facilities exceeded my expectations."
  },
  {
    id: 3,
    name: "Aisha Khan",
    position: "Honeymoon",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    rating: 5,
    text: "We chose New Hotel for our honeymoon and couldn't have made a better choice. The romantic ambiance, luxurious suite, and attentive staff created the perfect setting for our special occasion. The dining experience was exquisite."
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (autoPlay) {
      interval = window.setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay]);
  
  const handlePrev = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNext = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 md:py-32 parallax" style={{
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
    }}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            What Our Guests Say
          </h2>
          <p className="text-gray-300">
            Don't just take our word for it - hear what our valued guests have to say about their experience at New Hotel.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 bg-white rounded-lg shadow-xl p-8 md:p-10"
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-hotel-text">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.position}</p>
                      <div className="flex mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="#C19851" color="#C19851" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-white text-hotel p-2 rounded-full shadow-lg hover:bg-hotel hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-white text-hotel p-2 rounded-full shadow-lg hover:bg-hotel hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrent(i);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === current ? 'bg-hotel' : 'bg-white/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
