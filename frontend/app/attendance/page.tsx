'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import api from '@/lib/api';
import { toast } from 'react-toastify';

export default function AttendancePage() {
  const { user } = useAuth();
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attendance, setAttendance] = useState<Record<number, string>>({});

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/student/list/${user?.school_id}`);
      setStudents(response.data.students);
      
      // Fetch today's attendance
      const attendanceResponse = await api.get(`/attendance/student/today/${user?.school_id}`);
      const attendanceMap: Record<number, string> = {};
      attendanceResponse.data.attendance.forEach((rec: any) => {
        attendanceMap[rec.student_id] = rec.status;
      });
      setAttendance(attendanceMap);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.school_id) {
      fetchStudents();
    }
  }, [user?.school_id]);

  const handleMarkAttendance = (studentId: number, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = async () => {
    try {
      for (const [studentId, status] of Object.entries(attendance)) {
        await api.post('/attendance/student/mark', {
          school_id: user?.school_id,
          student_id: parseInt(studentId),
          attendance_date: attendanceDate,
          status,
        });
      }
      toast.success('Attendance saved successfully');
    } catch (error) {
      toast.error('Failed to save attendance');
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
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-dark">Attendance</h2>
                  <p className="text-gray-600 mt-1">Mark student attendance</p>
                </div>
              </div>

              {/* Date Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark mb-2">Date</label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Attendance Table */}
              {isLoading ? (
                <div className="text-center py-8">Loading students...</div>
              ) : (
                <div className="bg-card rounded-lg shadow overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-light border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Roll Number</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Class</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} className="border-b border-gray-200 hover:bg-light">
                          <td className="px-6 py-4 font-medium text-dark">{student.roll_number}</td>
                          <td className="px-6 py-4 text-dark">{student.name}</td>
                          <td className="px-6 py-4 text-gray-600">{student.class}</td>
                          <td className="px-6 py-4">
                            <select
                              value={attendance[student.id] || 'present'}
                              onChange={(e) => handleMarkAttendance(student.id, e.target.value)}
                              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            >
                              <option value="present">Present</option>
                              <option value="absent">Absent</option>
                              <option value="leave">Leave</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
                >
                  Save Attendance
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
