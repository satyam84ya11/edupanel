'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import api from '@/lib/api';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

interface Student {
  id: number;
  name: string;
  email: string;
  roll_number: string;
  class: string;
  section: string;
  phone: string;
  parent_phone: string;
  is_active: boolean;
}

export default function StudentsPage() {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roll_number: '',
    class: '',
    section: '',
    phone: '',
    parent_phone: '',
  });

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/student/list/${user?.school_id}`);
      setStudents(response.data.students);
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.school_id) {
      fetchStudents();
    }
  }, [user?.school_id]);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.roll_number || !formData.class) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      await api.post('/student/add', {
        school_id: user?.school_id,
        ...formData,
      });

      toast.success('Student added successfully');
      setFormData({
        name: '',
        email: '',
        roll_number: '',
        class: '',
        section: '',
        phone: '',
        parent_phone: '',
      });
      setShowAddForm(false);
      await fetchStudents();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to add student');
    }
  };

  const handleDeleteStudent = async (studentId: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.delete(`/student/delete/${studentId}`);
        toast.success('Student deleted successfully');
        await fetchStudents();
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <h2 className="text-3xl font-bold text-dark">Students</h2>
                  <p className="text-gray-600 mt-1">Manage all students</p>
                </div>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
                  >
                    <FiPlus size={20} />
                    Add Student
                  </button>
                )}
              </div>

              {/* Add Form */}
              {showAddForm && user?.role === 'admin' && (
                <div className="bg-card rounded-lg shadow p-6 mb-6">
                  <h3 className="text-lg font-bold text-dark mb-4">Add New Student</h3>
                  <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Roll Number *"
                      value={formData.roll_number}
                      onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Class *"
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Section"
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Parent Phone"
                      value={formData.parent_phone}
                      onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none md:col-span-2"
                    />
                    <div className="md:col-span-2 flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
                      >
                        Add Student
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-light transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Students Table */}
              {isLoading ? (
                <div className="text-center py-8">Loading students...</div>
              ) : (
                <div className="bg-card rounded-lg shadow overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-light border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Roll Number</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Class</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Phone</th>
                        {user?.role === 'admin' && (
                          <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b border-gray-200 hover:bg-light">
                          <td className="px-6 py-4 font-medium text-dark">{student.name}</td>
                          <td className="px-6 py-4 text-gray-600">{student.roll_number}</td>
                          <td className="px-6 py-4 text-gray-600">{student.class}</td>
                          <td className="px-6 py-4 text-gray-600">{student.email || '-'}</td>
                          <td className="px-6 py-4 text-gray-600">{student.phone || '-'}</td>
                          {user?.role === 'admin' && (
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleDeleteStudent(student.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredStudents.length === 0 && (
                    <div className="text-center py-8 text-gray-600">
                      {searchTerm ? 'No students found' : 'No students yet'}
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
