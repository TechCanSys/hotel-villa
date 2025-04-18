
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import BackgroundSlider from './hero/BackgroundSlider';
import BookingForm from './hero/BookingForm';
import BookingDialog from './hero/BookingDialog';

const heroImages = [
  'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744816599225-y5hqufx243r.jpg',
  'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744816637524-7xsx2l1g27b.jpg',
  'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744816614166-qp1psup096b.jpg',
  'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744816622385-9k83niy7xyr.jpg',
  'https://vwggeaadqlqbqhjzouyn.supabase.co/storage/v1/object/public/gallery_media/new/1744816629914-sxgpmhvvqr.jpg'
];

const Hero = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Booking form state
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('1 Adult');
  const [roomType, setRoomType] = useState('Any');
  
  // Additional booking details state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const handleBooking = async () => {
    if (!name || !email) {
      toast({
        title: t("Error", "Erro"),
        description: t("Please fill in all required fields", "Por favor, preencha todos os campos obrigatórios"),
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          checkin_date: checkInDate,
          checkout_date: checkOutDate,
          guests,
          room_type: roomType !== 'Any' ? roomType : null,
          name,
          email,
          phone,
          special_requests: specialRequests,
          status: 'pending'
        });

      if (error) throw error;
      
      setBookingSuccess(true);
      toast({
        title: t("Booking Successful", "Reserva Bem-sucedida"),
        description: t("Your booking has been received. We will contact you shortly.", "Sua reserva foi recebida. Entraremos em contato em breve."),
      });
    } catch (error: any) {
      toast({
        title: t("Error", "Erro"),
        description: error.message || t("An error occurred during booking", "Ocorreu um erro durante a reserva"),
        variant: "destructive",
      });
    }
  };

  const resetBookingForm = () => {
    setCheckInDate('');
    setCheckOutDate('');
    setGuests('1 Adult');
    setRoomType('Any');
    setName('');
    setEmail('');
    setPhone('');
    setSpecialRequests('');
    setBookingSuccess(false);
    setShowBookingDialog(false);
  };

  return (
    <section className="relative h-screen">
      <BackgroundSlider images={heroImages} />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white z-10 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
          {t("Experience Luxury & Comfort", "Experimente Luxo & Conforto")}
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {t(
            "Discover the perfect blend of elegance, comfort, and exceptional service at Hotel Villa Capricho",
            "Descubra a combinação perfeita de elegância, conforto e serviço excepcional no Hotel Villa Capricho"
          )}
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Button
            onClick={() => setShowBookingDialog(true)}
            className="bg-hotel hover:bg-hotel-dark text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
          >
            {t("Book Now", "Reserve Agora")}
          </Button>
          <Link
            to="/rooms"
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
          >
            {t("View Rooms", "Ver Quartos")}
          </Link>
        </div>
      </div>
      
      <BookingForm
        onCheckAvailability={() => setShowBookingDialog(true)}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guests={guests}
        roomType={roomType}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        setGuests={setGuests}
        setRoomType={setRoomType}
      />
      
      <BookingDialog
        isOpen={showBookingDialog}
        onClose={() => setShowBookingDialog(false)}
        bookingData={{ checkInDate, checkOutDate, guests, roomType }}
        formData={{ name, email, phone, specialRequests }}
        onFormChange={{
          setName,
          setEmail,
          setPhone,
          setSpecialRequests
        }}
        onSubmit={handleBooking}
        bookingSuccess={bookingSuccess}
        onReset={resetBookingForm}
      />
    </section>
  );
};

export default Hero;
