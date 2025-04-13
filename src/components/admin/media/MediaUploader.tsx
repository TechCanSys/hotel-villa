
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Film, X, Upload, Trash2 } from 'lucide-react';
import { useFileUpload } from '@/hooks/useSupabase';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface MediaUploaderProps {
  bucketName: 'room_media' | 'service_media';
  folder: string;
  mediaList: string[];
  videoList: string[];
  onImagesChange: (urls: string[]) => void;
  onVideosChange: (urls: string[]) => void;
  maxFiles?: number;
}

export const MediaUploader = ({
  bucketName,
  folder,
  mediaList = [],
  videoList = [],
  onImagesChange,
  onVideosChange,
  maxFiles = 30
}: MediaUploaderProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { uploadMultipleFiles, deleteFile, isUploading } = useFileUpload(bucketName);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  const [uploadType, setUploadType] = useState<'image' | 'video' | 'url'>('image');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const fileArray = Array.from(files);
    const totalCurrentFiles = type === 'image' ? mediaList.length : videoList.length;
    
    if (totalCurrentFiles + fileArray.length > maxFiles) {
      toast({
        title: t("Too many files", "Muitos arquivos"),
        description: t(
          `You can only upload a maximum of ${maxFiles} ${type}s`,
          `Você só pode enviar no máximo ${maxFiles} ${type === 'image' ? 'imagens' : 'vídeos'}`
        ),
        variant: "destructive"
      });
      return;
    }
    
    // Validate file types
    const validFileTypes = type === 'image' 
      ? ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      : ['video/mp4', 'video/webm', 'video/quicktime'];
      
    const invalidFiles = fileArray.filter(file => !validFileTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        title: t("Invalid file type", "Tipo de arquivo inválido"),
        description: t(
          `Please upload only ${type === 'image' ? 'images' : 'videos'}`,
          `Por favor, envie apenas ${type === 'image' ? 'imagens' : 'vídeos'}`
        ),
        variant: "destructive"
      });
      return;
    }
    
    // Validate file sizes (10MB for images, 100MB for videos)
    const maxSize = type === 'image' ? 10 * 1024 * 1024 : 100 * 1024 * 1024;
    const oversizedFiles = fileArray.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      toast({
        title: t("File too large", "Arquivo muito grande"),
        description: t(
          `Files must be less than ${type === 'image' ? '10MB' : '100MB'}`,
          `Os arquivos devem ter menos de ${type === 'image' ? '10MB' : '100MB'}`
        ),
        variant: "destructive"
      });
      return;
    }
    
    const urls = await uploadMultipleFiles(fileArray, folder);
    
    if (urls.length > 0) {
      if (type === 'image') {
        onImagesChange([...mediaList, ...urls]);
      } else {
        onVideosChange([...videoList, ...urls]);
      }
      
      toast({
        title: t("Upload successful", "Upload bem-sucedido"),
        description: t(
          `${urls.length} ${type}${urls.length > 1 ? 's' : ''} uploaded successfully`,
          `${urls.length} ${type === 'image' ? 'imagem' : 'vídeo'}${urls.length > 1 ? 'ns' : ''} enviado${urls.length > 1 ? 's' : ''} com sucesso`
        )
      });
    }
    
    // Reset the file input
    if (type === 'image' && fileInputRef.current) {
      fileInputRef.current.value = '';
    } else if (type === 'video' && videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };
  
  const handleUrlAdd = (type: 'image' | 'video') => {
    const url = type === 'image' ? imageUrl : videoUrl;
    
    if (!url) {
      toast({
        title: t("Empty URL", "URL vazia"),
        description: t("Please enter a valid URL", "Por favor, insira uma URL válida"),
        variant: "destructive"
      });
      return;
    }
    
    // Basic URL validation
    try {
      new URL(url);
    } catch (e) {
      toast({
        title: t("Invalid URL", "URL inválida"),
        description: t("Please enter a valid URL", "Por favor, insira uma URL válida"),
        variant: "destructive"
      });
      return;
    }
    
    if (type === 'image') {
      onImagesChange([...mediaList, url]);
      setImageUrl('');
    } else {
      onVideosChange([...videoList, url]);
      setVideoUrl('');
    }
  };
  
  const handleDelete = async (url: string, type: 'image' | 'video') => {
    if (confirm(t("Are you sure you want to delete this file?", "Tem certeza de que deseja excluir este arquivo?"))) {
      // Check if it's a Supabase URL (contains bucketName)
      const isSupabaseUrl = url.includes(bucketName);
      
      if (isSupabaseUrl) {
        const success = await deleteFile(url);
        if (!success) return;
      }
      
      if (type === 'image') {
        onImagesChange(mediaList.filter(item => item !== url));
      } else {
        onVideosChange(videoList.filter(item => item !== url));
      }
      
      toast({
        title: t("File deleted", "Arquivo excluído"),
        description: t("The file has been deleted", "O arquivo foi excluído")
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button 
          type="button" 
          variant={uploadType === 'image' ? 'default' : 'outline'} 
          onClick={() => setUploadType('image')}
        >
          <Image size={16} className="mr-2" />
          {t("Upload Images", "Enviar Imagens")}
        </Button>
        <Button 
          type="button" 
          variant={uploadType === 'video' ? 'default' : 'outline'} 
          onClick={() => setUploadType('video')}
        >
          <Film size={16} className="mr-2" />
          {t("Upload Videos", "Enviar Vídeos")}
        </Button>
        <Button 
          type="button" 
          variant={uploadType === 'url' ? 'default' : 'outline'} 
          onClick={() => setUploadType('url')}
        >
          <Upload size={16} className="mr-2" />
          {t("Add URL", "Adicionar URL")}
        </Button>
      </div>
      
      {uploadType === 'image' && (
        <div>
          <input 
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            onChange={e => handleFileSelect(e, 'image')}
            className="hidden"
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || mediaList.length >= maxFiles}
          >
            <Image size={16} className="mr-2" />
            {isUploading ? t("Uploading...", "Enviando...") : t("Select Images", "Selecionar Imagens")}
          </Button>
          <p className="text-xs text-gray-500 mt-1">
            {t(
              `${mediaList.length}/${maxFiles} images uploaded. Max size: 10MB per image.`,
              `${mediaList.length}/${maxFiles} imagens enviadas. Tamanho máximo: 10MB por imagem.`
            )}
          </p>
        </div>
      )}
      
      {uploadType === 'video' && (
        <div>
          <input 
            type="file"
            ref={videoInputRef}
            multiple
            accept="video/*"
            onChange={e => handleFileSelect(e, 'video')}
            className="hidden"
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => videoInputRef.current?.click()}
            disabled={isUploading || videoList.length >= maxFiles}
          >
            <Film size={16} className="mr-2" />
            {isUploading ? t("Uploading...", "Enviando...") : t("Select Videos", "Selecionar Vídeos")}
          </Button>
          <p className="text-xs text-gray-500 mt-1">
            {t(
              `${videoList.length}/${maxFiles} videos uploaded. Max size: 100MB per video.`,
              `${videoList.length}/${maxFiles} vídeos enviados. Tamanho máximo: 100MB por vídeo.`
            )}
          </p>
        </div>
      )}
      
      {uploadType === 'url' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="image-url" className="text-sm font-medium">
              {t("Image URL", "URL da Imagem")}
            </label>
            <div className="flex space-x-2">
              <input 
                id="image-url"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
              />
              <Button 
                type="button" 
                onClick={() => handleUrlAdd('image')}
                disabled={mediaList.length >= maxFiles}
              >
                {t("Add", "Adicionar")}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="video-url" className="text-sm font-medium">
              {t("Video URL", "URL do Vídeo")}
            </label>
            <div className="flex space-x-2">
              <input 
                id="video-url"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
              />
              <Button 
                type="button" 
                onClick={() => handleUrlAdd('video')}
                disabled={videoList.length >= maxFiles}
              >
                {t("Add", "Adicionar")}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Image preview gallery */}
      {mediaList.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm">{t("Uploaded Images", "Imagens Enviadas")}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {mediaList.map((url, index) => (
              <div key={`img-${index}`} className="relative group aspect-square">
                <img 
                  src={url} 
                  alt={`Media ${index}`} 
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(url, 'image')}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Video preview gallery */}
      {videoList.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm">{t("Uploaded Videos", "Vídeos Enviados")}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {videoList.map((url, index) => (
              <div key={`vid-${index}`} className="relative group">
                <video 
                  src={url} 
                  controls
                  className="w-full h-auto rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(url, 'video')}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
