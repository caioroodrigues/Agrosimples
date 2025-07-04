import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface FinancialData {
  month: string;
  receitas: number;
  despesas: number;
  saldo: number;
}

const mockData: FinancialData[] = [
  { month: 'Jan', receitas: 45000, despesas: 28000, saldo: 17000 },
  { month: 'Fev', receitas: 52000, despesas: 31000, saldo: 21000 },
  { month: 'Mar', receitas: 48000, despesas: 29000, saldo: 19000 },
  { month: 'Abr', receitas: 55000, despesas: 33000, saldo: 22000 },
  { month: 'Mai', receitas: 51000, despesas: 35000, saldo: 16000 },
  { month: 'Jun', receitas: 58000, despesas: 32000, saldo: 26000 }
];

export const FinancialChart: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'receitas' | 'despesas' | 'saldo'>('saldo');
  
  const maxValue = Math.max(...mockData.map(d => Math.max(d.receitas, d.despesas, Math.abs(d.saldo))));
  
  const totalReceitas = mockData.reduce((sum, month) => sum + month.receitas, 0);
  const totalDespesas = mockData.reduce((sum, month) => sum + month.despesas, 0);
  const saldoTotal = totalReceitas - totalDespesas;

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'receitas': return 'bg-green-500';
      case 'despesas': return 'bg-red-500';
      case 'saldo': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getMetricValue = (data: FinancialData, metric: string) => {
    switch (metric) {
      case 'receitas': return data.receitas;
      case 'despesas': return data.despesas;
      case 'saldo': return data.saldo;
      default: return 0;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Evolução Financeira</h3>
          <p className="text-sm text-gray-500">Últimos 6 meses</p>
        </div>
        <DollarSign className="w-8 h-8 text-green-600" />
      </div>

      {/* Métricas de Resumo */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-xl">
          <p className="text-sm text-green-600 mb-1">Total Receitas</p>
          <p className="text-lg font-bold text-green-700">
            R$ {(totalReceitas / 1000).toFixed(0)}k
          </p>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-xl">
          <p className="text-sm text-red-600 mb-1">Total Despesas</p>
          <p className="text-lg font-bold text-red-700">
            R$ {(totalDespesas / 1000).toFixed(0)}k
          </p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-600 mb-1">Saldo Total</p>
          <p className="text-lg font-bold text-blue-700">
            R$ {(saldoTotal / 1000).toFixed(0)}k
          </p>
        </div>
      </div>

      {/* Seletor de Métrica */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setSelectedMetric('receitas')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedMetric === 'receitas'
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Receitas
        </button>
        <button
          onClick={() => setSelectedMetric('despesas')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedMetric === 'despesas'
              ? 'bg-red-100 text-red-700 border border-red-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Despesas
        </button>
        <button
          onClick={() => setSelectedMetric('saldo')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedMetric === 'saldo'
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Saldo
        </button>
      </div>

      {/* Gráfico de Barras */}
      <div className="space-y-3">
        {mockData.map((data, index) => {
          const value = getMetricValue(data, selectedMetric);
          const percentage = (Math.abs(value) / maxValue) * 100;
          const isNegative = value < 0;
          
          return (
            <div key={data.month} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">
                {data.month}
              </div>
              <div className="flex-1 flex items-center">
                <div className="w-full bg-gray-100 rounded-lg h-8 relative overflow-hidden">
                  <div 
                    className={`h-full rounded-lg flex items-center justify-center text-white text-sm font-medium ${
                      isNegative ? 'bg-red-500' : getMetricColor(selectedMetric)
                    }`}
                    style={{ width: `${percentage}%`, minWidth: '40px' }}
                  >
                    R$ {(Math.abs(value) / 1000).toFixed(0)}k
                  </div>
                </div>
              </div>
              <div className="w-20 text-sm font-medium text-gray-900 text-right">
                {isNegative && '-'}R$ {(Math.abs(value) / 1000).toFixed(0)}k
              </div>
            </div>
          );
        })}
      </div>

      {/* Análise de Tendência */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <div className="flex items-start space-x-3">
          <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">Análise de Tendência</p>
            <p className="text-xs text-blue-600 mt-1">
              {selectedMetric === 'receitas' && 'Receitas apresentaram crescimento de 29% no período, com pico em junho.'}
              {selectedMetric === 'despesas' && 'Despesas mantiveram-se estáveis, com leve aumento em maio.'}
              {selectedMetric === 'saldo' && 'Saldo positivo em todos os meses, com melhor performance em junho.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};