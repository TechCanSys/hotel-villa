
import { supabase } from '@/integrations/supabase/client';
import { Room, RoomFormData } from '@/types/room';
import { Json } from '@/integrations/supabase/types';

export const fetchRooms = async (): Promise<Room[]> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  const transformedRooms = data?.map(room => ({
    ...room,
    amenities: Array.isArray(room.amenities) 
      ? room.amenities.map(item => String(item)) 
      : [String(room.amenities)],
    amenities_pt: Array.isArray(room.amenities_pt) 
      ? room.amenities_pt.map(item => String(item)) 
      : [String(room.amenities_pt)],
    media: Array.isArray(room.media) ? room.media.map(item => String(item)) : [],
    videos: Array.isArray(room.videos) ? room.videos.map(item => String(item)) : []
  })) as Room[];
  
  return transformedRooms || [];
};

export const createRoom = async (roomData: RoomFormData) => {
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();

  // Ensure we're authenticated before attempting to insert
  if (!session) {
    // Instead of throwing an error, let's use the admin authentication from localStorage
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      throw new Error('Authentication required to create a room');
    }
    
    // Admin is authenticated through our custom method, proceed with the operation
    console.log('Using admin session for room creation');
  }
  
  const formattedData = {
    title: roomData.title,
    title_pt: roomData.title_pt,
    description: roomData.description,
    description_pt: roomData.description_pt,
    image: roomData.image,
    price: roomData.price,
    capacity: roomData.capacity,
    capacity_pt: roomData.capacity_pt,
    amenities: roomData.amenities.split(',').map(item => item.trim()),
    amenities_pt: roomData.amenities_pt.split(',').map(item => item.trim()),
    media: roomData.media || [],
    videos: roomData.videos || []
  };

  console.log('Creating room with data:', formattedData);
  
  const { data, error } = await supabase
    .from('rooms')
    .insert([formattedData])
    .select();

  if (error) {
    console.error('Error creating room:', error);
    throw error;
  }
  
  return data;
};

export const updateRoom = async (id: string, roomData: RoomFormData) => {
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();

  // Ensure we're authenticated before attempting to update
  if (!session) {
    // Instead of throwing an error, let's use the admin authentication from localStorage
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      throw new Error('Authentication required to update a room');
    }
    
    // Admin is authenticated through our custom method, proceed with the operation
    console.log('Using admin session for room update');
  }
  
  const formattedData = {
    title: roomData.title,
    title_pt: roomData.title_pt,
    description: roomData.description,
    description_pt: roomData.description_pt,
    image: roomData.image,
    price: roomData.price,
    capacity: roomData.capacity,
    capacity_pt: roomData.capacity_pt,
    amenities: roomData.amenities.split(',').map(item => item.trim()),
    amenities_pt: roomData.amenities_pt.split(',').map(item => item.trim()),
    media: roomData.media || [],
    videos: roomData.videos || []
  };

  console.log('Updating room with data:', formattedData);
  
  const { data, error } = await supabase
    .from('rooms')
    .update(formattedData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating room:', error);
    throw error;
  }
  
  return data;
};

export const deleteRoom = async (id: string) => {
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();

  // Ensure we're authenticated before attempting to delete
  if (!session) {
    // Instead of throwing an error, let's use the admin authentication from localStorage
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      throw new Error('Authentication required to delete a room');
    }
    
    // Admin is authenticated through our custom method, proceed with the operation
    console.log('Using admin session for room deletion');
  }
  
  console.log('Deleting room with ID:', id);
  
  const { error } = await supabase
    .from('rooms')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting room:', error);
    throw error;
  }
};
