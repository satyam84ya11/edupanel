import React from 'react'

export default function Unauthorized(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card text-center">
        <h2 className="text-xl font-semibold text-royal">Unauthorized</h2>
        <p className="mt-2">You don't have access to this page.</p>
      </div>
    </div>
  )
}
