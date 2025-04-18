
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
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<PricingItem[]>([]);
  const [editItem, setEditItem] = useState<PricingItem | null>(null);
  const { toast } = useToast();

  // Dados de exemplo para simulação - em um ambiente de produção, estes viriam do Supabase
  const dummyData: PricingItem[] = [
    {
      id: '1',
      name: 'Standard Room Price',
      name_pt: 'Preço do Quarto Standard',
      price: 1500,
      description: 'Base price for standard room',
      description_pt: 'Preço base para quarto standard'
    },
    {
      id: '2',
      name: 'Deluxe Room Price',
      name_pt: 'Preço do Quarto Deluxe',
      price: 2500,
      description: 'Base price for deluxe room',
      description_pt: 'Preço base para quarto deluxe'
    },
    {
      id: '3',
      name: 'Suite Price',
      name_pt: 'Preço da Suite',
      price: 3500,
      description: 'Base price for suite',
      description_pt: 'Preço base para suite'
    }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Simulação de carregamento - em ambiente de produção, 
    // isso buscaria dados reais do Supabase
    setIsLoading(true);
    setTimeout(() => {
      setItems(dummyData);
      setIsLoading(false);
    }, 1000);
  };

  const handleEdit = (item: PricingItem) => {
    setEditItem({...item});
  };

  const handleSave = () => {
    if (!editItem) return;
    
    // Update items with the edited item
    setItems(prev => prev.map(item => 
      item.id === editItem.id ? editItem : item
    ));
    
    // Fix: Call toast with the correct format
    toast({
      title: t("Price Update", "Atualização de Preço"),
      description: t("Price updated successfully", "Preço atualizado com sucesso")
    });
    
    setEditItem(null);
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
              <CardTitle>{t("language") === 'en' ? item.name : item.name_pt}</CardTitle>
              <CardDescription>{t("language") === 'en' ? item.description : item.description_pt}</CardDescription>
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
