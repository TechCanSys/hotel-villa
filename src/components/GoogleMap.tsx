
import { useEffect, useRef } from 'react';

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;

    // Create map instance
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: -25.0300, lng: 32.2400 }, // Coordenadas de Moamba, Maputo
      zoom: 15,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#746855" }]
        }
      ]
    });

    // Add marker
    new google.maps.Marker({
      position: { lat: -25.0300, lng: 32.2400 },
      map: map,
      title: "Hotel Villa Capricho"
    });

  }, []);

  return (
    <div ref={mapRef} className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg" />
  );
};

export default GoogleMap;
