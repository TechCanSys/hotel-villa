
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useSupabase';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Bed, Image, Settings, LogOut, Coffee, 
  CalendarClock, Users, Plus, Pencil, Trash2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import AdminRooms from '@/components/admin/AdminRooms';
import AdminServices from '@/components/admin/AdminServices';
import AdminGallery from '@/components/admin/AdminGallery';
import AdminBookings from '@/components/admin/AdminBookings';

const AdminDashboard = () => {
  const { isAdmin, isLoading, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
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

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

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
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-hotel-text">{t("Admin Panel", "Painel Admin")}</h2>
        </div>
        <nav className="mt-6">
          <MenuItem 
            icon={<Settings size={20} />} 
            label={t("Dashboard", "Painel")} 
            isActive={activeSection === 'dashboard'} 
            onClick={() => {
              setActiveSection('dashboard');
              navigate('/admin/dashboard');
            }}
          />
          <MenuItem 
            icon={<Bed size={20} />} 
            label={t("Rooms", "Quartos")} 
            isActive={activeSection === 'rooms'} 
            onClick={() => {
              setActiveSection('rooms');
              navigate('/admin/rooms');
            }}
          />
          <MenuItem 
            icon={<Coffee size={20} />} 
            label={t("Services", "Serviços")} 
            isActive={activeSection === 'services'} 
            onClick={() => {
              setActiveSection('services');
              navigate('/admin/services');
            }}
          />
          <MenuItem 
            icon={<Image size={20} />} 
            label={t("Gallery", "Galeria")} 
            isActive={activeSection === 'gallery'} 
            onClick={() => {
              setActiveSection('gallery');
              navigate('/admin/gallery');
            }}
          />
          <MenuItem 
            icon={<CalendarClock size={20} />} 
            label={t("Bookings", "Reservas")} 
            isActive={activeSection === 'bookings'} 
            onClick={() => {
              setActiveSection('bookings');
              navigate('/admin/bookings');
            }}
          />
          <div className="mt-auto pt-6">
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-3 text-gray-500 hover:bg-gray-100 hover:text-hotel w-full"
            >
              <LogOut size={20} className="mr-3" />
              <span>{t("Logout", "Sair")}</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {renderSection()}
      </main>
    </div>
  );
};

const MenuItem = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-6 py-3 w-full ${
        isActive 
          ? 'bg-hotel text-white' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-hotel'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

const DashboardOverview = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-hotel-text mb-8">
        {t("Dashboard", "Painel")}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<Bed size={24} />} 
          label={t("Rooms", "Quartos")} 
          value="12" 
        />
        <StatCard 
          icon={<Coffee size={24} />} 
          label={t("Services", "Serviços")} 
          value="6" 
        />
        <StatCard 
          icon={<Image size={24} />} 
          label={t("Gallery Items", "Itens da Galeria")} 
          value="24" 
        />
        <StatCard 
          icon={<Users size={24} />} 
          label={t("New Bookings", "Novas Reservas")} 
          value="8" 
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-hotel-text mb-4">
          {t("Recent Bookings", "Reservas Recentes")}
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Name", "Nome")}</TableHead>
              <TableHead>{t("Room Type", "Tipo de Quarto")}</TableHead>
              <TableHead>{t("Check-in", "Check-in")}</TableHead>
              <TableHead>{t("Check-out", "Check-out")}</TableHead>
              <TableHead>{t("Status", "Status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Smith</TableCell>
              <TableCell>{t("Deluxe Room", "Quarto Deluxe")}</TableCell>
              <TableCell>2023-06-15</TableCell>
              <TableCell>2023-06-18</TableCell>
              <TableCell>{t("Confirmed", "Confirmado")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Maria Silva</TableCell>
              <TableCell>{t("Executive Suite", "Suíte Executiva")}</TableCell>
              <TableCell>2023-06-20</TableCell>
              <TableCell>2023-06-25</TableCell>
              <TableCell>{t("Pending", "Pendente")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const StatCard = ({ 
  icon, 
  label, 
  value 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
      <div className="bg-hotel bg-opacity-10 p-3 rounded-full mr-4">
        <div className="text-hotel">{icon}</div>
      </div>
      <div>
        <h3 className="text-gray-500 text-sm">{label}</h3>
        <p className="text-2xl font-bold text-hotel-text">{value}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
