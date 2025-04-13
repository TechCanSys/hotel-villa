
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
      console.log('Attempting login with:', { email });
      
      // Check if admin exists with this email
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .limit(1);
      
      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      console.log('Admin data retrieved:', data);
      
      // Check if any admin was found
      if (!data || data.length === 0) {
        console.error('No admin found with this email');
        throw new Error('Invalid credentials');
      }
      
      const admin = data[0];
      console.log('Admin found:', admin.email);
      
      // Direct password comparison
      if (admin.password === password) {
        console.log('Password match, login successful');
        // Store admin session in localStorage
        localStorage.setItem('adminSession', JSON.stringify({ 
          isAdmin: true, 
          email: admin.email,
          id: admin.id
        }));
        return true;
      } else {
        console.error('Password mismatch');
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      console.error('Login error:', error.message);
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
