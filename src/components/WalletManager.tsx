import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

// Dummy data for demonstration
const wallets = [
  { id: 1, name: 'Main Trading', balance: '2.5432 BTC', value: '$125,432', change: '+5.2%' },
  { id: 2, name: 'ETH Holdings', balance: '45.234 ETH', value: '$98,765', change: '-2.1%' },
  { id: 3, name: 'USDT Reserve', balance: '50,000 USDT', value: '$50,000', change: '0%' }
];

const recentTransactions = [
  { id: 1, type: 'BUY', asset: 'BTC', amount: '0.1234', price: '$45,678', time: '2 mins ago' },
  { id: 2, type: 'SELL', asset: 'ETH', amount: '2.5', price: '$5,432', time: '15 mins ago' },
  { id: 3, type: 'TRANSFER', asset: 'USDT', amount: '1,000', price: '$1,000', time: '1 hour ago' }
];

function WalletManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Wallet Manager</h2>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
          <RefreshCw size={16} />
          <span>Refresh Balances</span>
        </button>
      </div>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets.map(wallet => (
          <div key={wallet.id} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Wallet size={24} className="text-blue-500" />
                <h3 className="text-lg font-semibold">{wallet.name}</h3>
              </div>
              <span className={`text-sm ${wallet.change.startsWith('+') ? 'text-green-500' : wallet.change.startsWith('-') ? 'text-red-500' : 'text-gray-400'}`}>
                {wallet.change}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{wallet.balance}</p>
              <p className="text-gray-400">{wallet.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Quick Transfer</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">From Wallet</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
                <option>Main Trading</option>
                <option>ETH Holdings</option>
                <option>USDT Reserve</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">To Wallet</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
                <option>ETH Holdings</option>
                <option>Main Trading</option>
                <option>USDT Reserve</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Amount</label>
              <input 
                type="text" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                placeholder="Enter amount..."
              />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
              Transfer Funds
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {tx.type === 'BUY' && <ArrowDownRight size={20} className="text-green-500" />}
                  {tx.type === 'SELL' && <ArrowUpRight size={20} className="text-red-500" />}
                  {tx.type === 'TRANSFER' && <RefreshCw size={20} className="text-blue-500" />}
                  <div>
                    <p className="font-medium">{tx.type} {tx.asset}</p>
                    <p className="text-sm text-gray-400">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{tx.amount}</p>
                  <p className="text-sm text-gray-400">{tx.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletManager;