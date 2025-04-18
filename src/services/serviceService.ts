
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
  // Ensure we're authenticated before attempting to insert
  const { data: sessionData } = await supabase.auth.getSession();
  
  // REMOVIDO: a verificação de sessão para permitir acesso administrativo
  // mesmo sem autenticação formal do Supabase
  
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

  console.log('Creating service with data:', formattedData);
  
  const { data, error } = await supabase
    .from('services')
    .insert([formattedData])
    .select();

  if (error) {
    console.error('Error creating service:', error);
    throw error;
  }
  
  return data;
};

export const updateService = async (id: string, serviceData: ServiceFormData) => {
  // REMOVIDO: a verificação de sessão para permitir acesso administrativo
  // mesmo sem autenticação formal do Supabase
  
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

  console.log('Updating service with data:', formattedData);
  
  const { data, error } = await supabase
    .from('services')
    .update(formattedData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating service:', error);
    throw error;
  }
  
  return data;
};

export const deleteService = async (id: string) => {
  // REMOVIDO: a verificação de sessão para permitir acesso administrativo
  // mesmo sem autenticação formal do Supabase
  
  console.log('Deleting service with ID:', id);
  
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};
