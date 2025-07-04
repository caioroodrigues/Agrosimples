import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0 mr-3">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">{value}</p>
        <div className="flex items-center mt-1 sm:mt-2">
          {changeType === 'increase' ? (
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 flex-shrink-0" />
          ) : (
            <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1 flex-shrink-0" />
          )}
          <span className={`text-xs sm:text-sm font-medium ${
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
          <span className="text-xs text-gray-500 ml-1">vs mês</span>
        </div>
      </div>
      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
    </div>
  </div>
);

export const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Receita Total',
      value: 'R$ 45.200',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
    },
    {
      title: 'Despesas',
      value: 'R$ 18.300',
      change: '-5.2%',
      changeType: 'decrease' as const,
      icon: <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
    },
    {
      title: 'Saldo Atual',
      value: 'R$ 26.900',
      change: '+18.7%',
      changeType: 'increase' as const,
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
    },
    {
      title: 'Atividades',
      value: '24',
      change: '+3',
      changeType: 'increase' as const,
      icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
    }
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};