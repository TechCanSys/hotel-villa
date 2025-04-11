
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, BedDouble, Users, Check, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type Room = {
  id: string;
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
  image: string;
  price: number;
  capacity: string;
  capacity_pt: string;
  amenities: string[];
  amenities_pt: string[];
};

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language, t } = useLanguage();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('1 Adult');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { toast } = useToast();

  // Fallback room if Supabase hasn't loaded yet
  const fallbackRoom = {
    id: id || '1',
    title: 'Deluxe Room',
    title_pt: 'Quarto Deluxe',
    description: 'Spacious room with city view and modern amenities for a comfortable stay. Our Deluxe Rooms offer the perfect blend of comfort and style, featuring premium bedding, a work desk, and a modern bathroom with a rain shower. Each room is designed with your comfort in mind, providing a peaceful retreat after a day of exploring or business.',
    description_pt: 'Quarto espaçoso com vista para a cidade e comodidades modernas para uma estadia confortável. Nossos Quartos Deluxe oferecem a combinação perfeita de conforto e estilo, com cama premium, mesa de trabalho e banheiro moderno com chuveiro tipo chuva. Cada quarto é projetado pensando no seu conforto, proporcionando um retiro tranquilo após um dia de exploração ou negócios.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    price: 150,
    capacity: '2 Adults',
    capacity_pt: '2 Adultos',
    amenities: ['Free WiFi', 'Coffee Maker', 'Smart TV', 'Luxury Bathroom', 'Mini Bar', 'Safe', 'Air Conditioning', 'Room Service'],
    amenities_pt: ['Wi-Fi Grátis', 'Cafeteira', 'Smart TV', 'Banheiro de Luxo', 'Mini Bar', 'Cofre', 'Ar Condicionado', 'Serviço de Quarto']
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setIsLoading(true);
        if (!id) return;

        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (data) {
          setRoom(data as Room);
        }
      } catch (error) {
        console.error('Error fetching room:', error);
        setRoom(fallbackRoom);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleBooking = async () => {
    if (bookingStep === 1) {
      if (!checkInDate || !checkOutDate || !guests) {
        toast({
          title: t("Error", "Erro"),
          description: t("Please fill in all required fields", "Por favor, preencha todos os campos obrigatórios"),
          variant: "destructive",
        });
        return;
      }
      setBookingStep(2);
      return;
    }

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
          room_type: room ? (language === 'en' ? room.title : room.title_pt) : '',
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
    setName('');
    setEmail('');
    setPhone('');
    setSpecialRequests('');
    setBookingStep(1);
    setBookingSuccess(false);
    setShowBookingDialog(false);
  };

  // Use fallback if room is null (not loaded yet)
  const displayRoom = room || fallbackRoom;

  return (
    <>
      <Navbar />
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <Link 
            to="/rooms" 
            className="inline-flex items-center gap-2 text-hotel hover:text-hotel-dark transition-colors font-medium mb-8"
          >
            <ArrowLeft size={18} /> {t("Back to Rooms", "Voltar para Quartos")}
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image gallery */}
            <div>
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={displayRoom.image} 
                  alt={language === 'en' ? displayRoom.title : displayRoom.title_pt} 
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
            
            {/* Room details */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-hotel-text">
                {language === 'en' ? displayRoom.title : displayRoom.title_pt}
              </h1>
              
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <BedDouble size={20} />
                  <span>{language === 'en' ? displayRoom.capacity : displayRoom.capacity_pt}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-8">
                {language === 'en' ? displayRoom.description : displayRoom.description_pt}
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-hotel-text">
                  {t("Amenities", "Comodidades")}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {(language === 'en' ? displayRoom.amenities : displayRoom.amenities_pt).map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check size={18} className="text-hotel" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-8">
                <div>
                  <span className="block text-gray-500 text-sm">{t("Price", "Preço")}</span>
                  <span className="text-3xl font-bold text-hotel">${displayRoom.price}</span>
                  <span className="text-gray-500 text-sm">/{t("night", "noite")}</span>
                </div>
                <Button 
                  onClick={() => setShowBookingDialog(true)}
                  className="bg-hotel hover:bg-hotel-dark text-white px-6 py-2"
                >
                  {t("Book Now", "Reserve Agora")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {bookingSuccess 
                ? t("Booking Confirmed!", "Reserva Confirmada!") 
                : t("Book Your Stay", "Reserve sua Estadia")}
            </DialogTitle>
            <DialogDescription>
              {bookingSuccess 
                ? t("Thank you for choosing our hotel. We've sent the details to your email.", "Obrigado por escolher nosso hotel. Enviamos os detalhes para o seu email.")
                : bookingStep === 1 
                  ? t("Select your dates and preferences", "Selecione suas datas e preferências")
                  : t("Complete your personal information", "Complete suas informações pessoais")}
            </DialogDescription>
          </DialogHeader>
          
          {bookingSuccess ? (
            <div className="py-4 flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-center text-gray-600 mb-4">
                {t("Your booking for", "Sua reserva para")} {language === 'en' ? displayRoom.title : displayRoom.title_pt} {t("has been received.", "foi recebida.")}
              </p>
              <Button onClick={resetBookingForm}>
                {t("Done", "Concluído")}
              </Button>
            </div>
          ) : (
            <>
              {bookingStep === 1 ? (
                <>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="check-in" className="text-sm font-medium">
                          {t("Check-in Date", "Data de Check-in")} *
                        </label>
                        <Input
                          id="check-in"
                          type="date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="check-out" className="text-sm font-medium">
                          {t("Check-out Date", "Data de Check-out")} *
                        </label>
                        <Input
                          id="check-out"
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="guests" className="text-sm font-medium">
                        {t("Guests", "Hóspedes")} *
                      </label>
                      <select 
                        id="guests" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                      >
                        <option>1 {t("Adult", "Adulto")}</option>
                        <option>2 {t("Adults", "Adultos")}</option>
                        <option>2 {t("Adults", "Adultos")}, 1 {t("Child", "Criança")}</option>
                        <option>2 {t("Adults", "Adultos")}, 2 {t("Children", "Crianças")}</option>
                      </select>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">{language === 'en' ? displayRoom.title : displayRoom.title_pt}</span>
                      <span className="font-medium">${displayRoom.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">{t("Tax", "Impostos")}</span>
                      <span className="font-medium">${Math.round(displayRoom.price * 0.1)}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                      <span className="font-medium">{t("Total (per night)", "Total (por noite)")}</span>
                      <span className="font-bold">${displayRoom.price + Math.round(displayRoom.price * 0.1)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid gap-4 py-4">
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
                </div>
              )}
              <DialogFooter>
                {bookingStep === 2 && (
                  <Button variant="outline" onClick={() => setBookingStep(1)} className="mr-auto">
                    {t("Back", "Voltar")}
                  </Button>
                )}
                <Button onClick={handleBooking}>
                  {bookingStep === 1 
                    ? t("Next", "Próximo") 
                    : t("Complete Booking", "Finalizar Reserva")}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </>
  );
};

export default RoomDetail;
