import React from 'react';
import { Plus, Bell, User, Wifi, WifiOff } from 'lucide-react';

interface NavbarProps {
  onNewActivity: () => void;
  isOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onNewActivity, isOnline = true }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Page title */}
        <div className="flex items-center space-x-2 lg:space-x-4 ml-12 lg:ml-0">
          <h1 className="text-lg lg:text-xl font-semibold text-gray-900">Dashboard</h1>
          
          {/* Online/Offline indicator */}
          <div className="flex items-center space-x-1 lg:space-x-2">
            {isOnline ? (
              <Wifi className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
            ) : (
              <WifiOff className="w-3 h-3 lg:w-4 lg:h-4 text-red-500" />
            )}
            <span className={`text-xs lg:text-sm ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Right side - Actions and user */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* New Activity Button */}
          <button
            onClick={onNewActivity}
            className="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-3 lg:px-4 py-2 rounded-xl flex items-center space-x-1 lg:space-x-2 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">Nova</span>
          </button>

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
            <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:block text-right">
              <div className="text-xs lg:text-sm font-medium text-gray-900">João Silva</div>
              <div className="text-xs text-gray-500">Fazenda Boa Vista</div>
            </div>
            <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <User className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};