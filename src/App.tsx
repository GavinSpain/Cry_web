import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Bot, 
  LineChart, 
  Settings as SettingsIcon,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import WalletManager from './components/WalletManager';
import AgentControl from './components/AgentControl';
import StrategyManager from './components/StrategyManager';
import TradeMonitor from './components/TradeMonitor';
import SettingsPanel from './components/Settings';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderView = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'wallet':
        return <WalletManager />;
      case 'agents':
        return <AgentControl />;
      case 'strategies':
        return <StrategyManager />;
      case 'trades':
        return <TradeMonitor />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <div className="w-64 h-full bg-gray-800 p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">CryptoTrader Pro</h1>
            <button 
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${currentView === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setCurrentView('wallet')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${currentView === 'wallet' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <Wallet size={20} />
              <span>Wallet</span>
            </button>
            <button
              onClick={() => setCurrentView('agents')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${currentView === 'agents' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <Bot size={20} />
              <span>Agents</span>
            </button>
            <button
              onClick={() => setCurrentView('strategies')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${currentView === 'strategies' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <TrendingUp size={20} />
              <span>Strategies</span>
            </button>
            <button
              onClick={() => setCurrentView('trades')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${currentView === 'trades' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <LineChart size={20} />
              <span>Trades</span>
            </button>
            <button
              onClick={() => setCurrentView('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${currentView === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <SettingsIcon size={20} />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <button 
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, Admin</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {renderView()}
        </div>
      </div>
    </div>
  );
}

export default App;