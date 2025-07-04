import React, { useState } from 'react';
import { Search, Filter, Edit2, Trash2, MapPin, Calendar, DollarSign } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  type: string;
  date: string;
  location: string;
  cost: number;
  status: 'concluido' | 'pendente' | 'em_andamento';
  observations: string;
}

interface ActivitiesListProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
}

export const ActivitiesList: React.FC<ActivitiesListProps> = ({ activities, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || activity.type === filterType;
    const matchesStatus = !filterStatus || activity.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'pendente': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'plantio': return 'bg-green-100 text-green-800';
      case 'colheita': return 'bg-yellow-100 text-yellow-800';
      case 'aplicacao': return 'bg-blue-100 text-blue-800';
      case 'manutencao': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Lista de Atividades</h2>
          
          <div className="flex flex-col space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar atividades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="">Todos os tipos</option>
                <option value="plantio">Plantio</option>
                <option value="colheita">Colheita</option>
                <option value="aplicacao">Aplicação</option>
                <option value="manutencao">Manutenção</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="">Todos os status</option>
                <option value="pendente">Pendente</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluido">Concluído</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('');
                  setFilterStatus('');
                }}
                className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm col-span-2 lg:col-span-1"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="block xl:hidden">
        <div className="p-4 space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 mr-3">
                  <h3 className="font-medium text-gray-900 text-sm">{activity.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(activity.type)}`}>
                      {activity.type}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => onEdit(activity)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(activity.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-xs">{new Date(activity.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-xs font-medium">R$ {(activity.cost / 1000).toFixed(1)}k</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-xs">{activity.location}</span>
                </div>
              </div>
              
              {activity.observations && (
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                  {activity.observations}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden xl:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Atividade
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Local
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Custo
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredActivities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div>
                    <div className="font-medium text-gray-900">{activity.name}</div>
                    {activity.observations && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {activity.observations}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(activity.type)}`}>
                    {activity.type}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center text-sm text-gray-900">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    {new Date(activity.date).toLocaleDateString('pt-BR')}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center text-sm text-gray-900">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {activity.location}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center text-sm text-gray-900">
                    <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                    R$ {activity.cost.toLocaleString('pt-BR')}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(activity)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(activity.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma atividade encontrada</p>
        </div>
      )}
    </div>
  );
};