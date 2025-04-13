
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MediaUploader } from '@/components/admin/media/MediaUploader';
import { Service } from '@/types/room';

// Icons data
export const icons = [
  { name: 'Utensils', component: <Utensils size={20} /> },
  { name: 'Wine', component: <Wine size={20} /> },
  { name: 'ShowerHead', component: <ShowerHead size={20} /> },
  { name: 'Users', component: <Users size={20} /> },
  { name: 'Pool', component: <Waves size={20} /> },
  { name: 'DollarSign', component: <DollarSign size={20} /> }
];

import { Utensils, Wine, ShowerHead, Users, Waves, DollarSign } from 'lucide-react';

type ServiceFormProps = {
  editingService: Service | null;
  onSubmit: (formData: ServiceFormData) => Promise<void>;
  onCancel: () => void;
};

export type ServiceFormData = {
  icon: string;
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
  price: string;
  media: string[];
  videos: string[];
};

export const ServiceForm = ({ editingService, onSubmit, onCancel }: ServiceFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState<ServiceFormData>({
    icon: editingService?.icon || 'Utensils',
    title: editingService?.title || '',
    title_pt: editingService?.title_pt || '',
    description: editingService?.description || '',
    description_pt: editingService?.description_pt || '',
    price: editingService?.price?.toString() || '',
    media: editingService?.media || [],
    videos: editingService?.videos || []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMediaChange = (urls: string[]) => {
    setFormData({
      ...formData,
      media: urls
    });
  };

  const handleVideosChange = (urls: string[]) => {
    setFormData({
      ...formData,
      videos: urls
    });
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
      
      await onSubmit(formData);
    } catch (error: any) {
      toast({
        title: t("Error", "Erro"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="details" className="flex-1">
            {t("Details", "Detalhes")}
          </TabsTrigger>
          <TabsTrigger value="media" className="flex-1">
            {t("Media", "Mídia")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="pt-4">
          <div className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="media" className="pt-4">
          <MediaUploader
            bucketName="service_media"
            folder={editingService ? editingService.id : 'new'}
            mediaList={formData.media}
            videoList={formData.videos}
            onImagesChange={handleMediaChange}
            onVideosChange={handleVideosChange}
            maxFiles={30}
          />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={onCancel}>
          {t("Cancel", "Cancelar")}
        </Button>
        <Button onClick={handleSubmit}>
          {editingService 
            ? t("Update Service", "Atualizar Serviço") 
            : t("Add Service", "Adicionar Serviço")}
        </Button>
      </div>
    </div>
  );
};
