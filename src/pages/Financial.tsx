import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TransactionForm } from '../components/Financial/TransactionForm';
import { TransactionsList } from '../components/Financial/TransactionsList';
import { FinancialSummary } from '../components/Financial/FinancialSummary';

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

const initialTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Venda de Milho',
    amount: 15000,
    type: 'receita',
    category: 'venda_produtos',
    date: '2024-01-15',
    paymentMethod: 'transferencia',
    notes: 'Venda de 500 sacas de milho',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    description: 'Compra de Fertilizantes',
    amount: 3500,
    type: 'despesa',
    category: 'fertilizantes',
    date: '2024-01-14',
    paymentMethod: 'cartao_credito',
    notes: 'NPK para plantio da safra',
    createdAt: '2024-01-14T14:30:00Z'
  },
  {
    id: '3',
    description: 'Venda de Soja',
    amount: 22000,
    type: 'receita',
    category: 'venda_produtos',
    date: '2024-01-13',
    paymentMethod: 'pix',
    notes: 'Venda de 800 sacas de soja',
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    description: 'Combustível para Tratores',
    amount: 1200,
    type: 'despesa',
    category: 'combustivel',
    date: '2024-01-12',
    paymentMethod: 'dinheiro',
    notes: 'Abastecimento mensal',
    createdAt: '2024-01-12T16:45:00Z'
  },
  {
    id: '5',
    description: 'Sementes de Milho',
    amount: 2800,
    type: 'despesa',
    category: 'sementes',
    date: '2024-01-11',
    paymentMethod: 'transferencia',
    notes: 'Sementes híbridas para 50 hectares',
    createdAt: '2024-01-11T11:20:00Z'
  }
];

export const Financial: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'transactions'>('summary');

  const handleSaveTransaction = (transactionData: any) => {
    if (editingTransaction) {
      setTransactions(prev => 
        prev.map(transaction => 
          transaction.id === editingTransaction.id ? { ...transactionData, id: editingTransaction.id } : transaction
        )
      );
      setEditingTransaction(null);
    } else {
      setTransactions(prev => [...prev, transactionData]);
    }
    setIsFormOpen(false);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Módulo Financeiro</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Transação</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'summary'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Resumo Financeiro
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'transactions'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Transações
        </button>
      </div>

      {/* Content */}
      {activeTab === 'summary' ? (
        <FinancialSummary transactions={transactions} />
      ) : (
        <TransactionsList
          transactions={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      )}

      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleSaveTransaction}
        editingTransaction={editingTransaction}
      />
    </div>
  );
};