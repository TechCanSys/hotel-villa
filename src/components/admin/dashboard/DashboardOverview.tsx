
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Bed, Coffee, Image } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { StatCard } from './StatCard';

export const DashboardOverview = () => {
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
