
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useSupabase';
import AdminRooms from '@/components/admin/AdminRooms';
import AdminServices from '@/components/admin/AdminServices';
import AdminGallery from '@/components/admin/AdminGallery';
import AdminBookings from '@/components/admin/AdminBookings';
import { AdminSidebar } from '@/components/admin/navigation/AdminSidebar';
import { DashboardOverview } from '@/components/admin/dashboard/DashboardOverview';

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
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
