'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import api from '@/lib/api';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiKey } from 'react-icons/fi';
import AddTeacherModal from '@/components/modals/AddTeacherModal';
import ResetPasswordModal from '@/components/modals/ResetPasswordModal';

interface Teacher {
  id: number;
  user_id: number;
  name: string;
  email: string;
  subject: string;
  salary: number;
  join_date: string;
  qualification?: string;
  is_active: boolean;
}

export default function TeachersPage() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTeachers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/teacher/list/${user?.school_id}`);
      setTeachers(response.data.teachers);
    } catch (error) {
      toast.error('Failed to fetch teachers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.school_id) {
      fetchTeachers();
    }
  }, [user?.school_id]);

  const handleAddTeacher = async () => {
    await fetchTeachers();
    setShowAddModal(false);
  };

  const handleResetPassword = async () => {
    await fetchTeachers();
    setShowResetModal(false);
  };

  const handleDeleteTeacher = async (teacherId: number) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await api.delete(`/admin/teacher/delete/${teacherId}`);
        toast.success('Teacher deleted successfully');
        await fetchTeachers();
      } catch (error) {
        toast.error('Failed to delete teacher');
      }
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <Navbar />
          <main className="pt-24 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-dark">Teachers</h2>
                  <p className="text-gray-600 mt-1">Manage school teachers</p>
                </div>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
                  >
                    <FiPlus size={20} />
                    Add Teacher
                  </button>
                )}
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>

              {/* Teachers Table */}
              {isLoading ? (
                <div className="text-center py-8">Loading teachers...</div>
              ) : (
                <div className="bg-card rounded-lg shadow overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-light border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Subject</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Salary</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Join Date</th>
                        {user?.role === 'admin' && (
                          <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTeachers.map((teacher) => (
                        <tr key={teacher.id} className="border-b border-gray-200 hover:bg-light transition-colors">
                          <td className="px-6 py-4 font-medium text-dark">{teacher.name}</td>
                          <td className="px-6 py-4 text-gray-600">{teacher.email}</td>
                          <td className="px-6 py-4 text-gray-600">{teacher.subject}</td>
                          <td className="px-6 py-4 text-gray-600">₹{teacher.salary.toLocaleString()}</td>
                          <td className="px-6 py-4 text-gray-600">{teacher.join_date}</td>
                          {user?.role === 'admin' && (
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedTeacher(teacher);
                                    setShowResetModal(true);
                                  }}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Reset Password"
                                >
                                  <FiKey size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteTeacher(teacher.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <FiTrash2 size={18} />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredTeachers.length === 0 && (
                    <div className="text-center py-8 text-gray-600">
                      {searchTerm ? 'No teachers found matching your search' : 'No teachers yet'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddTeacherModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddTeacher}
        />
      )}

      {showResetModal && selectedTeacher && (
        <ResetPasswordModal
          teacher={selectedTeacher}
          onClose={() => {
            setShowResetModal(false);
            setSelectedTeacher(null);
          }}
          onSuccess={handleResetPassword}
        />
      )}
    </ProtectedRoute>
  );
}
