import React, { useState } from 'react';
import { Wallet, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Shield, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  change: string;
  positive: boolean;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw';
  token: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  txHash: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [amount, setAmount] = useState('');

  const tokens: Token[] = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '12.4582',
      value: '$28,442.13',
      change: '+5.42%',
      positive: true
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '45,230.00',
      value: '$45,230.00',
      change: '+0.01%',
      positive: true
    },
    {
      symbol: 'WETH',
      name: 'Wrapped Ethereum',
      balance: '8.2145',
      value: '$18,752.89',
      change: '-2.14%',
      positive: false
    }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'deposit',
      token: 'ETH',
      amount: '2.5',
      status: 'completed',
      timestamp: '2 hours ago',
      txHash: '0x1a2b3c...'
    },
    {
      id: '2',
      type: 'withdraw',
      token: 'USDC',
      amount: '5000.00',
      status: 'pending',
      timestamp: '5 hours ago',
      txHash: '0x4d5e6f...'
    },
    {
      id: '3',
      type: 'deposit',
      token: 'WETH',
      amount: '1.25',
      status: 'completed',
      timestamp: '1 day ago',
      txHash: '0x7g8h9i...'
    },
    {
      id: '4',
      type: 'withdraw',
      token: 'ETH',
      amount: '0.75',
      status: 'failed',
      timestamp: '2 days ago',
      txHash: '0xjk1l2m...'
    },
    {
      id: '5',
      type: 'deposit',
      token: 'USDC',
      amount: '10000.00',
      status: 'completed',
      timestamp: '3 days ago',
      txHash: '0xn3o4p5...'
    }
  ];

  const totalValue = tokens.reduce((sum, token) => {
    return sum + parseFloat(token.value.replace('$', '').replace(',', ''));
  }, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${activeTab === 'deposit' ? 'Deposit' : 'Withdraw'} ${amount} ${selectedToken} initiated!`);
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-sm bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Web3 Vault</h1>
                <p className="text-xs text-gray-400">Secure Digital Asset Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">0x742d...5e8A</span>
                <span className="sm:hidden">Connected</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white/80 text-sm font-medium">Total Portfolio Value</h2>
              <TrendingUp className="w-5 h-5 text-white/60" />
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-300 text-sm font-medium">+$1,842.35 (2.03%)</span>
              <span className="text-white/60 text-sm">Last 24h</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Token Balances */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
              <div className="p-6 border-b border-gray-700/50">
                <h3 className="text-xl font-bold text-white">Token Balances</h3>
              </div>
              <div className="divide-y divide-gray-700/50">
                {tokens.map((token) => (
                  <div key={token.symbol} className="p-6 hover:bg-gray-700/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{token.symbol.substring(0, 2)}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{token.symbol}</h4>
                          <p className="text-gray-400 text-sm">{token.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{token.balance}</p>
                        <p className="text-gray-400 text-sm">{token.value}</p>
                      </div>
                      <div className={`text-sm font-medium px-3 py-1 rounded-full ${token.positive ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
                        {token.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
              <div className="p-6 border-b border-gray-700/50">
                <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
              </div>
              <div className="divide-y divide-gray-700/50">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-6 hover:bg-gray-700/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'deposit' ? 'bg-green-500/10' : 'bg-blue-500/10'
                        }`}>
                          {tx.type === 'deposit' ? (
                            <ArrowDownToLine className="w-5 h-5 text-green-400" />
                          ) : (
                            <ArrowUpFromLine className="w-5 h-5 text-blue-400" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-white font-semibold capitalize">{tx.type}</h4>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-400 text-sm">{tx.token}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-gray-500 text-sm font-mono">{tx.txHash}</p>
                            <span className="text-gray-600">•</span>
                            <p className="text-gray-500 text-sm">{tx.timestamp}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-white font-semibold">{tx.amount}</p>
                        <span className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusColor(tx.status)}`}>
                          {getStatusIcon(tx.status)}
                          <span className="capitalize">{tx.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Deposit/Withdraw Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex space-x-2 bg-gray-900/50 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('deposit')}
                    className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all ${
                      activeTab === 'deposit'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <ArrowDownToLine className="w-4 h-4" />
                      <span>Deposit</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('withdraw')}
                    className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all ${
                      activeTab === 'withdraw'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <ArrowUpFromLine className="w-4 h-4" />
                      <span>Withdraw</span>
                    </div>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Token
                  </label>
                  <select
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {tokens.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.symbol} - {token.balance} available
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const token = tokens.find(t => t.symbol === selectedToken);
                        if (token) setAmount(token.balance);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Available Balance</span>
                    <span className="text-white font-medium">
                      {tokens.find(t => t.symbol === selectedToken)?.balance} {selectedToken}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Network Fee</span>
                    <span className="text-white font-medium">~0.0023 ETH</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!amount || parseFloat(amount) <= 0}
                >
                  {activeTab === 'deposit' ? 'Deposit' : 'Withdraw'} {selectedToken}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Transactions are secured by smart contracts and require network confirmation
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 Web3 Vault. Secure. Decentralized. Trustless.</p>
            <p className="mt-2">Always verify transaction details before confirming.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;