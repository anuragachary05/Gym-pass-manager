import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scanner } from '@yudiel/react-qr-scanner';
import { ShieldCheck, UserCheck, XCircle, Search } from 'lucide-react';

interface ScanResult {
  status: 'idle' | 'success' | 'error';
  message: string;
}

interface JoinRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  date: string;
}

export const AdminDashboard: React.FC = () => {
  const [scanResult, setScanResult] = useState<ScanResult>({ status: 'idle', message: 'Awaiting scan...' });
  const [scannedLogs, setScannedLogs] = useState<{ id: string; time: string; timestamp: number; valid: boolean }[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Active Users Database
  const MOCK_USERS = [
    { id: 'usr_001', name: 'John Doe', email: 'john@example.com', plan: 'Pro', status: 'Active' },
    { id: 'usr_002', name: 'Jane Smith', email: 'jane@example.com', plan: 'Elite', status: 'Active' },
    { id: 'usr_003', name: 'Mike Johnson', email: 'mike@example.com', plan: 'Basic', status: 'Inactive' },
    { id: 'usr_004', name: 'Sarah Wilson', email: 'sarah@example.com', plan: 'Pro', status: 'Active' },
    { id: 'usr_005', name: 'Tom Brown', email: 'tom@example.com', plan: 'Basic', status: 'Active' },
  ];

  const filteredUsers = MOCK_USERS.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchRequests = () => {
      const data = JSON.parse(localStorage.getItem('gym_join_requests') || '[]');
      setJoinRequests(data);
    };
    fetchRequests();
    const interval = setInterval(fetchRequests, 2000); // Poll for changes
    return () => clearInterval(interval);
  }, []);

  const handleScan = (result: any) => {
    if (result && result.length > 0 && result[0].rawValue) {
      try {
        const data = JSON.parse(result[0].rawValue);
        if (data.uid) {
          // Check if already scanned today (mock logic)
          const isScanned = scannedLogs.some((log) => log.id === data.uid);
          
          if (isScanned) {
            setScanResult({ status: 'error', message: 'Error: User already checked in today.' });
            
            // Add denied log, avoid spam if they hold the phone
            setScannedLogs(prev => {
              if (prev[0]?.id === data.uid && !prev[0]?.valid && (Date.now() - prev[0].timestamp < 3000)) {
                 return prev; 
              }
              return [{
                id: data.uid,
                time: new Date().toLocaleTimeString(),
                timestamp: Date.now(),
                valid: false
              }, ...prev];
            });
          } else {
            setScanResult({ status: 'success', message: `Success: Check-in confirmed for ${data.uid}.` });
            setScannedLogs(prev => [{
              id: data.uid,
              time: new Date().toLocaleTimeString(),
              timestamp: Date.now(),
              valid: true
            }, ...prev]);
          }

          // Reset status after 3 seconds
          setTimeout(() => setScanResult({ status: 'idle', message: 'Awaiting scan...' }), 3000);
        }
      } catch (e) {
        setScanResult({ status: 'error', message: 'Invalid QR Code Format' });
        setTimeout(() => setScanResult({ status: 'idle', message: 'Awaiting scan...' }), 3000);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white">Entry Scanner</h1>
        <p className="text-slate-400 mt-1">Point the camera at member QR codes to check them in.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        >
          <div className="bg-slate-900/80 p-4 border-b border-slate-700/50 flex justify-between items-center">
            <div className="flex items-center text-slate-300 font-medium">
              <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
              Live Scanner
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
              scanResult.status === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
              scanResult.status === 'error' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
              'bg-blue-500/20 text-blue-400 border-blue-500/30'
            }`}>
              {scanResult.status.toUpperCase()}
            </div>
          </div>
          
          <div className="flex-1 bg-black relative min-h-[400px]">
            <Scanner
              onScan={handleScan}
              classNames={{
                container: 'absolute inset-0 w-full h-full object-cover',
                video: 'absolute inset-0 w-full h-full object-cover object-center'
              }}
              allowMultiple={true}
              scanDelay={2000}
            />
            {/* Scanner Overlay UI */}
            <div className="absolute inset-0 pointer-events-none border-[40px] border-black/40 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-primary/50 relative overflow-hidden">
                {/* Laser animation */}
                <motion.div 
                  animate={{ y: [0, 256, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-0 left-0 right-0 h-1 bg-primary shadow-[0_0_15px_rgba(236,72,153,1)] z-10"
                />
                
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
              </div>
            </div>
          </div>

          <div className={`p-4 text-center font-medium ${
            scanResult.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
            scanResult.status === 'error' ? 'bg-red-500/10 text-red-400' :
            'bg-slate-800/50 text-slate-400'
          }`}>
            {scanResult.message}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Today's Check-ins</h2>
          
          {scannedLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <UserCheck className="w-12 h-12 mb-3 opacity-20" />
              <p>No members scanned yet today.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {scannedLogs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`bg-slate-800/50 rounded-xl p-4 flex items-center justify-between border ${log.valid ? 'border-emerald-500/20' : 'border-red-500/20'}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${log.valid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {log.valid ? <UserCheck className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{log.id}</p>
                      <p className="text-sm text-slate-400">{log.time}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${log.valid ? 'text-emerald-400' : 'text-red-400'}`}>
                    {log.valid ? 'Verified' : 'Denied'}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* New Membership Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 glass rounded-2xl p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-6">New Membership Requests</h2>
        {joinRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-slate-500">
            <p>No new requests pending.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {joinRequests.map(req => (
              <div key={req.id} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-primary/50 flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-white">{req.name}</h3>
                    <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded-full">{req.plan}</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400 mb-6">
                    <p><strong>Email:</strong> {req.email}</p>
                    <p><strong>Phone:</strong> {req.phone}</p>
                    <p><strong>Date applied:</strong> {req.date}</p>
                  </div>
                </div>
                <div className="mt-auto flex gap-2 pt-4 border-t border-slate-700/50">
                  <button onClick={() => {
                    const updated = joinRequests.filter(r => r.id !== req.id);
                    setJoinRequests(updated);
                    localStorage.setItem('gym_join_requests', JSON.stringify(updated));
                  }} className="flex-1 py-2 text-sm font-medium bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors">
                    Approve
                  </button>
                  <button onClick={() => {
                    const updated = joinRequests.filter(r => r.id !== req.id);
                    setJoinRequests(updated);
                    localStorage.setItem('gym_join_requests', JSON.stringify(updated));
                  }} className="flex-1 py-2 text-sm font-medium bg-slate-700/50 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Active Users Directory */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 glass rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold text-white">Member Directory</h2>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 block w-full pl-10 sm:text-sm rounded-lg focus:ring-primary focus:border-primary text-white py-2 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="py-3 px-4 text-sm font-semibold text-slate-300">Name</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-300">User ID</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-300">Plan</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">
                    No members found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-xs text-slate-400">{user.email}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-400">{user.id}</td>
                    <td className="py-3 px-4">
                      <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded-full">{user.plan}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${user.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
