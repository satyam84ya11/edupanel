import React from 'react'
import Topbar from '../../components/Topbar'
import Sidebar from '../../components/Sidebar'

export default function Student(){
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar role="student" />
      <div className="flex-1">
        <Topbar />
        <main className="p-6">
          <h2 className="text-xl font-semibold">Student Dashboard</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">Report Card (PDF)</div>
            <div className="card">Fee Status</div>
            <div className="card">Attendance Summary</div>
            <div className="card">Uploaded Documents</div>
          </div>
        </main>
      </div>
    </div>
  )
}
