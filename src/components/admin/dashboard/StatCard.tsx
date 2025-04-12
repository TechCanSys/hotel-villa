
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
      <div className="bg-hotel bg-opacity-10 p-3 rounded-full mr-4">
        <div className="text-hotel">{icon}</div>
      </div>
      <div>
        <h3 className="text-gray-500 text-sm">{label}</h3>
        <p className="text-2xl font-bold text-hotel-text">{value}</p>
      </div>
    </div>
  );
};
