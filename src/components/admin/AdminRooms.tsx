
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Json } from '@/integrations/supabase/types';

type Room = {
  id: string;
  title: string;
  title_pt: string;
  description: string;
  description_pt: string;
  image: string;
  price: number;
  capacity: string;
  capacity_pt: string;
  amenities: string[];
  amenities_pt: string[];
};

const AdminRooms = () => {
  const { t } = useLanguage();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    title_pt: '',
    description: '',
    description_pt: '',
    image: '',
    price: 0,
    capacity: '',
    capacity_pt: '',
    amenities: '',
    amenities_pt: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match the Room type
      const transformedRooms = data?.map(room => ({
        ...room,
        amenities: Array.isArray(room.amenities) ? room.amenities : [String(room.amenities)],
        amenities_pt: Array.isArray(room.amenities_pt) ? room.amenities_pt : [String(room.amenities_pt)]
      })) || [];
      
      setRooms(transformedRooms);
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
      [name]: name === 'price' ? Number(value) : value
    });
  };

  const openAddDialog = () => {
    setEditingRoom(null);
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
      amenities_pt: ''
    });
    setShowDialog(true);
  };

  const openEditDialog = (room: Room) => {
    setEditingRoom(room);
    setFormData({
      title: room.title,
      title_pt: room.title_pt,
      description: room.description,
      description_pt: room.description_pt,
      image: room.image,
      price: room.price,
      capacity: room.capacity,
      capacity_pt: room.capacity_pt,
      amenities: room.amenities.join(', '),
      amenities_pt: room.amenities_pt.join(', ')
    });
    setShowDialog(true);
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

      const roomData = {
        title: formData.title,
        title_pt: formData.title_pt,
        description: formData.description,
        description_pt: formData.description_pt,
        image: formData.image,
        price: formData.price,
        capacity: formData.capacity,
        capacity_pt: formData.capacity_pt,
        amenities: formData.amenities.split(',').map(item => item.trim()),
        amenities_pt: formData.amenities_pt.split(',').map(item => item.trim())
      };

      if (editingRoom) {
        // Update existing room
        const { error } = await supabase
          .from('rooms')
          .update(roomData)
          .eq('id', editingRoom.id);

        if (error) throw error;
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Room updated successfully", "Quarto atualizado com sucesso"),
        });
      } else {
        // Add new room
        const { error } = await supabase
          .from('rooms')
          .insert([roomData]);

        if (error) throw error;
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Room added successfully", "Quarto adicionado com sucesso"),
        });
      }

      setShowDialog(false);
      fetchRooms();
    } catch (error: any) {
      toast({
        title: t("Error", "Erro"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(t("Are you sure you want to delete this room?", "Tem certeza de que deseja excluir este quarto?"))) {
      try {
        const { error } = await supabase
          .from('rooms')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Room deleted successfully", "Quarto excluído com sucesso"),
        });
        
        fetchRooms();
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
        <h1 className="text-2xl font-bold text-hotel-text">{t("Room Management", "Gerenciamento de Quartos")}</h1>
        <Button onClick={openAddDialog}>
          <Plus size={16} className="mr-2" />
          {t("Add Room", "Adicionar Quarto")}
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
              <TableHead>{t("Image", "Imagem")}</TableHead>
              <TableHead>{t("Title", "Título")}</TableHead>
              <TableHead>{t("Price", "Preço")}</TableHead>
              <TableHead>{t("Capacity", "Capacidade")}</TableHead>
              <TableHead className="text-right">{t("Actions", "Ações")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  {t("No rooms found", "Nenhum quarto encontrado")}
                </TableCell>
              </TableRow>
            ) : (
              rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>
                    <img src={room.image} alt={room.title} className="w-16 h-12 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{room.title}</TableCell>
                  <TableCell>${room.price}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(room)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(room.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
      
      {/* Add/Edit Room Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingRoom 
                ? t("Edit Room", "Editar Quarto") 
                : t("Add New Room", "Adicionar Novo Quarto")}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
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
          
          <div className="space-y-4 pt-2">
            <div className="flex flex-col space-y-2">
              <label htmlFor="image" className="font-medium text-sm">
                {t("Image URL", "URL da Imagem")} *
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
                {t("Price per night", "Preço por noite")} ($) *
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
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
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
    </div>
  );
};

export default AdminRooms;
