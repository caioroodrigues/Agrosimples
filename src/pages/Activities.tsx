import React, { useState } from 'react';
import { ActivitiesList } from '../components/Activities/ActivitiesList';
import { ActivityForm } from '../components/Activities/ActivityForm';

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

const initialActivities: Activity[] = [
  {
    id: '1',
    name: 'Plantio de Milho',
    type: 'plantio',
    date: '2024-01-15',
    location: 'Lote 3A',
    cost: 1500,
    status: 'concluido',
    observations: 'Plantio realizado com sucesso. Sementes híbridas utilizadas.'
  },
  {
    id: '2',
    name: 'Aplicação de Herbicida',
    type: 'aplicacao',
    date: '2024-01-14',
    location: 'Lote 2B',
    cost: 800,
    status: 'em_andamento',
    observations: 'Aplicação iniciada pela manhã. Condições climáticas favoráveis.'
  },
  {
    id: '3',
    name: 'Colheita de Soja',
    type: 'colheita',
    date: '2024-01-13',
    location: 'Lote 1A',
    cost: 2200,
    status: 'pendente',
    observations: 'Aguardando condições climáticas ideais para colheita.'
  },
  {
    id: '4',
    name: 'Manutenção do Trator',
    type: 'manutencao',
    date: '2024-01-12',
    location: 'Oficina',
    cost: 450,
    status: 'concluido',
    observations: 'Troca de óleo e filtros. Equipamento em perfeito estado.'
  }
];

export const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const handleSaveActivity = (activityData: any) => {
    if (editingActivity) {
      // Editando atividade existente
      setActivities(prev => 
        prev.map(activity => 
          activity.id === editingActivity.id ? { ...activityData, id: editingActivity.id } : activity
        )
      );
      setEditingActivity(null);
    } else {
      // Criando nova atividade
      setActivities(prev => [...prev, activityData]);
    }
    setIsFormOpen(false);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setIsFormOpen(true);
  };

  const handleDeleteActivity = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
      setActivities(prev => prev.filter(activity => activity.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Atividades</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors"
        >
          <span>Nova Atividade</span>
        </button>
      </div>

      <ActivitiesList
        activities={activities}
        onEdit={handleEditActivity}
        onDelete={handleDeleteActivity}
      />

      <ActivityForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingActivity(null);
        }}
        onSave={handleSaveActivity}
      />
    </div>
  );
};