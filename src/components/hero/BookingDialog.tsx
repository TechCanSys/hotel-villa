
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    checkInDate: string;
    checkOutDate: string;
    guests: string;
    roomType: string;
  };
  formData: {
    name: string;
    email: string;
    phone: string;
    specialRequests: string;
  };
  onFormChange: {
    setName: (value: string) => void;
    setEmail: (value: string) => void;
    setPhone: (value: string) => void;
    setSpecialRequests: (value: string) => void;
  };
  onSubmit: () => void;
  bookingSuccess: boolean;
  onReset: () => void;
}

const BookingDialog = ({
  isOpen,
  onClose,
  bookingData,
  formData,
  onFormChange,
  onSubmit,
  bookingSuccess,
  onReset,
}: BookingDialogProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            <Button onClick={onReset}>
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
                  value={formData.name}
                  onChange={(e) => onFormChange.setName(e.target.value)}
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
                  value={formData.email}
                  onChange={(e) => onFormChange.setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  {t("Phone", "Telefone")}
                </label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => onFormChange.setPhone(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="requests" className="text-sm font-medium">
                  {t("Special Requests", "Pedidos Especiais")}
                </label>
                <Textarea
                  id="requests"
                  value={formData.specialRequests}
                  onChange={(e) => onFormChange.setSpecialRequests(e.target.value)}
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{t("Check-in", "Check-in")}</span>
                  <span className="font-medium">{bookingData.checkInDate}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{t("Check-out", "Check-out")}</span>
                  <span className="font-medium">{bookingData.checkOutDate}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{t("Guests", "Hóspedes")}</span>
                  <span className="font-medium">{bookingData.guests}</span>
                </div>
                {bookingData.roomType !== 'Any' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("Room Type", "Tipo de Quarto")}</span>
                    <span className="font-medium">{bookingData.roomType}</span>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                {t("Cancel", "Cancelar")}
              </Button>
              <Button onClick={onSubmit}>
                {t("Complete Booking", "Finalizar Reserva")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
