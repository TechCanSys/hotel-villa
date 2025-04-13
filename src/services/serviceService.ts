
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/room';
import { ServiceFormData } from '@/components/admin/services/ServiceForm';

export const fetchServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  const transformedServices = data?.map(service => ({
    ...service,
    media: Array.isArray(service.media) ? service.media.map(item => String(item)) : [],
    videos: Array.isArray(service.videos) ? service.videos.map(item => String(item)) : []
  })) as Service[];
  
  return transformedServices || [];
};

export const createService = async (serviceData: ServiceFormData) => {
  const formattedData = {
    icon: serviceData.icon,
    title: serviceData.title,
    title_pt: serviceData.title_pt,
    description: serviceData.description,
    description_pt: serviceData.description_pt,
    price: serviceData.price ? parseInt(serviceData.price, 10) : null,
    media: serviceData.media || [],
    videos: serviceData.videos || []
  };

  const { error } = await supabase
    .from('services')
    .insert([formattedData]);

  if (error) throw error;
};

export const updateService = async (id: string, serviceData: ServiceFormData) => {
  const formattedData = {
    icon: serviceData.icon,
    title: serviceData.title,
    title_pt: serviceData.title_pt,
    description: serviceData.description,
    description_pt: serviceData.description_pt,
    price: serviceData.price ? parseInt(serviceData.price, 10) : null,
    media: serviceData.media || [],
    videos: serviceData.videos || []
  };

  const { error } = await supabase
    .from('services')
    .update(formattedData)
    .eq('id', id);

  if (error) throw error;
};

export const deleteService = async (id: string) => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
