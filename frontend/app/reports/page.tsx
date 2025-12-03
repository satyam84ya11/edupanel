'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import api from '@/lib/api';
import { toast } from 'react-toastify';
import { FiDownload } from 'react-icons/fi';

export default function ReportsPage() {
  const { user } = useAuth();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async (type: 'attendance' | 'fees' | 'salary') => {
    try {
      setIsLoading(true);
      let endpoint = '';
      let fileName = '';

      if (type === 'attendance') {
        endpoint = `/reports/attendance/daily/${user?.school_id}`;
        fileName = `attendance_${new Date().toISOString().split('T')[0]}.xlsx`;
      } else if (type === 'fees') {
        endpoint = `/reports/fees/monthly/${user?.school_id}/${month}/${year}`;
        fileName = `fees_${year}_${month}.xlsx`;
      } else {
        endpoint = `/reports/salary/monthly/${user?.school_id}/${month}/${year}`;
        fileName = `salary_${year}_${month}.xlsx`;
      }

      const response = await api.get(endpoint, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentElement?.removeChild(link);

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} report exported`);
    } catch (error) {
      toast.error('Failed to export report');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <Navbar />
          <main className="pt-24 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-dark">Reports</h2>
                <p className="text-gray-600 mt-1">Generate and download reports</p>
              </div>

              {/* Report Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Daily Attendance Report */}
                <div className="bg-card rounded-lg shadow p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                      <FiDownload size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-dark">Daily Attendance</h3>
                    <p className="text-gray-600 text-sm mt-1">Export today's attendance record</p>
                  </div>
                  <button
                    onClick={() => handleExport('attendance')}
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Download'}
                  </button>
                </div>

                {/* Monthly Fees Report */}
                <div className="bg-card rounded-lg shadow p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-3">
                      <FiDownload size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-dark">Monthly Fees</h3>
                    <p className="text-gray-600 text-sm mt-1">Export fees collection report</p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Month</label>
                      <select
                        value={month}
                        onChange={(e) => setMonth(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                          <option key={m} value={m}>
                            {new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Year</label>
                      <select
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      >
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => handleExport('fees')}
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Download'}
                  </button>
                </div>

                {/* Monthly Salary Report */}
                <div className="bg-card rounded-lg shadow p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                      <FiDownload size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-dark">Monthly Salary</h3>
                    <p className="text-gray-600 text-sm mt-1">Export salary payment report</p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Month</label>
                      <select
                        value={month}
                        onChange={(e) => setMonth(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                          <option key={m} value={m}>
                            {new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Year</label>
                      <select
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      >
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => handleExport('salary')}
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Download'}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-sm text-blue-800">
                  <strong>ℹ️ Automated Reports:</strong> Reports are automatically generated and sent via email on:
                  <br />
                  • Daily at 11:59 PM: Attendance reports
                  <br />
                  • Monthly (1st at 2:00 AM): Fees reports
                  <br />
                  • Monthly (1st at 3:00 AM): Salary reports
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
