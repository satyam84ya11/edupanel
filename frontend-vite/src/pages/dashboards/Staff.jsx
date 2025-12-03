import React from 'react'
import Topbar from '../../components/Topbar'
import Sidebar from '../../components/Sidebar'

export default function Staff(){
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar role="staff" />
      <div className="flex-1">
        <Topbar />
        <main className="p-6">
          <h2 className="text-xl font-semibold">Staff Dashboard</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">Attendance</div>
            <div className="card">Duty Info</div>
            <div className="card">Salary Status</div>
          </div>
        </main>
      </div>
    </div>
  )
}
