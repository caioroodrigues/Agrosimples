import React, { useState } from 'react';
import { Download, Calendar, Filter } from 'lucide-react';
import { ProductivityChart } from '../components/Reports/ProductivityChart';
import { FinancialChart } from '../components/Reports/FinancialChart';
import { CostAnalysis } from '../components/Reports/CostAnalysis';

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedReport, setSelectedReport] = useState('all');

  const handleExportReport = () => {
    // Simulação de exportação
    alert('Relatório exportado com sucesso! (Funcionalidade simulada)');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análises e insights da sua propriedade</p>
        </div>
        
        <div className="flex flex-col space-y-3">
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="3months">Últimos 3 meses</option>
              <option value="6months">Últimos 6 meses</option>
              <option value="12months">Último ano</option>
              <option value="custom">Período personalizado</option>
            </select>

            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Todos os relatórios</option>
              <option value="financial">Apenas financeiro</option>
              <option value="productivity">Apenas produtividade</option>
              <option value="costs">Apenas custos</option>
            </select>
          </div>

          <button
            onClick={handleExportReport}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center justify-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* Relatórios */}
      <div className="space-y-6 lg:space-y-8">
        {(selectedReport === 'all' || selectedReport === 'productivity') && (
          <ProductivityChart />
        )}

        {(selectedReport === 'all' || selectedReport === 'financial') && (
          <FinancialChart />
        )}

        {(selectedReport === 'all' || selectedReport === 'costs') && (
          <CostAnalysis />
        )}
      </div>

      {/* Resumo Executivo */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Executivo</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Destaques Financeiros</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Receita total: R$ 309.000 (+15% vs período anterior)</li>
              <li>• Margem de lucro: 42% (acima da média do setor)</li>
              <li>• Maior fonte de receita: Venda de soja (38%)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Produtividade</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Total de atividades: 295 (+8% vs período anterior)</li>
              <li>• Mês mais produtivo: Abril (65 atividades)</li>
              <li>• Eficiência operacional: 87%</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Gestão de Custos</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Maior categoria de custo: Fertilizantes (32%)</li>
              <li>• Redução em defensivos: -12%</li>
              <li>• Oportunidade de economia: R$ 15.000</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-xl">
          <h4 className="text-sm font-medium text-green-800 mb-2">Recomendações</h4>
          <ul className="space-y-1 text-sm text-green-700">
            <li>• Considere aumentar a produção de soja devido à alta rentabilidade</li>
            <li>• Negocie contratos de longo prazo para fertilizantes para reduzir custos</li>
            <li>• Mantenha o foco em atividades de manutenção preventiva</li>
          </ul>
        </div>
      </div>
    </div>
  );
};