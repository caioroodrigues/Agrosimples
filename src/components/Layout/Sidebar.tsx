import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Sprout,
  X,
  Menu
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'activities', icon: Calendar, label: 'Atividades' },
    { id: 'financial', icon: DollarSign, label: 'Financeiro' },
    { id: 'reports', icon: BarChart3, label: 'Relatórios' },
    { id: 'settings', icon: Settings, label: 'Configurações' },
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setIsMobileOpen(false); // Fecha o menu mobile após seleção
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-gray-200"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
        bg-white border-r border-gray-200 flex flex-col transition-all duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && (
                <span className="font-semibold text-gray-900">AgroSimples</span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {/* Mobile Close Button */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
              {/* Desktop Collapse Button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:block p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};