'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import api from '@/lib/api';
import { toast } from 'react-toastify';
import { FiDownload } from 'react-icons/fi';

export default function FeesPage() {
  const { user } = useAuth();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [fees, setFees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFees = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/fees/monthly/${user?.school_id}/${month}/${year}`);
      setFees(response.data.fees);
    } catch (error) {
      toast.error('Failed to fetch fees');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.school_id) {
      fetchFees();
    }
  }, [month, year, user?.school_id]);

  const handleExportFees = async () => {
    try {
      const response = await api.get(`/reports/fees/monthly/${user?.school_id}/${month}/${year}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `fees_${year}_${month}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentElement?.removeChild(link);
      toast.success('Fees report exported');
    } catch (error) {
      toast.error('Failed to export fees');
    }
  };

  const totalAmount = fees.reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = fees.reduce((sum, f) => sum + f.paid_amount, 0);
  const totalPending = totalAmount - totalPaid;

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
                  <h2 className="text-3xl font-bold text-dark">Fees Management</h2>
                  <p className="text-gray-600 mt-1">Track student fees</p>
                </div>
                {user?.role === 'admin' && (
                  <button
                    onClick={handleExportFees}
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
                  <p className="text-gray-600 text-sm mb-2">Total Amount</p>
                  <p className="text-3xl font-bold text-dark">₹{totalAmount.toLocaleString()}</p>
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

              {/* Fees Table */}
              {isLoading ? (
                <div className="text-center py-8">Loading fees...</div>
              ) : (
                <div className="bg-card rounded-lg shadow overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-light border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Student Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Amount</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Paid</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map((fee) => (
                        <tr key={fee.id} className="border-b border-gray-200 hover:bg-light">
                          <td className="px-6 py-4 font-medium text-dark">{fee.student?.name}</td>
                          <td className="px-6 py-4 text-gray-600">₹{fee.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-gray-600">₹{fee.paid_amount.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              fee.status === 'paid' ? 'bg-green-100 text-green-800' :
                              fee.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {fee.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{fee.due_date || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {fees.length === 0 && (
                    <div className="text-center py-8 text-gray-600">
                      No fees for this period
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
