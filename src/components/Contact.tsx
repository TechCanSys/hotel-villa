import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t("Missing Information", "Informação em Falta"),
        description: t("Please fill in all required fields", "Por favor, preencha todos os campos obrigatórios"),
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would send the data to a server
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send email notification
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject || 'Booking Inquiry'}
Message: ${formData.message}
      `;
      
      console.log("Would send email to: reservas@hotelvillacapricho.pt, cc: dilerwebapp@gmail.com");
      console.log("Email content:", emailBody);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast({
        title: t("Message Sent", "Mensagem Enviada"),
        description: t("Thank you for your message. We'll get back to you soon!", "Obrigado pela sua mensagem. Entraremos em contato em breve!"),
      });
    } catch (error) {
      toast({
        title: t("Error", "Erro"),
        description: t("There was an error sending your message. Please try again.", "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-hotel-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="text-hotel uppercase tracking-widest text-sm font-medium mb-4 block">
              {t("Get In Touch", "Entre em Contato")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hotel-text">
              {t("Contact Us", "Contate-nos")}
            </h2>
            <p className="text-gray-600 mb-8">
              {t(
                "Have questions or want to make a reservation? Our friendly team is here to assist you. Reach out to us through any of the contact methods below.",
                "Tem perguntas ou deseja fazer uma reserva? Nossa equipe está aqui para ajudá-lo. Entre em contato conosco através de qualquer um dos métodos abaixo."
              )}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-hotel/10 text-hotel rounded-full">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-hotel-text mb-1">{t("Address", "Endereço")}</h3>
                  <p className="text-gray-600">Moamba, Maputo, Mozambique</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-hotel/10 text-hotel rounded-full">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-hotel-text mb-1">{t("Phone", "Telefone")}</h3>
                  <p className="text-gray-600">+258 84 031 7375</p>
                  <p className="text-gray-600">+258 85 760 4763</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-hotel/10 text-hotel rounded-full">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-hotel-text mb-1">{t("Email", "Email")}</h3>
                  <p className="text-gray-600">info@villacapricho.pt</p>
                  <p className="text-gray-600">reservas@hotelvillacapricho.pt</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-hotel/10 text-hotel rounded-full">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-hotel-text mb-1">{t("Working Hours", "Horário de Funcionamento")}</h3>
                  <p className="text-gray-600">{t("Reception", "Recepção")}: 24/7</p>
                  <p className="text-gray-600">{t("Check-out", "Check-out")}: 11:00 AM</p>
                  <p className="text-gray-600">{t("Check-in", "Check-in")}: {t("No time limit", "Sem limite de horário")}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-hotel-text">{t("Send Us a Message", "Envie-nos uma Mensagem")}</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("Your Name", "Seu Nome")} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel"
                      placeholder={t("John Doe", "João Silva")}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("Your Email", "Seu Email")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("Subject", "Assunto")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel"
                    placeholder={t("Booking inquiry", "Consulta de reserva")}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("Message", "Mensagem")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel"
                    placeholder={t("Your message here...", "Sua mensagem aqui...")}
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full p-3 bg-hotel hover:bg-hotel-dark text-white font-medium rounded-md transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 
                    t("Sending...", "Enviando...") : 
                    t("Send Message", "Enviar Mensagem")
                  }
                </button>
              </form>
            </div>
          </div>
          
          <div className="lg:col-span-2 mt-8">
            <h3 className="text-2xl font-bold text-hotel-text mb-6">{t("Nossa Localização", "Our Location")}</h3>
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
