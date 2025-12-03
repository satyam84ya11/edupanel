'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import api from '@/lib/api';
import { toast } from 'react-toastify';
import { FiDownload } from 'react-icons/fi';

export default function SalaryPage() {
  const { user } = useAuth();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [salaries, setSalaries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSalaries = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/salary/monthly/${user?.school_id}/${month}/${year}`);
      setSalaries(response.data.salaries);
    } catch (error) {
      toast.error('Failed to fetch salaries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.school_id) {
      fetchSalaries();
    }
  }, [month, year, user?.school_id]);

  const handleExportSalary = async () => {
    try {
      const response = await api.get(`/reports/salary/monthly/${user?.school_id}/${month}/${year}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `salary_${year}_${month}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentElement?.removeChild(link);
      toast.success('Salary report exported');
    } catch (error) {
      toast.error('Failed to export salary');
    }
  };

  const totalNetSalary = salaries.reduce((sum, s) => sum + s.net_salary, 0);
  const totalPaid = salaries.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.net_salary, 0);
  const totalPending = salaries.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.net_salary, 0);

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <Navbar />
          <main className="pt-24 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-dark">Salary Management</h2>
                  <p className="text-gray-600 mt-1">Track teacher salaries</p>
                </div>
                {user?.role === 'admin' && (
                  <button
                    onClick={handleExportSalary}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
                  >
                    <FiDownload size={20} />
                    Export
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Month</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
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
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  >
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-card rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm mb-2">Total Net Salary</p>
                  <p className="text-3xl font-bold text-dark">₹{totalNetSalary.toLocaleString()}</p>
                </div>
                <div className="bg-card rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm mb-2">Total Paid</p>
                  <p className="text-3xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
                </div>
                <div className="bg-card rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm mb-2">Total Pending</p>
                  <p className="text-3xl font-bold text-red-600">₹{totalPending.toLocaleString()}</p>
                </div>
              </div>

              {/* Salaries Table */}
              {isLoading ? (
                <div className="text-center py-8">Loading salaries...</div>
              ) : (
                <div className="bg-card rounded-lg shadow overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-light border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Teacher Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Base</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Bonus</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Deduction</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Net Salary</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salaries.map((salary) => (
                        <tr key={salary.id} className="border-b border-gray-200 hover:bg-light">
                          <td className="px-6 py-4 font-medium text-dark">{salary.teacher?.user?.name}</td>
                          <td className="px-6 py-4 text-gray-600">₹{salary.base_salary.toLocaleString()}</td>
                          <td className="px-6 py-4 text-gray-600">₹{salary.bonus.toLocaleString()}</td>
                          <td className="px-6 py-4 text-gray-600">₹{salary.deduction.toLocaleString()}</td>
                          <td className="px-6 py-4 font-semibold text-dark">₹{salary.net_salary.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              salary.status === 'paid' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {salary.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {salaries.length === 0 && (
                    <div className="text-center py-8 text-gray-600">
                      No salaries for this period
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
