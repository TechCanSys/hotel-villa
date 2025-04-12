
import { useLanguage } from '@/contexts/LanguageContext';
import { Room } from '@/types/room';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';

interface RoomListProps {
  rooms: Room[];
  isLoading: boolean;
  onEdit: (room: Room) => void;
  onDelete: (id: string) => void;
}

export const RoomList = ({ rooms, isLoading, onEdit, onDelete }: RoomListProps) => {
  const { t } = useLanguage();

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
                <Button variant="ghost" size="sm" onClick={() => onEdit(room)}>
                  <Pencil size={16} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(room.id)}>
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
