
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminLogin } from '@/hooks/useSupabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, LogIn } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAdminLogin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: t("Error", "Erro"),
        description: t("Please fill in all fields", "Por favor, preencha todos os campos"),
        variant: "destructive",
      });
      return;
    }
    
    const success = await login(email, password);
    if (success) {
      toast({
        title: t("Success", "Sucesso"),
        description: t("You have been logged in successfully", "Você foi logado com sucesso"),
      });
      navigate('/admin/dashboard');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={handleGoBack}
              className="flex items-center text-gray-600 hover:text-hotel"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> 
              {t("Back to Site", "Voltar ao Site")}
            </Button>
            <CardTitle className="text-2xl font-extrabold text-gray-900">
              {t("Admin Login", "Login de Administrador")}
            </CardTitle>
          </div>
          <CardDescription>
            {t("Sign in to access the admin dashboard", "Faça login para acessar o painel de administração")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  {t("Email address", "Endereço de email")}
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-hotel focus:border-hotel focus:z-10 sm:text-sm"
                  placeholder="admin@hotelvillacapricho.pt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t("Password", "Senha")}
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-hotel focus:border-hotel focus:z-10 sm:text-sm"
                  placeholder="Admin2024!"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-hotel hover:bg-hotel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hotel"
              disabled={isLoading}
            >
              <LogIn className="mr-2 h-4 w-4" />
              {isLoading ? t("Signing in...", "Entrando...") : t("Sign in", "Entrar")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-xs text-gray-500">
          {t("Hotel Villa Capricho Admin Panel", "Painel de Administração do Hotel Villa Capricho")}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
