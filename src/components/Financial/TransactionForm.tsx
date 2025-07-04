import React, { useState } from 'react';
import { X, DollarSign, Calendar, Tag, FileText, TrendingUp, TrendingDown } from 'lucide-react';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: any) => void;
  editingTransaction?: any;
}

interface TransactionFormData {
  description: string;
  amount: string;
  type: 'receita' | 'despesa';
  category: string;
  date: string;
  paymentMethod: string;
  notes: string;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingTransaction 
}) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    description: editingTransaction?.description || '',
    amount: editingTransaction?.amount?.toString() || '',
    type: editingTransaction?.type || 'receita',
    category: editingTransaction?.category || '',
    date: editingTransaction?.date || '',
    paymentMethod: editingTransaction?.paymentMethod || '',
    notes: editingTransaction?.notes || ''
  });

  const [errors, setErrors] = useState<Partial<TransactionFormData>>({});

  const categories = {
    receita: [
      { value: 'venda_produtos', label: 'Venda de Produtos' },
      { value: 'subsidios', label: 'Subsídios' },
      { value: 'servicos', label: 'Prestação de Serviços' },
      { value: 'outros', label: 'Outros' }
    ],
    despesa: [
      { value: 'sementes', label: 'Sementes' },
      { value: 'fertilizantes', label: 'Fertilizantes' },
      { value: 'defensivos', label: 'Defensivos' },
      { value: 'combustivel', label: 'Combustível' },
      { value: 'manutencao', label: 'Manutenção' },
      { value: 'mao_obra', label: 'Mão de Obra' },
      { value: 'outros', label: 'Outros' }
    ]
  };

  const paymentMethods = [
    { value: 'dinheiro', label: 'Dinheiro' },
    { value: 'pix', label: 'PIX' },
    { value: 'cartao_debito', label: 'Cartão de Débito' },
    { value: 'cartao_credito', label: 'Cartão de Crédito' },
    { value: 'transferencia', label: 'Transferência' },
    { value: 'cheque', label: 'Cheque' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<TransactionFormData> = {};
    if (!formData.description) newErrors.description = 'Descrição é obrigatória';
    if (!formData.amount) newErrors.amount = 'Valor é obrigatório';
    if (!formData.category) newErrors.category = 'Categoria é obrigatória';
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Forma de pagamento é obrigatória';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...formData,
      id: editingTransaction?.id || Date.now().toString(),
      amount: parseFloat(formData.amount),
      createdAt: editingTransaction?.createdAt || new Date().toISOString()
    });

    setFormData({
      description: '',
      amount: '',
      type: 'receita',
      category: '',
      date: '',
      paymentMethod: '',
      notes: ''
    });
    setErrors({});
    onClose();
  };

  const handleChange = (field: keyof TransactionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingTransaction ? 'Editar Transação' : 'Nova Transação'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de Transação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Transação
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleChange('type', 'receita')}
                className={`p-4 border-2 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                  formData.type === 'receita'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Receita</span>
              </button>
              <button
                type="button"
                onClick={() => handleChange('type', 'despesa')}
                className={`p-4 border-2 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                  formData.type === 'despesa'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <TrendingDown className="w-5 h-5" />
                <span className="font-medium">Despesa</span>
              </button>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ex: Venda de milho"
              />
            </div>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Valor e Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor (R$)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.amount ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0,00"
                />
              </div>
              {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.category ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione a categoria</option>
                {categories[formData.type].map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          {/* Forma de Pagamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Forma de Pagamento
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => handleChange('paymentMethod', e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.paymentMethod ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Selecione a forma de pagamento</option>
              {paymentMethods.map(method => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
            {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>}
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Informações adicionais..."
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
            >
              {editingTransaction ? 'Atualizar' : 'Salvar'} Transação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};