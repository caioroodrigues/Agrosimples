import React, { useState } from 'react';
import { X, Calendar, MapPin, DollarSign, FileText, Tag } from 'lucide-react';

interface ActivityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: any) => void;
}

interface ActivityFormData {
  name: string;
  type: string;
  date: string;
  location: string;
  cost: string;
  observations: string;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<ActivityFormData>({
    name: '',
    type: '',
    date: '',
    location: '',
    cost: '',
    observations: ''
  });

  const [errors, setErrors] = useState<Partial<ActivityFormData>>({});

  const activityTypes = [
    { value: 'plantio', label: 'Plantio' },
    { value: 'colheita', label: 'Colheita' },
    { value: 'aplicacao', label: 'Aplicação' },
    { value: 'manutencao', label: 'Manutenção' },
    { value: 'irrigacao', label: 'Irrigação' },
    { value: 'preparacao', label: 'Preparação do Solo' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    const newErrors: Partial<ActivityFormData> = {};
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.type) newErrors.type = 'Tipo é obrigatório';
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (!formData.location) newErrors.location = 'Local é obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Salvar atividade
    onSave({
      ...formData,
      id: Date.now().toString(),
      cost: parseFloat(formData.cost) || 0,
      status: 'pendente'
    });

    // Limpar formulário
    setFormData({
      name: '',
      type: '',
      date: '',
      location: '',
      cost: '',
      observations: ''
    });
    setErrors({});
    onClose();
  };

  const handleChange = (field: keyof ActivityFormData, value: string) => {
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
            <h2 className="text-xl font-semibold text-gray-900">Nova Atividade</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nome da Atividade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Atividade
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ex: Plantio de Milho"
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Atividade
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.type ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione o tipo</option>
                {activityTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
          </div>

          {/* Data e Local */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Lote 3A"
                />
              </div>
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>
          </div>

          {/* Custo Estimado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custo Estimado (R$)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => handleChange('cost', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0,00"
              />
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              value={formData.observations}
              onChange={(e) => handleChange('observations', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Detalhes adicionais sobre a atividade..."
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
              Salvar Atividade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};