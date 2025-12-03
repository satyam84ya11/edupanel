'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';

interface Teacher {
  id: number;
  name: string;
  email: string;
}

interface ResetPasswordModalProps {
  teacher: Teacher;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ResetPasswordModal({
  teacher,
  onClose,
  onSuccess,
}: ResetPasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      await api.post(`/admin/teacher/reset-password/${teacher.id}`, {
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      toast.success(`Password reset successfully for ${teacher.name}`);
      onSuccess();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to reset password';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-dark">Reset Password</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-light rounded-lg transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-light p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600">Resetting password for:</p>
            <p className="font-semibold text-dark">{teacher.name}</p>
            <p className="text-sm text-gray-600">{teacher.email}</p>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">New Password *</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Min 8 characters"
              disabled={isLoading}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Confirm Password *</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Confirm password"
              disabled={isLoading}
            />
          </div>

          {/* Info */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ The teacher will need to use the new password to log in next time.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-light transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
