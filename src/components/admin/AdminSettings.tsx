
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const AdminSettings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  // Dados para simulação - em produção estes viriam do Supabase
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Hotel Villa Capricho',
      description: 'Luxurious beachfront hotel in Mozambique',
      description_pt: 'Hotel luxuoso à beira-mar em Moçambique',
      email: 'info@hotelvillacapricho.com',
      phone: '+258 84 123 4567',
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      bookingAlerts: true,
      marketingEmails: false
    },
    appearance: {
      logoUrl: 'https://example.com/logo.png',
      primaryColor: '#2563EB',
      footerText: '© 2025 Hotel Villa Capricho. All rights reserved.',
      footerText_pt: '© 2025 Hotel Villa Capricho. Todos os direitos reservados.'
    }
  });

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [name]: value
      }
    });
  };

  const handleNotificationChange = (name: string, checked: boolean) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [name]: checked
      }
    });
  };

  const handleAppearanceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [name]: value
      }
    });
  };

  const handleSave = () => {
    // Em produção, isso enviaria os dados ao Supabase
    toast({
      title: t("Settings Saved", "Configurações Salvas"),
      description: t("Your settings have been updated successfully.", "Suas configurações foram atualizadas com sucesso."),
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-hotel-text">{t("Settings", "Configurações")}</h1>
        <p className="text-gray-500">{t("Manage hotel system settings", "Gerencie as configurações do sistema do hotel")}</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="general">{t("General", "Geral")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("Notifications", "Notificações")}</TabsTrigger>
          <TabsTrigger value="appearance">{t("Appearance", "Aparência")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t("General Settings", "Configurações Gerais")}</CardTitle>
              <CardDescription>
                {t("Basic information about your hotel", "Informações básicas sobre seu hotel")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">{t("Hotel Name", "Nome do Hotel")}</Label>
                <Input 
                  id="siteName" 
                  name="siteName" 
                  value={settings.general.siteName} 
                  onChange={handleGeneralChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">{t("Description (English)", "Descrição (Inglês)")}</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={settings.general.description} 
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description_pt">{t("Description (Portuguese)", "Descrição (Português)")}</Label>
                <Textarea 
                  id="description_pt" 
                  name="description_pt" 
                  value={settings.general.description_pt} 
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("Contact Email", "Email de Contato")}</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={settings.general.email} 
                    onChange={handleGeneralChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("Contact Phone", "Telefone de Contato")}</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={settings.general.phone} 
                    onChange={handleGeneralChange} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t("Notification Settings", "Configurações de Notificações")}</CardTitle>
              <CardDescription>
                {t("Manage how you receive notifications", "Gerencie como você recebe notificações")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("Email Notifications", "Notificações por Email")}</p>
                  <p className="text-sm text-gray-500">
                    {t("Receive booking and contact notifications via email", "Receba notificações de reservas e contatos por email")}
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("SMS Notifications", "Notificações por SMS")}</p>
                  <p className="text-sm text-gray-500">
                    {t("Receive notifications via SMS", "Receba notificações por SMS")}
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications.smsNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("Booking Alerts", "Alertas de Reservas")}</p>
                  <p className="text-sm text-gray-500">
                    {t("Get notified when new bookings are made", "Receba notificações quando novas reservas forem feitas")}
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications.bookingAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('bookingAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("Marketing Emails", "Emails de Marketing")}</p>
                  <p className="text-sm text-gray-500">
                    {t("Send promotional emails to past guests", "Envie emails promocionais para antigos hóspedes")}
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications.marketingEmails}
                  onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>{t("Appearance Settings", "Configurações de Aparência")}</CardTitle>
              <CardDescription>
                {t("Customize how your hotel website looks", "Personalize a aparência do site do seu hotel")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logoUrl">{t("Logo URL", "URL do Logo")}</Label>
                <Input 
                  id="logoUrl" 
                  name="logoUrl" 
                  value={settings.appearance.logoUrl} 
                  onChange={handleAppearanceChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primaryColor">{t("Primary Color", "Cor Primária")}</Label>
                <div className="flex gap-2">
                  <Input 
                    id="primaryColor" 
                    name="primaryColor" 
                    value={settings.appearance.primaryColor} 
                    onChange={handleAppearanceChange}
                  />
                  <div 
                    className="w-10 h-10 rounded border" 
                    style={{ backgroundColor: settings.appearance.primaryColor }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="footerText">{t("Footer Text (English)", "Texto do Rodapé (Inglês)")}</Label>
                <Input 
                  id="footerText" 
                  name="footerText" 
                  value={settings.appearance.footerText} 
                  onChange={handleAppearanceChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="footerText_pt">{t("Footer Text (Portuguese)", "Texto do Rodapé (Português)")}</Label>
                <Input 
                  id="footerText_pt" 
                  name="footerText_pt" 
                  value={settings.appearance.footerText_pt} 
                  onChange={handleAppearanceChange} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave}>
          {t("Save Settings", "Salvar Configurações")}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
