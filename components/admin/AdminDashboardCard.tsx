import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface AdminDashboardCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  bgColor: string;
}

export default function AdminDashboardCard({
  title,
  value,
  change,
  isPositive,
  icon,
  bgColor = 'bg-primary',
}: AdminDashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          {/* Icon */}
          <div className={`rounded-full p-3 mr-4 ${bgColor}`}>
            {icon}
          </div>
          
          {/* Content */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-800">{value}</span>
              
              {/* Change indicator */}
              <div className={`flex items-center ml-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? (
                  <FiArrowUp className="w-3 h-3 mr-1" />
                ) : (
                  <FiArrowDown className="w-3 h-3 mr-1" />
                )}
                <span className="text-xs font-medium">{change}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress bar at bottom (optional styling) */}
      <div className="h-1 bg-gray-100">
        <div className={`h-full ${bgColor}`} style={{ width: `${Math.floor(Math.random() * 70) + 30}%` }}></div>
      </div>
    </div>
  );
} 