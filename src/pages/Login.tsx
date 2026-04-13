import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, Mail, Lock, ArrowRight, UserCog, 
  CheckCircle, MapPin, Phone, Dumbbell, ShieldCheck, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const plans = [
  { name: 'Basic', price: '$29/mo', features: ['Gym Access', 'Locker Room', 'Free Weights Area', '1 Free Session'] },
  { name: 'Pro', price: '$49/mo', popular: true, features: ['Everything in Basic', 'Group Classes', 'Pool Access', 'Guest Pass'] },
  { name: 'Elite', price: '$89/mo', features: ['Everything in Pro', 'Personal Trainer', 'Sauna & Spa', 'Nutrition Plan'] }
];

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlanForJoin, setSelectedPlanForJoin] = useState<string | null>(null);
  const [joinForm, setJoinForm] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { mockLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) {
      mockLogin('admin');
      navigate('/admin');
    } else {
      mockLogin('user');
      navigate('/dashboard');
    }
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      id: Date.now().toString(),
      name: joinForm.name,
      email: joinForm.email,
      phone: joinForm.phone,
      plan: selectedPlanForJoin,
      date: new Date().toLocaleDateString()
    };
    
    // Store in LocalStorage as Mock DB
    const existing = JSON.parse(localStorage.getItem('gym_join_requests') || '[]');
    localStorage.setItem('gym_join_requests', JSON.stringify([newRequest, ...existing]));
    
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setSelectedPlanForJoin(null);
      setJoinForm({ name: '', email: '', phone: '' });
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 font-sans">
      {/* ===== HERO / LOGIN SECTION ===== */}
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-darker/80 backdrop-blur-sm z-0" />
        
        <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 pt-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-center"
          >
            <div className="rounded-full bg-primary/20 p-4 ring-1 ring-primary/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <Activity className="h-12 w-12 text-primary" />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-center text-4xl font-extrabold text-white tracking-tight"
          >
            FitSync
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-center text-sm text-slate-400"
          >
            Sign in to access your digital pass, or scroll down to explore our plans.
          </motion.p>
        </div>

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 pb-10"
        >
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)" }}
            transition={{ duration: 0.3 }}
            className="glass py-8 px-4 sm:rounded-2xl sm:px-10 border border-slate-700/50 shadow-2xl shadow-primary/10"
          >
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800/50 border border-slate-700 block w-full pl-10 sm:text-sm rounded-lg focus:ring-primary focus:border-primary text-white py-2.5 transition-colors"
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-800/50 border border-slate-700 block w-full pl-10 sm:text-sm rounded-lg focus:ring-primary focus:border-primary text-white py-2.5 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button type="submit" className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-primary hover:bg-pink-600 transition-all hover:scale-[1.02] active:scale-95">
                  Sign In to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-slate-400 glass rounded-full text-xs">Fast Demo Actions</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={() => { mockLogin('user'); navigate('/dashboard'); }} className="w-full inline-flex justify-center py-2 px-4 border border-slate-700 rounded-lg shadow-sm bg-slate-800 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors">
                  Mock User
                </button>
                <button onClick={() => { mockLogin('admin'); navigate('/admin'); }} className="w-full inline-flex justify-center py-2 px-4 border border-slate-700 hover:border-primary/50 hover:text-primary rounded-lg shadow-sm bg-slate-800 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors">
                  <UserCog className="mr-2 h-4 w-4" /> Mock Admin
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== AVAILABLE PLANS ===== */}
      <section className="py-24 bg-slate-900 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Available Plans</h2>
            <p className="mt-4 text-lg text-slate-400">Choose the perfect membership to hit your goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <motion.div 
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group w-full h-[450px]"
                style={{ perspective: "1000px" }}
              >
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* FRONT FACE */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl glass [backface-visibility:hidden] ${plan.popular ? 'border-primary shadow-[0_0_20px_rgba(236,72,153,0.15)]' : 'border-slate-700'}`}>
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                        Most Popular
                      </div>
                    )}
                    <Activity className={`w-16 h-16 mb-6 ${plan.popular ? 'text-primary' : 'text-slate-400'}`} />
                    <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline text-white mb-6">
                      <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                    </div>
                    <p className="text-slate-400 text-center font-medium mt-auto flex flex-col items-center">
                      Hover to view full benefits
                      <ArrowRight className="w-5 h-5 mt-2 animate-bounce opacity-50" />
                    </p>
                  </div>

                  {/* BACK FACE */}
                  <div className={`absolute inset-0 flex flex-col p-8 rounded-3xl glass [backface-visibility:hidden] [transform:rotateY(180deg)] ${plan.popular ? 'border-primary shadow-xl shadow-primary/20 bg-primary/5' : 'border-slate-700'}`}>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">{plan.name} Includes:</h3>
                    <ul className="space-y-4 flex-1 mt-2">
                      {plan.features.map(feat => (
                        <li key={feat} className="flex items-center text-slate-300">
                          <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => setSelectedPlanForJoin(plan.name)}
                      className={`mt-auto w-full py-3 px-4 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 hover:bg-pink-600 ${plan.popular ? 'bg-primary text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]' : 'bg-slate-800 text-white hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] border border-slate-700 hover:border-transparent'}`}
                    >
                      Select Plan
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GYM DETAILS ===== */}
      <section className="py-24 bg-darker px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">Why Choose FitSync?</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                We provide a state-of-the-art facility equipped with the latest modern machinery, a robust digital app for seamless QR-based entry, and an inspiring community to push your limits.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <Dumbbell className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-white">Premium Equipment</h4>
                    <p className="mt-1 text-slate-400">Over 10,000 sq.ft of pure elite iron and modern cardio machines.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <ShieldCheck className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-white">Digital Smart Entry</h4>
                    <p className="mt-1 text-slate-400">No more lost cards. Just scan your secure digital QR pass at the gate.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl glass"
            >
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" 
                alt="Gym Interior" 
                className="w-full h-full object-cover opacity-80"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT US FOOTER ===== */}
      <footer className="bg-black py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl tracking-tight text-white">FitSync</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              Your ultimate fitness destination. Empowering you to reach your peak potential with modern tech and world-class facilities.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-slate-400">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>123 Iron Avenue, Muscle Beach<br/>Los Angeles, CA 90210</span>
              </li>
              <li className="flex items-center text-slate-400">
                <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-slate-400">
                <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span>hello@fitsync.example.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Opening Hours</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="font-medium text-white">5:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium text-white">6:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium text-white">8:00 AM - 8:00 PM</span>
              </li>
            </ul>
            <div className="mt-8 flex space-x-4">
              {/* Social icons removed due to library version compatibility */}
            </div>
          </div>
          
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} FitSync Gym Application. All rights reserved.
        </div>
      </footer>

      {/* JOIN PLAN MODAL */}
      {selectedPlanForJoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !formSubmitted && setSelectedPlanForJoin(null)} />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass relative w-full max-w-md p-8 rounded-3xl shadow-2xl border border-slate-700/50 z-10"
          >
            <button 
              onClick={() => setSelectedPlanForJoin(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {formSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Request Submitted!</h3>
                <p className="text-slate-400">Our team will contact you shortly to complete your {selectedPlanForJoin} setup.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-2">Join {selectedPlanForJoin} Plan</h3>
                <p className="text-slate-400 text-sm mb-6">Fill in your details below to request membership.</p>
                
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={joinForm.name}
                      onChange={(e) => setJoinForm({...joinForm, name: e.target.value})}
                      className="bg-slate-800/50 border border-slate-700 block w-full sm:text-sm rounded-lg focus:ring-primary focus:border-primary text-white py-2.5 px-3 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={joinForm.email}
                      onChange={(e) => setJoinForm({...joinForm, email: e.target.value})}
                      className="bg-slate-800/50 border border-slate-700 block w-full sm:text-sm rounded-lg focus:ring-primary focus:border-primary text-white py-2.5 px-3 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={joinForm.phone}
                      onChange={(e) => setJoinForm({...joinForm, phone: e.target.value})}
                      className="bg-slate-800/50 border border-slate-700 block w-full sm:text-sm rounded-lg focus:ring-primary focus:border-primary text-white py-2.5 px-3 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <button type="submit" className="w-full mt-4 flex justify-center py-3 px-4 rounded-lg font-bold text-white bg-primary hover:bg-pink-600 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                    Submit Request
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
