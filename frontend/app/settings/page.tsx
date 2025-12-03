'use client';

import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <Navbar />
          <main className="pt-24 pb-8 px-6">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-dark">Settings</h2>
                <p className="text-gray-600 mt-1">Manage your account preferences</p>
              </div>

              {/* Profile Section */}
              <div className="bg-card rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-bold text-dark mb-4">Profile Information</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                    <input
                      type="text"
                      value={user?.role === 'admin' ? 'Administrator' : 'Teacher'}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">School ID</label>
                    <input
                      type="text"
                      value={user?.school_id || ''}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="bg-card rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-bold text-dark mb-4">Security</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Contact your administrator to change your password.
                </p>
              </div>

              {/* Account Section */}
              <div className="bg-card rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-dark mb-4">Account</h3>

                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>

              {/* System Info */}
              <div className="mt-8 bg-light p-4 rounded-lg">
                <h4 className="font-semibold text-dark mb-2">System Information</h4>
                <p className="text-sm text-gray-600">Kids Academy School Management System v1.0</p>
                <p className="text-sm text-gray-600">© 2025. All rights reserved.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
