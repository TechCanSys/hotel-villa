
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface PricingItem {
  id: string;
  name: string;
  name_pt: string;
  price: number;
  description: string;
  description_pt: string;
}

const AdminPricing = () => {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<PricingItem[]>([]);
  const [editItem, setEditItem] = useState<PricingItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Fetch room data from Supabase
      const { data: roomsData, error: roomsError } = await supabase
        .from('rooms')
        .select('id, title, title_pt, price, description, description_pt');
      
      if (roomsError) {
        throw roomsError;
      }
      
      // Transform room data to pricing items format
      const pricingItems = roomsData.map(room => ({
        id: room.id,
        name: room.title,
        name_pt: room.title_pt,
        price: room.price,
        description: room.description,
        description_pt: room.description_pt
      }));
      
      setItems(pricingItems);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: t("Error", "Erro"),
        description: t("Failed to load pricing data", "Falha ao carregar dados de preços"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: PricingItem) => {
    setEditItem({...item});
  };

  const handleSave = async () => {
    if (!editItem) return;
    
    try {
      // Update the room price in Supabase
      const { error } = await supabase
        .from('rooms')
        .update({ price: editItem.price })
        .eq('id', editItem.id);
      
      if (error) throw error;
      
      // Update local state
      setItems(prev => prev.map(item => 
        item.id === editItem.id ? editItem : item
      ));
      
      toast({
        title: t("Price Update", "Atualização de Preço"),
        description: t("Price updated successfully", "Preço atualizado com sucesso")
      });
      
      setEditItem(null);
    } catch (error) {
      console.error('Error updating price:', error);
      toast({
        title: t("Error", "Erro"),
        description: t("Failed to update price", "Falha ao atualizar preço"),
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editItem) return;
    
    const { name, value } = e.target;
    setEditItem({
      ...editItem,
      [name]: name === 'price' ? Number(value) : value
    });
  };

  const handleCancel = () => {
    setEditItem(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-hotel" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-hotel-text">
          {t("Pricing Management", "Gerenciamento de Preços")}
        </h1>
        <p className="text-gray-500">
          {t("Manage room and service pricing", "Gerencie preços de quartos e serviços")}
        </p>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{language === 'en' ? item.name : item.name_pt}</CardTitle>
              <CardDescription>{language === 'en' ? item.description : item.description_pt}</CardDescription>
            </CardHeader>
            <CardContent>
              {editItem && editItem.id === item.id ? (
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    name="price"
                    value={editItem.price}
                    onChange={handleChange}
                    className="w-32"
                  />
                  <span className="font-medium">MZN</span>
                  <div className="ml-auto space-x-2">
                    <Button variant="outline" onClick={handleCancel}>
                      {t("Cancel", "Cancelar")}
                    </Button>
                    <Button onClick={handleSave}>
                      {t("Save", "Salvar")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-2xl font-bold">{item.price.toLocaleString('pt-MZ')}</span>
                  <span className="ml-1 text-gray-500">MZN</span>
                  <Button 
                    variant="outline" 
                    className="ml-auto"
                    onClick={() => handleEdit(item)}
                  >
                    {t("Edit", "Editar")}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPricing;
