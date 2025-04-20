
import { Wifi, Coffee, Tv, Bath, BedDouble, Users, AirVent, Lock } from "lucide-react";

interface RoomAmenityListProps {
  amenities: string[];
}

const getAmenityIcon = (amenity: string) => {
  if (amenity.includes("Wi-Fi")) return <Wifi size={18} />;
  if (amenity.includes("Pequeno Almoço")) return <Coffee size={18} />;
  if (amenity.includes("TV")) return <Tv size={18} />;
  if (amenity.includes("Casa de Banho")) return <Bath size={18} />;
  if (amenity.includes("King Size") || amenity.includes("Queen Size")) return <BedDouble size={18} />;
  if (amenity.includes("Sala de Reunião")) return <Users size={18} />;
  if (amenity.includes("Ar Condicionado")) return <AirVent size={18} />;
  if (amenity.includes("Cofre")) return <Lock size={18} />;
  return null;
};

const RoomAmenityList = ({ amenities }: RoomAmenityListProps) => {
  if (!amenities || amenities.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3 mb-4 h-16 overflow-hidden">
      {amenities.slice(0, 4).map((amenity, idx) => (
        <div key={idx} className="flex items-center text-gray-700">
          {getAmenityIcon(amenity)}
          <span className="text-sm ml-1">{amenity}</span>
        </div>
      ))}
    </div>
  );
};

export default RoomAmenityList;
