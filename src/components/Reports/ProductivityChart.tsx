import React from 'react';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

interface ProductivityData {
  month: string;
  plantio: number;
  colheita: number;
  aplicacao: number;
  manutencao: number;
}

const mockData: ProductivityData[] = [
  { month: 'Jan', plantio: 12, colheita: 8, aplicacao: 15, manutencao: 5 },
  { month: 'Fev', plantio: 15, colheita: 10, aplicacao: 18, manutencao: 7 },
  { month: 'Mar', plantio: 18, colheita: 12, aplicacao: 20, manutencao: 6 },
  { month: 'Abr', plantio: 20, colheita: 15, aplicacao: 22, manutencao: 8 },
  { month: 'Mai', plantio: 16, colheita: 18, aplicacao: 19, manutencao: 9 },
  { month: 'Jun', plantio: 14, colheita: 20, aplicacao: 17, manutencao: 7 }
];

export const ProductivityChart: React.FC = () => {
  const maxValue = Math.max(...mockData.flatMap(d => [d.plantio, d.colheita, d.aplicacao, d.manutencao]));
  
  const totalActivities = mockData.reduce((sum, month) => 
    sum + month.plantio + month.colheita + month.aplicacao + month.manutencao, 0
  );

  const averagePerMonth = totalActivities / mockData.length;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Produtividade por Atividade</h3>
          <p className="text-sm text-gray-500">Últimos 6 meses</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Média mensal</p>
            <p className="text-lg font-semibold text-gray-900">
              {averagePerMonth.toFixed(1)} atividades
            </p>
          </div>
          <BarChart3 className="w-8 h-8 text-green-600" />
        </div>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Plantio</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Colheita</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Aplicação</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Manutenção</span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="space-y-4">
        {mockData.map((data, index) => (
          <div key={data.month} className="flex items-center space-x-4">
            <div className="w-12 text-sm font-medium text-gray-600">
              {data.month}
            </div>
            <div className="flex-1 flex items-center space-x-1">
              {/* Plantio */}
              <div 
                className="bg-green-500 h-6 rounded-l-md flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${(data.plantio / maxValue) * 100}%`, minWidth: data.plantio > 0 ? '20px' : '0' }}
              >
                {data.plantio > 0 && data.plantio}
              </div>
              {/* Colheita */}
              <div 
                className="bg-yellow-500 h-6 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${(data.colheita / maxValue) * 100}%`, minWidth: data.colheita > 0 ? '20px' : '0' }}
              >
                {data.colheita > 0 && data.colheita}
              </div>
              {/* Aplicação */}
              <div 
                className="bg-blue-500 h-6 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${(data.aplicacao / maxValue) * 100}%`, minWidth: data.aplicacao > 0 ? '20px' : '0' }}
              >
                {data.aplicacao > 0 && data.aplicacao}
              </div>
              {/* Manutenção */}
              <div 
                className="bg-purple-500 h-6 rounded-r-md flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${(data.manutencao / maxValue) * 100}%`, minWidth: data.manutencao > 0 ? '20px' : '0' }}
              >
                {data.manutencao > 0 && data.manutencao}
              </div>
            </div>
            <div className="w-12 text-sm font-medium text-gray-900 text-right">
              {data.plantio + data.colheita + data.aplicacao + data.manutencao}
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-green-50 rounded-xl">
        <div className="flex items-start space-x-3">
          <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-800">Insight de Produtividade</p>
            <p className="text-xs text-green-600 mt-1">
              Abril foi o mês mais produtivo com 65 atividades. 
              Considere replicar as estratégias utilizadas neste período.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};