
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`text-sm font-medium px-2 py-1 rounded transition ${
          language === 'en' ? 'bg-hotel text-white' : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        EN
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => setLanguage('pt')}
        className={`text-sm font-medium px-2 py-1 rounded transition ${
          language === 'pt' ? 'bg-hotel text-white' : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        PT
      </button>
    </div>
  );
};

export default LanguageSwitcher;
