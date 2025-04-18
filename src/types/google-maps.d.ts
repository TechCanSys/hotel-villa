
declare interface Window {
  google: typeof google;
}

declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
  }

  class Marker {
    constructor(opts?: MarkerOptions);
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    styles?: Array<MapTypeStyle>;
    [key: string]: any;
  }

  interface MarkerOptions {
    position?: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    [key: string]: any;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapTypeStyle {
    featureType?: string;
    elementType?: string;
    stylers?: Array<{ [key: string]: any }>;
  }
}
