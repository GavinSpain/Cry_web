import React from 'react';
import { 
  TrendingUp, 
  AlertOctagon, 
  X, 
  Bot, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import ServiceHealthMonitor from './ServiceHealthMonitor';

// Dummy data for demonstration
const portfolioStats = {
  totalValue: '$273,197',
  dailyChange: '+$12,453 (4.8%)',
  weeklyChange: '+$31,245 (12.9%)',
  monthlyChange: '+$98,756 (56.7%)',
  activeAgents: 5,
  totalTrades: 127,
  successRate: '76%',
  avgProfitPerTrade: '+$342'
};

const activeTrades = [
  { id: 1, pair: 'BTC/USDT', type: 'LONG', entryPrice: '$45,678', currentPrice: '$46,234', pnl: '+$556', strategy: 'MA Crossover', agent: 'Agent #1' },
  { id: 2, pair: 'ETH/USDT', type: 'SHORT', entryPrice: '$2,345', currentPrice: '$2,298', pnl: '+$470', strategy: 'RSI Bounce', agent: 'Agent #2' },
  { id: 3, pair: 'SOL/USDT', type: 'LONG', entryPrice: '$98.45', currentPrice: '$102.30', pnl: '+$385', strategy: 'Volume Breakout', agent: 'Agent #3' }
];

const closedTrades = [
  { id: 1, pair: 'BTC/USDT', type: 'LONG', entryPrice: '$44,567', exitPrice: '$46,789', pnl: '+$2,222', strategy: 'MA Crossover', agent: 'Agent #1' },
  { id: 2, pair: 'ETH/USDT', type: 'SHORT', entryPrice: '$2,456', exitPrice: '$2,234', pnl: '+$222', strategy: 'RSI Bounce', agent: 'Agent #2' },
  { id: 3, pair: 'SOL/USDT', type: 'LONG', entryPrice: '$89.45', exitPrice: '$95.67', pnl: '+$622', strategy: 'Volume Breakout', agent: 'Agent #1' }
];

const tradingOptions = [
  { id: 1, pair: 'BTC/USDT', signal: 'Pending', strategy: 'MA Crossover', agent: 'Agent #1', condition: 'Waiting for MA cross' },
  { id: 2, pair: 'ETH/USDT', signal: 'Pending', strategy: 'RSI Bounce', agent: 'Agent #2', condition: 'RSI approaching oversold' },
  { id: 3, pair: 'SOL/USDT', signal: 'Pending', strategy: 'Volume Breakout', agent: 'Agent #3', condition: 'Volume building up' }
];

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Financial Information */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Portfolio Overview</h3>
            <TrendingUp size={24} className="text-blue-500" />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm">Total Value</p>
              <p className="text-2xl font-bold">{portfolioStats.totalValue}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-gray-400">24h</p>
                <p className="text-green-500">{portfolioStats.dailyChange}</p>
              </div>
              <div>
                <p className="text-gray-400">7d</p>
                <p className="text-green-500">{portfolioStats.weeklyChange}</p>
              </div>
              <div>
                <p className="text-gray-400">30d</p>
                <p className="text-green-500">{portfolioStats.monthlyChange}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Statistics */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Agent Statistics</h3>
            <Bot size={24} className="text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-gray-400 text-sm">Active Agents</p>
                <p className="text-xl font-bold">{portfolioStats.activeAgents}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Trades</p>
                <p className="text-xl font-bold">{portfolioStats.totalTrades}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-gray-400 text-sm">Success Rate</p>
                <p className="text-xl font-bold text-green-500">{portfolioStats.successRate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Avg Profit</p>
                <p className="text-xl font-bold text-green-500">{portfolioStats.avgProfitPerTrade}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Health */}
        <ServiceHealthMonitor />

        {/* Emergency Controls */}
        <div className="bg-gray-800 p-6 rounded-lg flex flex-col space-y-2">
          <button className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2">
            <AlertOctagon size={20} />
            <span>Stop New Trades</span>
          </button>
          <button className="w-full bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2">
            <X size={20} />
            <span>Close All Trades</span>
          </button>
        </div>
      </div>

      {/* Active Trades */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Active Trades</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">Pair</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Entry Price</th>
                <th className="pb-4">Current Price</th>
                <th className="pb-4">PnL</th>
                <th className="pb-4">Strategy</th>
                <th className="pb-4">Agent</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeTrades.map(trade => (
                <tr key={trade.id} className="border-t border-gray-700">
                  <td className="py-4">{trade.pair}</td>
                  <td className={`py-4 ${trade.type === 'LONG' ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.type}
                  </td>
                  <td className="py-4">{trade.entryPrice}</td>
                  <td className="py-4">{trade.currentPrice}</td>
                  <td className={`py-4 ${trade.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.pnl}
                  </td>
                  <td className="py-4">{trade.strategy}</td>
                  <td className="py-4">{trade.agent}</td>
                  <td className="py-4">
                    <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                      Close Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Closed Trades */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Closed Trades</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">Pair</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Entry Price</th>
                <th className="pb-4">Exit Price</th>
                <th className="pb-4">PnL</th>
                <th className="pb-4">Strategy</th>
                <th className="pb-4">Agent</th>
              </tr>
            </thead>
            <tbody>
              {closedTrades.map(trade => (
                <tr key={trade.id} className="border-t border-gray-700">
                  <td className="py-4">{trade.pair}</td>
                  <td className={`py-4 ${trade.type === 'LONG' ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.type}
                  </td>
                  <td className="py-4">{trade.entryPrice}</td>
                  <td className="py-4">{trade.exitPrice}</td>
                  <td className={`py-4 ${trade.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.pnl}
                  </td>
                  <td className="py-4">{trade.strategy}</td>
                  <td className="py-4">{trade.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trading Options */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Trading Options</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">Pair</th>
                <th className="pb-4">Signal</th>
                <th className="pb-4">Strategy</th>
                <th className="pb-4">Agent</th>
                <th className="pb-4">Condition</th>
              </tr>
            </thead>
            <tbody>
              {tradingOptions.map(option => (
                <tr key={option.id} className="border-t border-gray-700">
                  <td className="py-4">{option.pair}</td>
                  <td className="py-4 text-yellow-500">{option.signal}</td>
                  <td className="py-4">{option.strategy}</td>
                  <td className="py-4">{option.agent}</td>
                  <td className="py-4 text-gray-400">{option.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;