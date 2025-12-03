import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({ role }){
  const sections = {
    admin: ['Students','Faculty','Staff','Fees','Salary','Reports','Settings'],
    faculty: ['Daily Attendance','Lectures','Reports'],
    staff: ['Attendance','Duty Info','Salary'],
    student: ['Report Card','Fees','Attendance','Documents']
  }
  const items = sections[role] || []

  return (
    <aside className="w-56 bg-white border-r hidden md:block">
      <div className="p-4 border-b">
        <div className="font-semibold text-royal">Dashboard</div>
      </div>
      <nav className="p-4">
        {items.map(i=> (
          <div key={i} className="mb-2">
            <Link to="#" className="block py-2 px-3 rounded hover:bg-gray-100">{i}</Link>
          </div>
        ))}
      </nav>
    </aside>
  )
}
