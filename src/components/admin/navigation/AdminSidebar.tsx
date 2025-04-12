
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminAuth } from '@/hooks/useSupabase';
import { Bed, Image, Settings, LogOut, Coffee, CalendarClock } from 'lucide-react';
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
  
  return (
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
  );
};
