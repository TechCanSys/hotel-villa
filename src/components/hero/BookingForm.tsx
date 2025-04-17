
import { useState } from 'react';
import { Calendar, Users, BedDouble } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

type BookingFormProps = {
  onCheckAvailability: () => void;
  checkInDate: string;
  checkOutDate: string;
  guests: string;
  roomType: string;
  setCheckInDate: (date: string) => void;
  setCheckOutDate: (date: string) => void;
  setGuests: (guests: string) => void;
  setRoomType: (type: string) => void;
};

const BookingForm = ({
  onCheckAvailability,
  checkInDate,
  checkOutDate,
  guests,
  roomType,
  setCheckInDate,
  setCheckOutDate,
  setGuests,
  setRoomType
}: BookingFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleCheckAvailability = () => {
    if (!checkInDate || !checkOutDate) {
      toast({
        title: t("Error", "Erro"),
        description: t("Please select check-in and check-out dates", "Por favor, selecione as datas de check-in e check-out"),
        variant: "destructive",
      });
      return;
    }
    onCheckAvailability();
  };

  return (
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
  );
};

export default BookingForm;
