
import { useState, useRef, useEffect } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Wifi, Coffee, Tv, Bath, BedDouble, Users, AirVent, Lock } from 'lucide-react';
import BookingDialog from './hero/BookingDialog';
import { useToast } from '@/components/ui/use-toast';

interface RoomCardProps {
  room: {
    id: string;
    title: string;
    title_pt: string;
    description: string;
    description_pt: string;
    price: number;
    amenities: string[];
    amenities_pt: string[];
  };
  images: { url: string; alt: string }[];
  promotion?: string;
  featured?: boolean;
  language: 'en' | 'pt';
}

const getAmenityIcon = (amenity: string) => {
  if (amenity.includes('Wi-Fi')) return <Wifi size={18} />;
  if (amenity.includes('Pequeno Almoço')) return <Coffee size={18} />;
  if (amenity.includes('TV')) return <Tv size={18} />;
  if (amenity.includes('Casa de Banho')) return <Bath size={18} />;
  if (amenity.includes('King Size') || amenity.includes('Queen Size')) return <BedDouble size={18} />;
  if (amenity.includes('Sala de Reunião')) return <Users size={18} />;
  if (amenity.includes('Ar Condicionado')) return <AirVent size={18} />;
  if (amenity.includes('Cofre')) return <Lock size={18} />;
  return null;
};

const RoomCard = ({ room, images, promotion, featured = false, language }: RoomCardProps) => {
  const { toast } = useToast();
  const name = language === 'en' ? room.title : room.title_pt;
  const description = language === 'en' ? room.description : room.description_pt;
  const price = room.price.toLocaleString('pt-MZ') + 'MZN';
  const amenities = language === 'en' ? room.amenities : room.amenities_pt;
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const detailsCloseRef = useRef<HTMLButtonElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guests: '1 Adult',
    roomType: name
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookNow = () => {
    setShowBookingDialog(true);
    closeButtonRef.current?.click();
  };

  const calculateTotal = (checkIn: string, checkOut: string, priceStr: string) => {
    if (!checkIn || !checkOut) return 0;
    
    const price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return price * diffDays;
  };

  const handleManualNavigation = (index: number) => {
    setIsPaused(true);
    setCurrentImage(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 8000);
  };

  const onBookingSubmit = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setBookingSuccess(true);
    toast({
      title: "Booking Successful",
      description: "Your booking has been received. We will contact you shortly.",
    });
  };

  const handleReset = () => {
    setShowBookingDialog(false);
    setBookingData({
      checkInDate: '',
      checkOutDate: '',
      guests: '1 Adult',
      roomType: name
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
    setBookingSuccess(false);
  };

  useEffect(() => {
    if (!isPaused && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }, 8000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, images.length]);

  // Use default image if no images are provided
  const displayImages = images.length > 0 ? images : [{ 
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Default room image'
  }];

  return (
    <>
      <div className={`bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full ${featured ? 'ring-2 ring-hotel' : ''}`}>
        {promotion && (
          <div className="bg-green-50 text-green-700 text-center py-2 font-semibold">
            {promotion}
          </div>
        )}
        
        <div className="relative h-96 overflow-hidden group">
          <img 
            src={displayImages[currentImage].url} 
            alt={displayImages[currentImage].alt} 
            className="w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
          />
          
          {displayImages.length > 1 && (
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => handleManualNavigation(currentImage === 0 ? displayImages.length - 1 : currentImage - 1)}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              >
                ←
              </button>
              <button
                onClick={() => handleManualNavigation(currentImage === displayImages.length - 1 ? 0 : currentImage + 1)}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              >
                →
              </button>
            </div>
          )}
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-hotel-text mb-2 h-8 overflow-hidden">{name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-1 h-6 overflow-hidden">{description}</p>
          
          <div className="flex flex-wrap gap-3 mb-4 h-16 overflow-hidden">
            {amenities && amenities.slice(0, 4).map((amenity, idx) => (
              <div key={idx} className="flex items-center text-gray-700">
                {getAmenityIcon(amenity)}
                <span className="text-sm ml-1">{amenity}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-auto">
            <div>
              <span className="text-xl font-bold text-hotel">{price}</span>
              <span className="text-gray-500 text-sm"> / noite</span>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-hotel text-hotel hover:bg-hotel hover:text-white">
                  Ver Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-[90vw] p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-hotel-text">{name}</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
                  <div>
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img 
                        src={displayImages[currentImage].url} 
                        alt={displayImages[currentImage].alt} 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    {displayImages.length > 1 && (
                      <div className="grid grid-cols-3 gap-1 sm:gap-2">
                        {displayImages.map((image, idx) => (
                          <img 
                            key={idx}
                            src={image.url} 
                            alt={image.alt} 
                            className={`h-20 w-full object-cover rounded cursor-pointer ${currentImage === idx ? 'ring-2 ring-hotel' : ''}`}
                            onClick={() => setCurrentImage(idx)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-4">{description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-bold text-hotel-text mb-2">Comodidades</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {amenities && amenities.map((amenity, idx) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <span className="w-2 h-2 bg-hotel rounded-full mr-2"></span>
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-bold text-hotel-text mb-2">Preço</h4>
                      <p className="text-3xl font-bold text-hotel">{price} <span className="text-sm text-gray-500"> / noite</span></p>
                      {bookingData.checkInDate && bookingData.checkOutDate && (
                        <div className="mt-4">
                          <p className="text-lg font-semibold text-gray-700">
                            Total: {calculateTotal(bookingData.checkInDate, bookingData.checkOutDate, price).toLocaleString('pt-MZ')}MT
                          </p>
                          <p className="text-sm text-gray-500">Taxas: 0MT</p>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-hotel hover:bg-hotel/90 text-white"
                      onClick={handleBookNow}
                    >
                      Reservar Agora
                    </Button>
                    
                    <DialogClose ref={closeButtonRef} className="hidden" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <BookingDialog
        isOpen={showBookingDialog}
        onClose={() => setShowBookingDialog(false)}
        bookingData={bookingData}
        formData={formData}
        onFormChange={{
          setName: (value) => setFormData(prev => ({ ...prev, name: value })),
          setEmail: (value) => setFormData(prev => ({ ...prev, email: value })),
          setPhone: (value) => setFormData(prev => ({ ...prev, phone: value })),
          setSpecialRequests: (value) => setFormData(prev => ({ ...prev, specialRequests: value })),
        }}
        onSubmit={onBookingSubmit}
        bookingSuccess={bookingSuccess}
        onReset={handleReset}
      />
    </>
  );
};

export default RoomCard;
