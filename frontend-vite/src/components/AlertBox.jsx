import React from 'react'

export default function AlertBox({ children, type='info' }){
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warn: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  }
  return (
    <div className={`p-3 border rounded ${colors[type]}`}>
      {children}
    </div>
  )
}
