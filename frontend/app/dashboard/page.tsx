'use client';

import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { FiUsers, FiBook, FiDollarSign, FiBarChart3 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    totalFees: 0,
    totalSalary: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, teachersRes] = await Promise.all([
          api.get(`/student/list/${user?.school_id}`),
          api.get(`/teacher/list/${user?.school_id}`),
        ]);

        setStats({
          students: studentsRes.data.students.length,
          teachers: teachersRes.data.teachers.length,
          totalFees: 0,
          totalSalary: 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats', error);
      }
    };

    if (user?.school_id) {
      fetchStats();
    }
  }, [user?.school_id]);

  const statCards: StatCard[] = [
    {
      label: 'Total Students',
      value: stats.students,
      icon: <FiUsers size={32} />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Teachers',
      value: stats.teachers,
      icon: <FiBook size={32} />,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Monthly Fees',
      value: `₹${stats.totalFees.toLocaleString()}`,
      icon: <FiDollarSign size={32} />,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Monthly Salary',
      value: `₹${stats.totalSalary.toLocaleString()}`,
      icon: <FiBarChart3 size={32} />,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <Navbar />
          <main className="pt-24 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-dark">Welcome back, {user?.name}!</h1>
                <p className="text-gray-600 mt-2">Here's what's happening in your school today.</p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, index) => (
                  <div key={index} className="bg-card rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                        <p className="text-3xl font-bold text-dark mt-2">{card.value}</p>
                      </div>
                      <div className={`p-4 rounded-lg ${card.color}`}>{card.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="bg-card rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-dark mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-light rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <div>
                        <p className="text-sm font-medium text-dark">System initialized</p>
                        <p className="text-xs text-gray-600">Today</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-card rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-dark mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    {user?.role === 'admin' && (
                      <>
                        <a
                          href="/teachers"
                          className="block p-3 bg-light hover:bg-primary hover:text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          → Manage Teachers
                        </a>
                        <a
                          href="/students"
                          className="block p-3 bg-light hover:bg-primary hover:text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          → Manage Students
                        </a>
                        <a
                          href="/attendance"
                          className="block p-3 bg-light hover:bg-primary hover:text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          → Mark Attendance
                        </a>
                      </>
                    )}
                    <a
                      href="/settings"
                      className="block p-3 bg-light hover:bg-primary hover:text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      → Settings
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
