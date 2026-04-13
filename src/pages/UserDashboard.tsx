import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Calendar, Clock, Activity, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UserDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Mock data for the UI
  const planData = {
    type: 'Premium Platium',
    validUntil: '2026-12-31',
    status: 'Active',
    lastVisit: 'Today, 08:30 AM'
  };

  const qrValue = JSON.stringify({
    uid: currentUser?.uid || 'demo-user-123',
    timestamp: Date.now()
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, Athlete!</h1>
          <p className="text-slate-400 mt-1">Ready to crush your goals today?</p>
        </div>
        <div className="hidden sm:block">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 mr-1" />
            {planData.status} Setup
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-xl font-semibold text-white mb-6 z-10">Your Gym Pass</h2>
            
            {/* Animated Border Container */}
            <div className="relative p-1 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300 z-10 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              
              {/* Rotating Gradient Component */}
              <div className="absolute -inset-[50%] w-[200%] h-[200%]">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-full"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0 280deg, #ec4899 360deg)'
                  }}
                />
              </div>
              
              {/* Inner White Container */}
              <div className="relative bg-white p-4 rounded-xl z-10 flex items-center justify-center">
                <QRCodeSVG 
                  value={qrValue} 
                  size={200}
                  level="H"
                  fgColor="#0f172a"
                />
              </div>
            </div>
            
            {/* Ambient pulse effect behind QR code */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }} 
                 transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} 
                 className="w-56 h-56 rounded-full border-2 border-primary" 
               />
            </div>
            
            <p className="mt-6 text-sm text-slate-400 text-center max-w-[250px] z-10">
              Scan this QR code at the reception scanner to check in securely.
            </p>
          </div>
        </motion.div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="glass rounded-2xl p-6 border-l-4 border-l-primary">
              <div className="flex items-center">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-400">Current Plan</p>
                  <h3 className="text-xl font-bold text-white">{planData.type}</h3>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border-l-4 border-l-blue-500">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-400">Valid Until</p>
                  <h3 className="text-xl font-bold text-white">{planData.validUntil}</h3>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border-l-4 border-l-emerald-500">
              <div className="flex items-center">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-slate-400">Last Check-in</p>
                  <h3 className="text-lg font-bold text-white truncate">{planData.lastVisit}</h3>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border-l-4 border-l-orange-500">
              <div className="flex items-center">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Flame className="w-6 h-6 text-orange-400" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-slate-400">Daily Streak</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h3 className="text-lg font-bold text-white">12 Days</h3>
                    <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse flex-shrink-0">
                      Top 5%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-medium text-white mb-4">Recent Actvity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span className="text-slate-300">Gym Entry Confirmed</span>
                  </div>
                  <span className="text-sm text-slate-400">
                    {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
