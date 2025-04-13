
import { Json } from '@/integrations/supabase/types';

export type Room = {
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
  media?: string[];
  videos?: string[];
};

export type RoomFormData = {
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
  image: string;
  price: number;
  capacity: string;
  capacity_pt: string;
  amenities: string;
  amenities_pt: string;
  media?: string[];
  videos?: string[];
};

// Type definition for services
export type Service = {
  id: string;
  icon: string;
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
  price?: number;
  media?: string[];
  videos?: string[];
};

