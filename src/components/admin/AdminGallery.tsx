import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Pencil, Trash2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { MediaUploader } from '@/components/admin/media/MediaUploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type GalleryImage = {
  id: string;
  url: string;
  category: string;
  title: string;
  title_pt: string;
};

const AdminGallery = () => {
  const { t } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    url: '',
    category: 'rooms',
    title: '',
    title_pt: '',
    media: [] as string[],
    videos: [] as string[]
  });
  const { toast } = useToast();

  const categories = [
    { value: 'rooms', label: t('Rooms', 'Quartos') },
    { value: 'dining', label: t('Dining', 'Restaurante') },
    { value: 'meeting', label: t('Meeting Room', 'Sala de Reunião') },
    { value: 'pool', label: t('Pool', 'Piscina') },
    { value: 'misc', label: t('Miscellaneous', 'Diversos') }
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setImages(data || []);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openAddDialog = () => {
    setEditingImage(null);
    setFormData({
      url: '',
      category: 'rooms',
      title: '',
      title_pt: '',
      media: [],
      videos: []
    });
    setActiveTab('details');
    setShowDialog(true);
  };

  const openEditDialog = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      url: image.url,
      category: image.category,
      title: image.title,
      title_pt: image.title_pt,
      media: [],
      videos: []
    });
    setActiveTab('details');
    setShowDialog(true);
  };

  const handleSubmit = async () => {
    try {
      const finalUrl = formData.media.length > 0 ? formData.media[0] : formData.url;
      
      if (!finalUrl || !formData.category || !formData.title || !formData.title_pt) {
        toast({
          title: t("Error", "Erro"),
          description: t("Please fill in all required fields", "Por favor, preencha todos os campos obrigatórios"),
          variant: "destructive",
        });
        return;
      }

      const imageData = {
        url: finalUrl,
        category: formData.category,
        title: formData.title,
        title_pt: formData.title_pt
      };

      if (editingImage) {
        const { error } = await supabase
          .from('gallery')
          .update(imageData)
          .eq('id', editingImage.id);

        if (error) throw error;
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Image updated successfully", "Imagem atualizada com sucesso"),
        });
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert([imageData]);

        if (error) throw error;
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Image added successfully", "Imagem adicionada com sucesso"),
        });
      }

      setShowDialog(false);
      fetchImages();
    } catch (error: any) {
      toast({
        title: t("Error", "Erro"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(t("Are you sure you want to delete this image?", "Tem certeza de que deseja excluir esta imagem?"))) {
      try {
        const { error } = await supabase
          .from('gallery')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Image deleted successfully", "Imagem excluída com sucesso"),
        });
        
        fetchImages();
      } catch (error: any) {
        toast({
          title: t("Error", "Erro"),
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleMediaChange = (urls: string[]) => {
    setFormData(prev => ({
      ...prev,
      media: urls,
      url: urls[0] || prev.url
    }));
  };

  const handleVideoChange = (urls: string[]) => {
    setFormData(prev => ({
      ...prev,
      videos: urls
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-hotel-text">{t("Gallery Management", "Gerenciamento da Galeria")}</h1>
        <Button onClick={openAddDialog}>
          <Plus size={16} className="mr-2" />
          {t("Add Image", "Adicionar Imagem")}
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hotel"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {images.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-gray-500 border border-dashed rounded-lg">
              {t("No images found", "Nenhuma imagem encontrada")}
            </div>
          ) : (
            images.map((image) => (
              <div 
                key={image.id} 
                className="relative overflow-hidden rounded-lg shadow-md group"
              >
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-white" onClick={() => openEditDialog(image)}>
                      <Pencil size={16} />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white" onClick={() => handleDelete(image.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <h3 className="font-medium text-hotel-text">{image.title}</h3>
                  <p className="text-sm text-gray-500 capitalize">{image.category}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingImage 
                ? t("Edit Gallery Image", "Editar Imagem da Galeria") 
                : t("Add New Gallery Image", "Adicionar Nova Imagem à Galeria")}
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
            
            <TabsContent value="details">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="title">{t("Title (English)", "Título (Inglês)")} *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="title_pt">{t("Title (Portuguese)", "Título (Português)")} *</Label>
                  <Input
                    id="title_pt"
                    name="title_pt"
                    value={formData.title_pt}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="category">{t("Category", "Categoria")} *</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
                
                {formData.media.length === 0 && (
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="url">{t("Image URL", "URL da Imagem")} *</Label>
                    <Input
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="media">
              <MediaUploader
                bucketName="gallery_media"
                folder={editingImage ? editingImage.id : 'new'}
                mediaList={formData.media}
                videoList={formData.videos}
                onImagesChange={handleMediaChange}
                onVideosChange={handleVideoChange}
                maxFiles={30}
              />
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              {t("Cancel", "Cancelar")}
            </Button>
            <Button onClick={handleSubmit}>
              {editingImage 
                ? t("Update Image", "Atualizar Imagem") 
                : t("Add Image", "Adicionar Imagem")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;
