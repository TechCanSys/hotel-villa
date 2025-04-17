
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Wifi, Coffee, Tv, Bath, BedDouble, Users, AirVent, Lock } from 'lucide-react';

interface RoomCardProps {
  name: string;
  description: string;
  price: string;
  images: {
    url: string;
    alt: string;
  }[];
  amenities: string[];
  promotion?: string;
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

const RoomCard = ({ name, description, price, images, amenities, promotion }: RoomCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <Card className="w-full overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-video">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <CardHeader>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-3 mb-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-1 text-gray-600 text-sm bg-gray-100 px-3 py-1 rounded-full">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
        {promotion && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">
            {promotion}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="text-xl font-bold text-hotel">
          {price}
          <span className="text-sm text-gray-500">/noite</span>
        </div>
        <Button asChild>
          <Link to="/rooms">Ver Detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
