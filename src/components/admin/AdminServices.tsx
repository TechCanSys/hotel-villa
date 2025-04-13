
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Service } from '@/types/room';
import { ServiceList } from './services/ServiceList';
import { ServiceDialog } from './services/ServiceDialog';
import { ServiceFormData } from './services/ServiceForm';
import { fetchServices, createService, updateService, deleteService } from '@/services/serviceService';

const AdminServices = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const servicesData = await fetchServices();
      setServices(servicesData);
    } catch (error: any) {
      toast({
        title: t("Error", "Erro"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openAddDialog = () => {
    setEditingService(null);
    setShowDialog(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setShowDialog(true);
  };

  const handleSubmit = async (formData: ServiceFormData) => {
    try {
      if (editingService) {
        await updateService(editingService.id, formData);
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Service updated successfully", "Serviço atualizado com sucesso"),
        });
      } else {
        await createService(formData);
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Service added successfully", "Serviço adicionado com sucesso"),
        });
      }

      setShowDialog(false);
      loadServices();
    } catch (error: any) {
      toast({
        title: t("Error", "Erro"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(t("Are you sure you want to delete this service?", "Tem certeza de que deseja excluir este serviço?"))) {
      try {
        await deleteService(id);
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Service deleted successfully", "Serviço excluído com sucesso"),
        });
        
        loadServices();
      } catch (error: any) {
        toast({
          title: t("Error", "Erro"),
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-hotel-text">{t("Service Management", "Gerenciamento de Serviços")}</h1>
        <Button onClick={openAddDialog}>
          <Plus size={16} className="mr-2" />
          {t("Add Service", "Adicionar Serviço")}
        </Button>
      </div>
      
      <ServiceList 
        services={services}
        isLoading={isLoading}
        onEdit={openEditDialog}
        onDelete={handleDelete}
      />
      
      <ServiceDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        editingService={editingService}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminServices;
