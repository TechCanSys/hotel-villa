
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ServiceForm, ServiceFormData } from "./ServiceForm";
import { Service } from "@/types/room";
import { useLanguage } from "@/contexts/LanguageContext";

type ServiceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingService: Service | null;
  onSubmit: (formData: ServiceFormData) => Promise<void>;
};

export const ServiceDialog = ({ 
  open, 
  onOpenChange, 
  editingService, 
  onSubmit 
}: ServiceDialogProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingService 
              ? t("Edit Service", "Editar Serviço") 
              : t("Add New Service", "Adicionar Novo Serviço")}
          </DialogTitle>
          <DialogDescription>
            {t(
              "Fill in the details to create or update a service",
              "Preencha os detalhes para criar ou atualizar um serviço"
            )}
          </DialogDescription>
        </DialogHeader>
        
        <ServiceForm 
          editingService={editingService} 
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
