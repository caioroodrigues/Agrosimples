import React from 'react';
import { Calendar, MapPin, DollarSign, Clock } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  type: 'plantio' | 'colheita' | 'aplicacao' | 'manutencao';
  date: string;
  location: string;
  cost: number;
  status: 'concluido' | 'pendente' | 'em_andamento';
}

const activities: Activity[] = [
  {
    id: '1',
    name: 'Plantio de Milho',
    type: 'plantio',
    date: '2024-01-15',
    location: 'Lote 3A',
    cost: 1500,
    status: 'concluido'
  },
  {
    id: '2',
    name: 'Aplicação de Herbicida',
    type: 'aplicacao',
    date: '2024-01-14',
    location: 'Lote 2B',
    cost: 800,
    status: 'em_andamento'
  },
  {
    id: '3',
    name: 'Colheita de Soja',
    type: 'colheita',
    date: '2024-01-13',
    location: 'Lote 1A',
    cost: 2200,
    status: 'pendente'
  },
  {
    id: '4',
    name: 'Manutenção do Trator',
    type: 'manutencao',
    date: '2024-01-12',
    location: 'Oficina',
    cost: 450,
    status: 'concluido'
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'plantio': return 'bg-green-100 text-green-800';
    case 'colheita': return 'bg-yellow-100 text-yellow-800';
    case 'aplicacao': return 'bg-blue-100 text-blue-800';
    case 'manutencao': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'concluido': return 'bg-green-100 text-green-800';
    case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
    case 'pendente': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const RecentActivities: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Atividades Recentes</h2>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
          Ver todas
        </button>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="p-3 lg:p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="flex items-start space-x-3 lg:space-x-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 min-w-0 mb-2 sm:mb-0">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">{activity.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-500">{activity.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end space-y-2">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        R$ {activity.cost.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(activity.type)}`}>
                        {activity.type}
                      </span>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};