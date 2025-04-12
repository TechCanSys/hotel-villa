
import React from 'react';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-6 py-3 w-full ${
        isActive 
          ? 'bg-hotel text-white' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-hotel'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
};
