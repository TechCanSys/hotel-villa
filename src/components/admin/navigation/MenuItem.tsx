
import React from 'react';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: string | number;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  label, 
  isActive, 
  onClick,
  badge 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between px-6 py-3 w-full ${
        isActive 
          ? 'bg-hotel text-white' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-hotel'
      }`}
    >
      <div className="flex items-center">
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
};
