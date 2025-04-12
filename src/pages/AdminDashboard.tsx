
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useSupabase';
import AdminRooms from '@/components/admin/AdminRooms';
import AdminServices from '@/components/admin/AdminServices';
import AdminGallery from '@/components/admin/AdminGallery';
import AdminBookings from '@/components/admin/AdminBookings';
import { AdminSidebar } from '@/components/admin/navigation/AdminSidebar';
import { DashboardOverview } from '@/components/admin/dashboard/DashboardOverview';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { isAdmin, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/admin');
    }
    
    const path = location.pathname.split('/').pop();
    if (path && path !== 'dashboard') {
      setActiveSection(path);
    }
  }, [isLoading, isAdmin, navigate, location.pathname]);

  const renderSection = () => {
    switch (activeSection) {
      case 'rooms':
        return <AdminRooms />;
      case 'services':
        return <AdminServices />;
      case 'gallery':
        return <AdminGallery />;
      case 'bookings':
        return <AdminBookings />;
      default:
        return <DashboardOverview />;
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-hotel"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            className="mr-4"
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Site
          </Button>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
