
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Room, RoomFormData } from '@/types/room';
import { RoomList } from './rooms/RoomList';
import { RoomFormDialog } from './rooms/RoomFormDialog';
import { fetchRooms, createRoom, updateRoom, deleteRoom } from '@/services/roomService';

const AdminRooms = () => {
  const { t } = useLanguage();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const data = await fetchRooms();
      setRooms(data);
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
    setEditingRoom(null);
    setShowDialog(true);
  };

  const openEditDialog = (room: Room) => {
    setEditingRoom(room);
    setShowDialog(true);
  };

  const handleSubmit = async (formData: RoomFormData) => {
    try {
      if (editingRoom) {
        await updateRoom(editingRoom.id, formData);
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Room updated successfully", "Quarto atualizado com sucesso"),
        });
      } else {
        await createRoom(formData);
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Room added successfully", "Quarto adicionado com sucesso"),
        });
      }

      setShowDialog(false);
      loadRooms();
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
        await deleteRoom(id);
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Room deleted successfully", "Quarto excluído com sucesso"),
        });
        
        loadRooms();
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
      
      <RoomList 
        rooms={rooms} 
        isLoading={isLoading} 
        onEdit={openEditDialog} 
        onDelete={handleDelete} 
      />
      
      <RoomFormDialog 
        open={showDialog} 
        onOpenChange={setShowDialog} 
        onSubmit={handleSubmit} 
        editingRoom={editingRoom} 
      />
    </div>
  );
};

export default AdminRooms;
