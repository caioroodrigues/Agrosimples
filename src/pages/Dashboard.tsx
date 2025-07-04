import React from 'react';
import { StatsCards } from '../components/Dashboard/StatsCards';
import { RecentActivities } from '../components/Dashboard/RecentActivities';
import { WeatherCard } from '../components/Dashboard/WeatherCard';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        <div>
          <WeatherCard />
        </div>
      </div>
    </div>
  );
};