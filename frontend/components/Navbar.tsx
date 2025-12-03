'use client';

import { useAuth } from '@/context/AuthContext';
import { FiBell, FiSettings } from 'react-icons/fi';

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 right-0 left-0 md:left-64 bg-card border-b border-gray-200 px-6 py-4 z-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-dark">Dashboard</h1>

        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="p-2 hover:bg-light rounded-lg transition-colors">
            <FiBell size={24} className="text-gray-600" />
          </button>

          {/* Settings */}
          <button className="p-2 hover:bg-light rounded-lg transition-colors">
            <FiSettings size={24} className="text-gray-600" />
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            {user?.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  );
}
