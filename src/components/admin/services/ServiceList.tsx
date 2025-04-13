
import { useLanguage } from '@/contexts/LanguageContext';
import { Service } from '@/types/room';
import { Utensils, Wine, ShowerHead, Users, Waves, DollarSign, Pencil, Trash2 } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { icons } from './ServiceForm';

type ServiceListProps = {
  services: Service[];
  isLoading: boolean;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
};

export const ServiceList = ({ services, isLoading, onEdit, onDelete }: ServiceListProps) => {
  const { t } = useLanguage();

  const getIconComponent = (iconName: string) => {
    const icon = icons.find(i => i.name === iconName);
    return icon ? icon.component : <Utensils size={20} />;
  };
  
  const formatMZN = (amount: number) => {
    return new Intl.NumberFormat('pt-MZ', { 
      style: 'currency', 
      currency: 'MZN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hotel"></div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("Icon", "Ícone")}</TableHead>
          <TableHead>{t("Title", "Título")}</TableHead>
          <TableHead>{t("Title (PT)", "Título (PT)")}</TableHead>
          <TableHead>{t("Price", "Preço")}</TableHead>
          <TableHead>{t("Media", "Mídia")}</TableHead>
          <TableHead className="text-right">{t("Actions", "Ações")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4 text-gray-500">
              {t("No services found", "Nenhum serviço encontrado")}
            </TableCell>
          </TableRow>
        ) : (
          services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>
                <div className="text-hotel">
                  {getIconComponent(service.icon)}
                </div>
              </TableCell>
              <TableCell className="font-medium">{service.title}</TableCell>
              <TableCell>{service.title_pt}</TableCell>
              <TableCell>{service.price ? formatMZN(service.price) : '-'}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                    {(service.media?.length || 0)} {t("images", "imagens")}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                    {(service.videos?.length || 0)} {t("videos", "vídeos")}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onEdit(service)}>
                  <Pencil size={16} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(service.id)}>
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
