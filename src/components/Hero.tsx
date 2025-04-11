
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, BedDouble, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const heroImages = [
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
];

const Hero = () => {
  const { language, t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('1 Adult');
  const [roomType, setRoomType] = useState('Any');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCheckAvailability = () => {
    if (!checkInDate || !checkOutDate) {
      toast({
        title: t("Error", "Erro"),
        description: t("Please select check-in and check-out dates", "Por favor, selecione as datas de check-in e check-out"),
        variant: "destructive",
      });
      return;
    }
    
    setShowBookingDialog(true);
  };

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
          {t("Experience Luxury & Comfort", "Experimente Luxo & Conforto")}
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {t(
            "Discover the perfect blend of elegance, comfort, and exceptional service at New Hotel",
            "Descubra a combinação perfeita de elegância, conforto e serviço excepcional no New Hotel"
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
      
      {/* Booking Form */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg transform translate-y-1/2 z-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
          <div className="flex flex-col">
            <label className="text-hotel-text font-medium mb-2 flex items-center gap-2">
              <Calendar size={18} />
              {t("Check In", "Check In")}
            </label>
            <Input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-hotel"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-hotel-text font-medium mb-2 flex items-center gap-2">
              <Calendar size={18} />
              {t("Check Out", "Check Out")}
            </label>
            <Input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-hotel"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-hotel-text font-medium mb-2 flex items-center gap-2">
              <Users size={18} />
              {t("Guests", "Hóspedes")}
            </label>
            <select 
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-hotel"
            >
              <option>1 {t("Adult", "Adulto")}</option>
              <option>2 {t("Adults", "Adultos")}</option>
              <option>2 {t("Adults", "Adultos")}, 1 {t("Child", "Criança")}</option>
              <option>2 {t("Adults", "Adultos")}, 2 {t("Children", "Crianças")}</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-hotel-text font-medium mb-2 flex items-center gap-2">
              <BedDouble size={18} />
              {t("Room Type", "Tipo de Quarto")}
            </label>
            <select 
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-hotel"
            >
              <option>{t("Any", "Qualquer")}</option>
              <option>{t("Standard", "Padrão")}</option>
              <option>{t("Deluxe", "Deluxe")}</option>
              <option>{t("Suite", "Suíte")}</option>
            </select>
          </div>
        </div>
        <div 
          className="bg-hotel text-white text-center py-3 rounded-b-3xl hover:bg-hotel-dark transition-colors cursor-pointer"
          onClick={handleCheckAvailability}
        >
          <span className="font-medium">{t("Check Availability", "Verificar Disponibilidade")}</span>
        </div>
      </div>
      
      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {bookingSuccess 
                ? t("Booking Confirmed!", "Reserva Confirmada!") 
                : t("Complete Your Booking", "Complete Sua Reserva")}
            </DialogTitle>
          </DialogHeader>
          
          {bookingSuccess ? (
            <div className="py-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-gray-600 mb-4">
                {t("Thank you for choosing our hotel. We've sent the details to your email.", "Obrigado por escolher nosso hotel. Enviamos os detalhes para o seu email.")}
              </p>
              <Button onClick={resetBookingForm}>
                {t("Done", "Concluído")}
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <p className="text-gray-600 mb-2">
                  {t("Please provide your information to complete the booking.", "Por favor, forneça suas informações para completar a reserva.")}
                </p>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t("Full Name", "Nome Completo")} *
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t("Email", "Email")} *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    {t("Phone", "Telefone")}
                  </label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="requests" className="text-sm font-medium">
                    {t("Special Requests", "Pedidos Especiais")}
                  </label>
                  <Textarea
                    id="requests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{t("Check-in", "Check-in")}</span>
                    <span className="font-medium">{checkInDate}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{t("Check-out", "Check-out")}</span>
                    <span className="font-medium">{checkOutDate}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{t("Guests", "Hóspedes")}</span>
                    <span className="font-medium">{guests}</span>
                  </div>
                  {roomType !== 'Any' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("Room Type", "Tipo de Quarto")}</span>
                      <span className="font-medium">{roomType}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
                  {t("Cancel", "Cancelar")}
                </Button>
                <Button onClick={handleBooking}>
                  {t("Complete Booking", "Finalizar Reserva")}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
