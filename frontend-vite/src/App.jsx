import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Unauthorized from './pages/Unauthorized'
import Admin from './pages/dashboards/Admin'
import Faculty from './pages/dashboards/Faculty'
import Staff from './pages/dashboards/Staff'
import Student from './pages/dashboards/Student'
import ProtectedRoute from './routes/ProtectedRoute'

// CRUD placeholders
import StudentsList from './pages/Students/StudentsList'
import FacultiesList from './pages/Faculty/FacultiesList'
import StaffList from './pages/Staff/StaffList'
import FeesList from './pages/Fees/FeesList'
import SalaryList from './pages/Salary/SalaryList'
import AttendanceList from './pages/Attendance/AttendanceList'
import ReportsList from './pages/Reports/ReportsList'
import SettingsPage from './pages/Settings/SettingsPage'

export default function App(){
  return (
    <Routes>
      <Route path='/' element={<Login/>} />

      <Route path='/unauthorized' element={<Unauthorized/>} />

      <Route path='/dashboard/admin' element={<ProtectedRoute allowedRoles={["admin"]}><Admin/></ProtectedRoute>} />
      <Route path='/dashboard/faculty' element={<ProtectedRoute allowedRoles={["faculty"]}><Faculty/></ProtectedRoute>} />
      <Route path='/dashboard/staff' element={<ProtectedRoute allowedRoles={["staff"]}><Staff/></ProtectedRoute>} />
      <Route path='/dashboard/student' element={<ProtectedRoute allowedRoles={["student"]}><Student/></ProtectedRoute>} />

      <Route path='/students' element={<ProtectedRoute allowedRoles={["admin","faculty"]}><StudentsList/></ProtectedRoute>} />
      <Route path='/faculty' element={<ProtectedRoute allowedRoles={["admin"]}><FacultiesList/></ProtectedRoute>} />
      <Route path='/staff' element={<ProtectedRoute allowedRoles={["admin"]}><StaffList/></ProtectedRoute>} />
      <Route path='/fees' element={<ProtectedRoute allowedRoles={["admin"]}><FeesList/></ProtectedRoute>} />
      <Route path='/salary' element={<ProtectedRoute allowedRoles={["admin"]}><SalaryList/></ProtectedRoute>} />
      <Route path='/attendance' element={<ProtectedRoute allowedRoles={["admin","faculty","staff"]}><AttendanceList/></ProtectedRoute>} />
      <Route path='/reports' element={<ProtectedRoute allowedRoles={["admin","faculty"]}><ReportsList/></ProtectedRoute>} />
      <Route path='/settings' element={<ProtectedRoute allowedRoles={["admin"]}><SettingsPage/></ProtectedRoute>} />

      {/* Add other routes: fees, salary, attendance, reports, settings */}
    </Routes>
  )
}
