import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Target, AlertCircle } from 'lucide-react';

interface FinancialSummaryProps {
  transactions: any[];
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({ transactions }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Transações do mês atual
  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
  });

  // Transações do mês anterior
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const lastMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === lastMonth && transactionDate.getFullYear() === lastMonthYear;
  });

  // Cálculos do mês atual
  const currentReceitas = currentMonthTransactions
    .filter(t => t.type === 'receita')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentDespesas = currentMonthTransactions
    .filter(t => t.type === 'despesa')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentSaldo = currentReceitas - currentDespesas;

  // Cálculos do mês anterior
  const lastReceitas = lastMonthTransactions
    .filter(t => t.type === 'receita')
    .reduce((sum, t) => sum + t.amount, 0);

  const lastDespesas = lastMonthTransactions
    .filter(t => t.type === 'despesa')
    .reduce((sum, t) => sum + t.amount, 0);

  const lastSaldo = lastReceitas - lastDespesas;

  // Variações percentuais
  const receitasVariation = lastReceitas > 0 ? ((currentReceitas - lastReceitas) / lastReceitas) * 100 : 0;
  const despesasVariation = lastDespesas > 0 ? ((currentDespesas - lastDespesas) / lastDespesas) * 100 : 0;
  const saldoVariation = lastSaldo !== 0 ? ((currentSaldo - lastSaldo) / Math.abs(lastSaldo)) * 100 : 0;

  // Análise de categorias
  const categoriesAnalysis = currentMonthTransactions
    .filter(t => t.type === 'despesa')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as { [key: string]: number });

  const topCategories = Object.entries(categoriesAnalysis)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'sementes': 'Sementes',
      'fertilizantes': 'Fertilizantes',
      'defensivos': 'Defensivos',
      'combustivel': 'Combustível',
      'manutencao': 'Manutenção',
      'mao_obra': 'Mão de Obra',
      'outros': 'Outros'
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className={`flex items-center space-x-1 ${
              receitasVariation >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {receitasVariation >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(receitasVariation).toFixed(1)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Receitas do Mês</p>
            <p className="text-2xl font-bold text-gray-900">
              R$ {currentReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              vs R$ {lastReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} mês anterior
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div className={`flex items-center space-x-1 ${
              despesasVariation <= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {despesasVariation <= 0 ? (
                <TrendingDown className="w-4 h-4" />
              ) : (
                <TrendingUp className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(despesasVariation).toFixed(1)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Despesas do Mês</p>
            <p className="text-2xl font-bold text-gray-900">
              R$ {currentDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              vs R$ {lastDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} mês anterior
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              currentSaldo >= 0 ? 'bg-blue-50' : 'bg-orange-50'
            }`}>
              <DollarSign className={`w-6 h-6 ${
                currentSaldo >= 0 ? 'text-blue-600' : 'text-orange-600'
              }`} />
            </div>
            <div className={`flex items-center space-x-1 ${
              saldoVariation >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {saldoVariation >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(saldoVariation).toFixed(1)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Saldo do Mês</p>
            <p className={`text-2xl font-bold ${
              currentSaldo >= 0 ? 'text-blue-600' : 'text-orange-600'
            }`}>
              R$ {currentSaldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              vs R$ {lastSaldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} mês anterior
            </p>
          </div>
        </div>
      </div>

      {/* Análise de Categorias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Maiores Despesas por Categoria
          </h3>
          <div className="space-y-4">
            {topCategories.length > 0 ? (
              topCategories.map(([category, amount], index) => {
                const percentage = currentDespesas > 0 ? (amount / currentDespesas) * 100 : 0;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-red-500' : 
                        index === 1 ? 'bg-orange-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-900">
                        {getCategoryLabel(category)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-gray-500">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">
                Nenhuma despesa registrada este mês
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alertas Financeiros
          </h3>
          <div className="space-y-4">
            {currentSaldo < 0 && (
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Saldo Negativo</p>
                  <p className="text-xs text-red-600">
                    Suas despesas estão superiores às receitas este mês
                  </p>
                </div>
              </div>
            )}

            {despesasVariation > 20 && (
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-xl">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Aumento de Despesas</p>
                  <p className="text-xs text-yellow-600">
                    Despesas aumentaram {despesasVariation.toFixed(1)}% em relação ao mês anterior
                  </p>
                </div>
              </div>
            )}

            {receitasVariation < -10 && (
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-xl">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Queda nas Receitas</p>
                  <p className="text-xs text-orange-600">
                    Receitas diminuíram {Math.abs(receitasVariation).toFixed(1)}% em relação ao mês anterior
                  </p>
                </div>
              </div>
            )}

            {currentSaldo >= 0 && despesasVariation <= 0 && receitasVariation >= 0 && (
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl">
                <Target className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Situação Financeira Saudável</p>
                  <p className="text-xs text-green-600">
                    Suas finanças estão em boa situação este mês
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};