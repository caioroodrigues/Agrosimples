import React from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';

export const WeatherCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Condições Climáticas</h2>
        <span className="text-xs sm:text-sm text-gray-500">Atualizado há 1h</span>
      </div>

      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-50 rounded-xl flex items-center justify-center">
            <Sun className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-500" />
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">28°C</p>
            <p className="text-sm text-gray-500">Ensolarado</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs sm:text-sm text-gray-500">Máx: 32°C</p>
          <p className="text-xs sm:text-sm text-gray-500">Mín: 21°C</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 lg:gap-4">
        <div className="text-center">
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Droplets className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500">Umidade</p>
          <p className="text-sm lg:text-lg font-semibold text-gray-900">65%</p>
        </div>
        <div className="text-center">
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Wind className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500">Vento</p>
          <p className="text-sm lg:text-lg font-semibold text-gray-900">12 km/h</p>
        </div>
        <div className="text-center">
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
            <CloudRain className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500">Chuva</p>
          <p className="text-sm lg:text-lg font-semibold text-gray-900">0%</p>
        </div>
      </div>

      <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-green-50 rounded-xl">
        <p className="text-xs sm:text-sm text-green-800 font-medium">
          ✓ Condições ideais para aplicação de defensivos
        </p>
      </div>
    </div>
  );
};