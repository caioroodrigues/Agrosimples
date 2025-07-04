import { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Navbar } from './components/Layout/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Activities } from './pages/Activities';
import { Financial } from './pages/Financial';
import { Reports } from './pages/Reports';
import { ActivityForm } from './components/Activities/ActivityForm';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isActivityFormOpen, setIsActivityFormOpen] = useState(false);

  const handleNewActivity = () => {
    setIsActivityFormOpen(true);
  };

  interface ActivityData {
    // Defina os campos conforme necessário, exemplo:
    title: string;
    description: string;
    date: string;
    // Adicione outros campos conforme o modelo de atividade
  }

  const handleSaveActivity = (activityData: ActivityData) => {
    // Em uma aplicação real, isso seria enviado para um servidor
    console.log('Nova atividade:', activityData);
    setIsActivityFormOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'activities':
        return <Activities />;
      case 'financial':
        return <Financial />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configurações</h2>
            <p className="text-gray-600">Em desenvolvimento...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onNewActivity={handleNewActivity} isOnline={true} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>

      <ActivityForm
        isOpen={isActivityFormOpen}
        onClose={() => setIsActivityFormOpen(false)}
        onSave={handleSaveActivity}
      />
    </div>
  );
}

export default App;