import React from 'react';
import { PieChart, DollarSign, TrendingDown, AlertTriangle } from 'lucide-react';

interface CostCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

const mockCostData: CostCategory[] = [
  { category: 'Fertilizantes', amount: 45000, percentage: 32, color: 'bg-blue-500', trend: 'up' },
  { category: 'Sementes', amount: 38000, percentage: 27, color: 'bg-green-500', trend: 'stable' },
  { category: 'Defensivos', amount: 28000, percentage: 20, color: 'bg-yellow-500', trend: 'down' },
  { category: 'Combustível', amount: 18000, percentage: 13, color: 'bg-red-500', trend: 'up' },
  { category: 'Mão de Obra', amount: 8000, percentage: 6, color: 'bg-purple-500', trend: 'stable' },
  { category: 'Manutenção', amount: 3000, percentage: 2, color: 'bg-gray-500', trend: 'down' }
];

export const CostAnalysis: React.FC = () => {
  const totalCost = mockCostData.reduce((sum, item) => sum + item.amount, 0);
  const highestCost = mockCostData[0];
  const increasingCosts = mockCostData.filter(item => item.trend === 'up');

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Análise de Custos</h3>
          <p className="text-sm text-gray-500">Distribuição por categoria</p>
        </div>
        <PieChart className="w-8 h-8 text-green-600" />
      </div>

      {/* Resumo Total */}
      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Custo Total</p>
            <p className="text-2xl font-bold text-gray-900">
              R$ {totalCost.toLocaleString('pt-BR')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Maior Categoria</p>
            <p className="text-lg font-semibold text-gray-900">{highestCost.category}</p>
            <p className="text-sm text-gray-500">{highestCost.percentage}% do total</p>
          </div>
        </div>
      </div>

      {/* Gráfico de Pizza Simulado */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          {mockCostData.map((item, index) => (
            <div key={item.category} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{item.category}</span>
                  <div className="flex items-center space-x-1">
                    {item.trend === 'up' && <TrendingDown className="w-3 h-3 text-red-500 rotate-180" />}
                    {item.trend === 'down' && <TrendingDown className="w-3 h-3 text-green-500" />}
                    <span className="text-xs text-gray-500">{item.percentage}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    R$ {item.amount.toLocaleString('pt-BR')}
                  </span>
                  <div className="w-16 bg-gray-200 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage * 2}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas e Insights */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-900">Insights e Alertas</h4>
        
        {increasingCosts.length > 0 && (
          <div className="p-3 bg-yellow-50 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Custos em Alta</p>
                <p className="text-xs text-yellow-600 mt-1">
                  {increasingCosts.map(cost => cost.category).join(', ')} apresentaram aumento nos últimos meses.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="p-3 bg-blue-50 rounded-xl">
          <div className="flex items-start space-x-3">
            <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">Oportunidade de Economia</p>
              <p className="text-xs text-blue-600 mt-1">
                Fertilizantes representam 32% dos custos. Considere negociar compras em volume ou buscar fornecedores alternativos.
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-green-50 rounded-xl">
          <div className="flex items-start space-x-3">
            <TrendingDown className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">Redução de Custos</p>
              <p className="text-xs text-green-600 mt-1">
                Defensivos e manutenção apresentaram redução, indicando boa gestão nessas categorias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};