
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Room, RoomFormData } from '@/types/room';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MediaUploader } from '@/components/admin/media/MediaUploader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RoomFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: RoomFormData) => Promise<void>;
  editingRoom: Room | null;
}

export const RoomFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  editingRoom
}: RoomFormDialogProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState<RoomFormData>({
    title: '',
    title_pt: '',
    description: '',
    description_pt: '',
    image: '',
    price: 0,
    capacity: '',
    capacity_pt: '',
    amenities: '',
    amenities_pt: '',
    media: [],
    videos: []
  });
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (editingRoom) {
      setFormData({
        title: editingRoom.title,
        title_pt: editingRoom.title_pt,
        description: editingRoom.description,
        description_pt: editingRoom.description_pt,
        image: editingRoom.image,
        price: editingRoom.price,
        capacity: editingRoom.capacity,
        capacity_pt: editingRoom.capacity_pt,
        amenities: editingRoom.amenities.join(', '),
        amenities_pt: editingRoom.amenities_pt.join(', '),
        media: editingRoom.media || [],
        videos: editingRoom.videos || []
      });
    } else {
      setFormData({
        title: '',
        title_pt: '',
        description: '',
        description_pt: '',
        image: '',
        price: 0,
        capacity: '',
        capacity_pt: '',
        amenities: '',
        amenities_pt: '',
        media: [],
        videos: []
      });
    }
    setActiveTab('details');
  }, [editingRoom, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? Number(value) : value
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
        !formData.title || 
        !formData.title_pt || 
        !formData.description || 
        !formData.description_pt || 
        !formData.image || 
        !formData.price || 
        !formData.capacity || 
        !formData.capacity_pt || 
        !formData.amenities || 
        !formData.amenities_pt
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingRoom 
              ? t("Edit Room", "Editar Quarto") 
              : t("Add New Room", "Adicionar Novo Quarto")}
          </DialogTitle>
        </DialogHeader>
        
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">{t("English", "Inglês")}</h3>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="title" className="font-medium text-sm">
                      {t("Title", "Título")} *
                    </label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="description" className="font-medium text-sm">
                      {t("Description", "Descrição")} *
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="capacity" className="font-medium text-sm">
                      {t("Capacity", "Capacidade")} *
                    </label>
                    <Input
                      id="capacity"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="e.g. 2 Adults"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="amenities" className="font-medium text-sm">
                      {t("Amenities", "Comodidades")} * {t("(comma separated)", "(separado por vírgulas)")}
                    </label>
                    <Textarea
                      id="amenities"
                      name="amenities"
                      value={formData.amenities}
                      onChange={handleInputChange}
                      placeholder="Free WiFi, Coffee Maker, Smart TV, Luxury Bathroom"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">{t("Portuguese", "Português")}</h3>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="title_pt" className="font-medium text-sm">
                      {t("Title", "Título")} *
                    </label>
                    <Input
                      id="title_pt"
                      name="title_pt"
                      value={formData.title_pt}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="description_pt" className="font-medium text-sm">
                      {t("Description", "Descrição")} *
                    </label>
                    <Textarea
                      id="description_pt"
                      name="description_pt"
                      rows={5}
                      value={formData.description_pt}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="capacity_pt" className="font-medium text-sm">
                      {t("Capacity", "Capacidade")} *
                    </label>
                    <Input
                      id="capacity_pt"
                      name="capacity_pt"
                      value={formData.capacity_pt}
                      onChange={handleInputChange}
                      placeholder="e.g. 2 Adultos"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="amenities_pt" className="font-medium text-sm">
                      {t("Amenities", "Comodidades")} * {t("(comma separated)", "(separado por vírgulas)")}
                    </label>
                    <Textarea
                      id="amenities_pt"
                      name="amenities_pt"
                      value={formData.amenities_pt}
                      onChange={handleInputChange}
                      placeholder="Wi-Fi Grátis, Cafeteira, Smart TV, Banheiro de Luxo"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="image" className="font-medium text-sm">
                  {t("Main Image URL", "URL da Imagem Principal")} *
                </label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="price" className="font-medium text-sm">
                  {t("Price per night", "Preço por noite")} (MZN) *
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="pt-4">
            <MediaUploader
              bucketName="room_media"
              folder={editingRoom ? editingRoom.id : 'new'}
              mediaList={formData.media || []}
              videoList={formData.videos || []}
              onImagesChange={handleMediaChange}
              onVideosChange={handleVideosChange}
              maxFiles={30}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("Cancel", "Cancelar")}
          </Button>
          <Button onClick={handleSubmit}>
            {editingRoom 
              ? t("Update Room", "Atualizar Quarto") 
              : t("Add Room", "Adicionar Quarto")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
