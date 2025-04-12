
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Define the valid table names
type TableName = 'admins' | 'bookings' | 'gallery' | 'rooms' | 'services';

// Generic hook for fetching data
export const useFetchData = <T,>(tableName: TableName, options = {}) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from(tableName)
          .select('*');

        if (error) throw error;
        
        setData(data as T[]);
      } catch (error: any) {
        setError(error);
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tableName, toast]);

  return { data, isLoading, error };
};

// Hook for admin login
export const useAdminLogin = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Check if admin exists with this email
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) throw error;
      
      // In a real app, you would properly verify the password hash
      // This is just a simplified example
      if (data && data.password.startsWith('$2a$10$')) {
        // Store admin session in localStorage
        localStorage.setItem('adminSession', JSON.stringify({ 
          isAdmin: true, 
          email: data.email,
          id: data.id
        }));
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

// Hook to check if user is logged in as admin
export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminSession = () => {
      try {
        const adminSession = localStorage.getItem('adminSession');
        if (adminSession) {
          const session = JSON.parse(adminSession);
          setIsAdmin(session.isAdmin === true);
        }
      } catch (error) {
        console.error('Error checking admin session:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminSession();
  }, []);

  const logout = () => {
    localStorage.removeItem('adminSession');
    setIsAdmin(false);
  };

  return { isAdmin, isLoading, logout };
};
