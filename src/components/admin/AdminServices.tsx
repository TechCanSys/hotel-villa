import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Utensils, Wine, ShowerHead, Users, Waves, DollarSign } from 'lucide-react';

type Service = {
  id: string;
  icon: string;
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
  price?: number;
};

const icons = [
  { name: 'Utensils', component: <Utensils size={20} /> },
  { name: 'Wine', component: <Wine size={20} /> },
  { name: 'ShowerHead', component: <ShowerHead size={20} /> },
  { name: 'Users', component: <Users size={20} /> },
  { name: 'Pool', component: <Waves size={20} /> },
  { name: 'DollarSign', component: <DollarSign size={20} /> }
];

const AdminServices = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    title_pt: '',
    description: '',
    description_pt: '',
    price: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setServices(data || []);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openAddDialog = () => {
    setEditingService(null);
    setFormData({
      icon: 'Utensils',
      title: '',
      title_pt: '',
      description: '',
      description_pt: '',
      price: ''
    });
    setShowDialog(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      icon: service.icon,
      title: service.title,
      title_pt: service.title_pt,
      description: service.description,
      description_pt: service.description_pt,
      price: service.price?.toString() || ''
    });
    setShowDialog(true);
  };

  const handleSubmit = async () => {
    try {
      if (
        !formData.icon || 
        !formData.title || 
        !formData.title_pt || 
        !formData.description || 
        !formData.description_pt
      ) {
        toast({
          title: t("Error", "Erro"),
          description: t("Please fill in all required fields", "Por favor, preencha todos os campos obrigatórios"),
          variant: "destructive",
        });
        return;
      }

      const serviceData: any = {
        icon: formData.icon,
        title: formData.title,
        title_pt: formData.title_pt,
        description: formData.description,
        description_pt: formData.description_pt
      };

      if (formData.price) {
        serviceData.price = parseInt(formData.price, 10);
      }

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);

        if (error) throw error;
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Service updated successfully", "Serviço atualizado com sucesso"),
        });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceData]);

        if (error) throw error;
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Service added successfully", "Serviço adicionado com sucesso"),
        });
      }

      setShowDialog(false);
      fetchServices();
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
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Service deleted successfully", "Serviço excluído com sucesso"),
        });
        
        fetchServices();
      } catch (error: any) {
        toast({
          title: t("Error", "Erro"),
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-hotel-text">{t("Service Management", "Gerenciamento de Serviços")}</h1>
        <Button onClick={openAddDialog}>
          <Plus size={16} className="mr-2" />
          {t("Add Service", "Adicionar Serviço")}
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hotel"></div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Icon", "Ícone")}</TableHead>
              <TableHead>{t("Title", "Título")}</TableHead>
              <TableHead>{t("Title (PT)", "Título (PT)")}</TableHead>
              <TableHead>{t("Price", "Preço")}</TableHead>
              <TableHead className="text-right">{t("Actions", "Ações")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
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
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(service)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingService 
                ? t("Edit Service", "Editar Serviço") 
                : t("Add New Service", "Adicionar Novo Serviço")}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="icon" className="font-medium text-sm">
                {t("Icon", "Ícone")} *
              </label>
              <select
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {icons.map((icon) => (
                  <option key={icon.name} value={icon.name}>
                    {icon.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="title" className="font-medium text-sm">
                    {t("Title (English)", "Título (Inglês)")} *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <label htmlFor="description" className="font-medium text-sm">
                    {t("Description (English)", "Descrição (Inglês)")} *
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="title_pt" className="font-medium text-sm">
                    {t("Title (Portuguese)", "Título (Português)")} *
                  </label>
                  <Input
                    id="title_pt"
                    name="title_pt"
                    value={formData.title_pt}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <label htmlFor="description_pt" className="font-medium text-sm">
                    {t("Description (Portuguese)", "Descrição (Português)")} *
                  </label>
                  <Textarea
                    id="description_pt"
                    name="description_pt"
                    rows={3}
                    value={formData.description_pt}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="price" className="font-medium text-sm">
                {t("Price (MZN)", "Preço (MZN)")}
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500">
                {t("Leave empty for services without a price", "Deixe vazio para serviços sem preço")}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              {t("Cancel", "Cancelar")}
            </Button>
            <Button onClick={handleSubmit}>
              {editingService 
                ? t("Update Service", "Atualizar Serviço") 
                : t("Add Service", "Adicionar Serviço")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
