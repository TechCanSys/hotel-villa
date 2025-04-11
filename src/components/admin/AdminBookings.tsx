
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { enUS, pt } from 'date-fns/locale';

type Booking = {
  id: string;
  checkin_date: string;
  checkout_date: string;
  guests: string;
  room_type: string;
  name: string;
  email: string;
  phone: string;
  special_requests: string;
  status: string;
  created_at: string;
};

const AdminBookings = () => {
  const { language, t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setBookings(data || []);
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

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: t("Success", "Sucesso"),
        description: t("Booking status updated successfully", "Status da reserva atualizado com sucesso"),
      });
      
      fetchBookings();
    } catch (error: any) {
      toast({
        title: t("Error", "Erro"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(t("Are you sure you want to delete this booking?", "Tem certeza de que deseja excluir esta reserva?"))) {
      try {
        const { error } = await supabase
          .from('bookings')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: t("Success", "Sucesso"),
          description: t("Booking deleted successfully", "Reserva excluída com sucesso"),
        });
        
        fetchBookings();
      } catch (error: any) {
        toast({
          title: t("Error", "Erro"),
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'PP', { locale: language === 'en' ? enUS : pt });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    let className = "px-2 py-1 text-xs rounded-full ";
    
    switch (status) {
      case 'confirmed':
        className += "bg-green-100 text-green-800";
        break;
      case 'cancelled':
        className += "bg-red-100 text-red-800";
        break;
      case 'pending':
      default:
        className += "bg-yellow-100 text-yellow-800";
        break;
    }
    
    return (
      <span className={className}>
        {status === 'confirmed' ? t("Confirmed", "Confirmado") : 
         status === 'cancelled' ? t("Cancelled", "Cancelado") : 
         t("Pending", "Pendente")}
      </span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-hotel-text">{t("Booking Management", "Gerenciamento de Reservas")}</h1>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hotel"></div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Name", "Nome")}</TableHead>
              <TableHead>{t("Room Type", "Tipo de Quarto")}</TableHead>
              <TableHead>{t("Check-in", "Check-in")}</TableHead>
              <TableHead>{t("Check-out", "Check-out")}</TableHead>
              <TableHead>{t("Status", "Status")}</TableHead>
              <TableHead className="text-right">{t("Actions", "Ações")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                  {t("No bookings found", "Nenhuma reserva encontrada")}
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.name}</TableCell>
                  <TableCell>{booking.room_type}</TableCell>
                  <TableCell>{formatDate(booking.checkin_date)}</TableCell>
                  <TableCell>{formatDate(booking.checkout_date)}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowDetailsDialog(true);
                      }}
                    >
                      <Eye size={16} />
                    </Button>
                    {booking.status === 'pending' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                        >
                          <Check size={16} className="text-green-600" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                        >
                          <X size={16} className="text-red-600" />
                        </Button>
                      </>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(booking.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
      
      {/* Booking Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Booking Details", "Detalhes da Reserva")}</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedBooking.name}</h3>
                {getStatusBadge(selectedBooking.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t("Email", "Email")}</p>
                  <p>{selectedBooking.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t("Phone", "Telefone")}</p>
                  <p>{selectedBooking.phone || t("Not provided", "Não fornecido")}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t("Room Type", "Tipo de Quarto")}</p>
                  <p>{selectedBooking.room_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t("Guests", "Hóspedes")}</p>
                  <p>{selectedBooking.guests}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t("Check-in Date", "Data de Check-in")}</p>
                  <p>{formatDate(selectedBooking.checkin_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t("Check-out Date", "Data de Check-out")}</p>
                  <p>{formatDate(selectedBooking.checkout_date)}</p>
                </div>
              </div>
              
              {selectedBooking.special_requests && (
                <div>
                  <p className="text-sm text-gray-500">{t("Special Requests", "Pedidos Especiais")}</p>
                  <p className="p-3 bg-gray-50 rounded-md mt-1">{selectedBooking.special_requests}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-gray-500">{t("Booking Date", "Data da Reserva")}</p>
                <p>{formatDate(selectedBooking.created_at)}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {selectedBooking && selectedBooking.status === 'pending' && (
              <div className="flex space-x-2 mr-auto">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleStatusUpdate(selectedBooking.id, 'confirmed');
                    setShowDetailsDialog(false);
                  }}
                  className="border-green-500 text-green-600 hover:bg-green-50"
                >
                  <Check size={16} className="mr-2" />
                  {t("Confirm", "Confirmar")}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleStatusUpdate(selectedBooking.id, 'cancelled');
                    setShowDetailsDialog(false);
                  }}
                  className="border-red-500 text-red-600 hover:bg-red-50"
                >
                  <X size={16} className="mr-2" />
                  {t("Cancel", "Cancelar")}
                </Button>
              </div>
            )}
            <Button onClick={() => setShowDetailsDialog(false)}>
              {t("Close", "Fechar")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
