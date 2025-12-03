import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Topbar(){
  const { user, logout } = useAuth()
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b">
      <div className="flex items-center gap-4">
        <div className="text-xl font-semibold text-royal">KidsAcademy</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm">{user?.name}</div>
        <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
      </div>
    </div>
  )
}
