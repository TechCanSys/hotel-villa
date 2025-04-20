
import { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import RoomImageCarousel from './room-card/RoomImageCarousel';
import RoomAmenityList from './room-card/RoomAmenityList';
import RoomDetailsDialog from './room-card/RoomDetailsDialog';
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

const RoomCard = ({ room, images, promotion, featured = false, language }: RoomCardProps) => {
  const { toast } = useToast();
  const name = language === 'en' ? room.title : room.title_pt;
  const description = language === 'en' ? room.description : room.description_pt;
  const price = room.price.toLocaleString('pt-MZ') + 'MZN';
  const amenities = language === 'en' ? room.amenities : room.amenities_pt;
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  return (
    <>
      <div className={`bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full ${featured ? 'ring-2 ring-hotel' : ''}`}>
        {promotion && (
          <div className="bg-green-50 text-green-700 text-center py-2 font-semibold">
            {promotion}
          </div>
        )}
        {/* Image Carousel */}
        <RoomImageCarousel images={images} />
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-hotel-text mb-2 h-8 overflow-hidden">{name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-1 h-6 overflow-hidden">{description}</p>
          <RoomAmenityList amenities={amenities} />
          <div className="flex justify-between items-center mt-auto">
            <div>
              <span className="text-xl font-bold text-hotel">{price}</span>
              <span className="text-gray-500 text-sm"> / noite</span>
            </div>
            <RoomDetailsDialog
              name={name}
              description={description}
              images={images}
              amenities={amenities}
              price={price}
              bookingData={bookingData}
              calculateTotal={calculateTotal}
              onBooking={handleBookNow}
              closeButtonRef={closeButtonRef}
            />
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
