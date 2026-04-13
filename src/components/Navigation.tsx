import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, LogOut, QrCode, LayoutDashboard, BarChart3, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navigation: React.FC = () => {
  const { currentUser, isAdmin, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!currentUser) return null;

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl tracking-tight text-white">FitSync</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {isAdmin ? (
                <>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-primary text-white'
                          : 'border-transparent text-slate-300 hover:border-slate-300 hover:text-white'
                      }`
                    }
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Scanner System
                  </NavLink>
                  <NavLink
                    to="/admin/analytics"
                    className={({ isActive }) =>
                      `inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-primary text-white'
                          : 'border-transparent text-slate-300 hover:border-slate-300 hover:text-white'
                      }`
                    }
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-primary text-white'
                        : 'border-transparent text-slate-300 hover:border-slate-300 hover:text-white'
                    }`
                  }
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  My Pass
                </NavLink>
              )}
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          <div className="hidden sm:flex sm:items-center">
            <button
              onClick={signOut}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAdmin ? (
              <>
                <NavLink
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-3 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-slate-800 text-primary border-l-4 border-primary'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                    }`
                  }
                >
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  Scanner System
                </NavLink>
                <NavLink
                  to="/admin/analytics"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-3 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-slate-800 text-primary border-l-4 border-primary'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                    }`
                  }
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Analytics
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-slate-800 text-primary border-l-4 border-primary'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                  }`
                }
              >
                <QrCode className="w-5 h-5 mr-3" />
                My Pass
              </NavLink>
            )}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                signOut();
              }}
              className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white border-l-4 border-transparent transition-colors mt-2"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
