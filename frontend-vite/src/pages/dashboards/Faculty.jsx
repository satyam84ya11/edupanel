import React from 'react'
import Topbar from '../../components/Topbar'
import Sidebar from '../../components/Sidebar'

export default function Faculty(){
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar role="faculty" />
      <div className="flex-1">
        <Topbar />
        <main className="p-6">
          <h2 className="text-xl font-semibold">Faculty Dashboard</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">Daily Attendance</div>
            <div className="card">Lecture Count Submission</div>
            <div className="card">Monthly Reports</div>
          </div>
        </main>
      </div>
    </div>
  )
}
