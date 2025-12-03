'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FiHome,
  FiUsers,
  FiBook,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { useState } from 'react';

export function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: FiHome },
    { label: 'Students', href: '/students', icon: FiUsers },
    { label: 'Teachers', href: '/teachers', icon: FiBook, adminOnly: true },
    { label: 'Attendance', href: '/attendance', icon: FiCalendar },
    { label: 'Fees', href: '/fees', icon: FiDollarSign, adminOnly: true },
    { label: 'Salary', href: '/salary', icon: FiDollarSign, adminOnly: true },
    { label: 'Reports', href: '/reports', icon: FiFileText, adminOnly: true },
    { label: 'Settings', href: '/settings', icon: FiSettings },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.adminOnly && user?.role !== 'admin') {
      return false;
    }
    return true;
  });

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-primary text-white md:hidden"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-gray-200 p-6 z-30 transform transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="mb-8 pt-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
              KA
            </div>
            <span className="text-xl font-bold text-dark">Kids Academy</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="mb-8 p-4 bg-light rounded-lg">
          <p className="text-sm text-gray-600">Logged in as</p>
          <p className="font-semibold text-dark">{user?.name}</p>
          <span className="text-xs text-primary font-medium capitalize">{user?.role}</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
