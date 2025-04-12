
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminAuth } from '@/hooks/useSupabase';
import { Bed, Image, Settings, LogOut, Coffee, CalendarClock, Gauge, DollarSign } from 'lucide-react';
import { MenuItem } from './MenuItem';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeSection, 
  setActiveSection 
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const pendingBookings = 5; // This would come from a real API in production
  
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col h-screen">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-hotel-text">{t("Admin Panel", "Painel Admin")}</h2>
        <p className="text-sm text-gray-500 mt-1">{t("Hotel Management", "Gestão do Hotel")}</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <MenuItem 
          icon={<Gauge size={20} />} 
          label={t("Dashboard", "Painel")} 
          isActive={activeSection === 'dashboard'} 
          onClick={() => {
            setActiveSection('dashboard');
            navigate('/admin/dashboard');
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
          badge={pendingBookings}
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
          icon={<DollarSign size={20} />} 
          label={t("Pricing", "Preços")} 
          isActive={activeSection === 'pricing'} 
          onClick={() => {
            setActiveSection('pricing');
            navigate('/admin/pricing');
          }}
        />
        <MenuItem 
          icon={<Settings size={20} />} 
          label={t("Settings", "Configurações")} 
          isActive={activeSection === 'settings'} 
          onClick={() => {
            setActiveSection('settings');
            navigate('/admin/settings');
          }}
        />
      </nav>
      <div className="p-4 border-t mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-500 hover:bg-gray-100 hover:text-hotel w-full p-3 rounded-md transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span>{t("Logout", "Sair")}</span>
        </button>
      </div>
    </aside>
  );
};
