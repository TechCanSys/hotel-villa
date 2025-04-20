
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import RoomAmenityList from "./RoomAmenityList";

interface RoomDetailsDialogProps {
  name: string;
  description: string;
  images: { url: string; alt: string }[];
  amenities: string[];
  price: string;
  bookingData: {
    checkInDate: string;
    checkOutDate: string;
    guests: string;
    roomType: string;
  };
  calculateTotal: (checkIn: string, checkOut: string, priceStr: string) => number;
  onBooking: () => void;
  closeButtonRef: React.RefObject<HTMLButtonElement>;
}

const RoomDetailsDialog = ({
  name,
  description,
  images,
  amenities,
  price,
  bookingData,
  calculateTotal,
  onBooking,
  closeButtonRef
}: RoomDetailsDialogProps) => {
  // Use single main image, show thumbnails if multiples available
  const currentImage = 0; // Always main image in dialog
  return (
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
                src={images[currentImage]?.url}
                alt={images[currentImage]?.alt}
                className="w-full h-64 object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image.url}
                    alt={image.alt}
                    className={`h-20 w-full object-cover rounded cursor-pointer ${currentImage === idx ? 'ring-2 ring-hotel' : ''}`}
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
              <p className="text-3xl font-bold text-hotel">
                {price} <span className="text-sm text-gray-500"> / noite</span>
              </p>
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
              onClick={onBooking}
            >
              Reservar Agora
            </Button>
            <DialogClose ref={closeButtonRef} className="hidden" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetailsDialog;
