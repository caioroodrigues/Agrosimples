import React, { useState } from 'react';
import { Search, Filter, Edit2, Trash2, Calendar, DollarSign, Tag, TrendingUp, TrendingDown } from 'lucide-react';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'receita' | 'despesa';
  category: string;
  date: string;
  paymentMethod: string;
  notes: string;
  createdAt: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ 
  transactions, 
  onEdit, 
  onDelete 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || transaction.type === filterType;
    const matchesCategory = !filterCategory || transaction.category === filterCategory;
    
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const transactionDate = new Date(transaction.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      matchesDate = transactionDate >= startDate && transactionDate <= endDate;
    }
    
    return matchesSearch && matchesType && matchesCategory && matchesDate;
  });

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'venda_produtos': 'Venda de Produtos',
      'subsidios': 'Subsídios',
      'servicos': 'Prestação de Serviços',
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

  const getPaymentMethodLabel = (method: string) => {
    const methodMap: { [key: string]: string } = {
      'dinheiro': 'Dinheiro',
      'pix': 'PIX',
      'cartao_debito': 'Cartão de Débito',
      'cartao_credito': 'Cartão de Crédito',
      'transferencia': 'Transferência',
      'cheque': 'Cheque'
    };
    return methodMap[method] || method;
  };

  const totalReceitas = filteredTransactions
    .filter(t => t.type === 'receita')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDespesas = filteredTransactions
    .filter(t => t.type === 'despesa')
    .reduce((sum, t) => sum + t.amount, 0);

  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="space-y-6">
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1 mr-3">
              <p className="text-xs sm:text-sm text-green-600 mb-1">Total Receitas</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-700">
                R$ {(totalReceitas / 1000).toFixed(0)}k
              </p>
            </div>
            <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 flex-shrink-0" />
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1 mr-3">
              <p className="text-xs sm:text-sm text-red-600 mb-1">Total Despesas</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-700">
                R$ {(totalDespesas / 1000).toFixed(0)}k
              </p>
            </div>
            <TrendingDown className="w-6 h-6 lg:w-8 lg:h-8 text-red-600 flex-shrink-0" />
          </div>
        </div>

        <div className={`${saldo >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} border rounded-2xl p-4`}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1 mr-3">
              <p className={`text-xs sm:text-sm mb-1 ${saldo >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>Saldo</p>
              <p className={`text-lg sm:text-xl lg:text-2xl font-bold ${saldo >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                R$ {(Math.abs(saldo) / 1000).toFixed(0)}k
              </p>
            </div>
            <DollarSign className={`w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0 ${saldo >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
          </div>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Transações</h2>
            
            <div className="flex flex-col space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar transações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option value="">Todos</option>
                  <option value="receita">Receitas</option>
                  <option value="despesa">Despesas</option>
                </select>

                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />

                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />

                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('');
                    setFilterCategory('');
                    setDateRange({ start: '', end: '' });
                  }}
                  className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="block xl:hidden">
          <div className="p-4 space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 mr-3">
                    <h3 className="font-medium text-gray-900 text-sm">{transaction.description}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                        transaction.type === 'receita' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'receita' ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {transaction.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Tag className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-xs">{getCategoryLabel(transaction.category)}</span>
                    </div>
                    <div className={`text-sm font-medium ${
                      transaction.type === 'receita' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      R$ {(transaction.amount / 1000).toFixed(1)}k
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-xs">{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <span className="text-xs">{getPaymentMethodLabel(transaction.paymentMethod)}</span>
                  </div>
                </div>
                
                {transaction.notes && (
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                    {transaction.notes}
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
                  Descrição
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pagamento
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{transaction.description}</div>
                      {transaction.notes && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {transaction.notes}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                      transaction.type === 'receita' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'receita' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-gray-900">
                      <Tag className="w-4 h-4 mr-1 text-gray-400" />
                      {getCategoryLabel(transaction.category)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`flex items-center text-sm font-medium ${
                      transaction.type === 'receita' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <DollarSign className="w-4 h-4 mr-1" />
                      R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-900">
                      {getPaymentMethodLabel(transaction.paymentMethod)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(transaction)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(transaction.id)}
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

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma transação encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};