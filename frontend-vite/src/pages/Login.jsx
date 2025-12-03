import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const { login } = useAuth()
  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onSubmit(e){
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      await login(userid, password)
    }catch(err){
      setError(err?.response?.data?.error || 'Login failed')
    }finally{ setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <form onSubmit={onSubmit} className="card">
          <h1 className="text-2xl font-semibold text-royal mb-4 text-center">Login</h1>

          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

          <label className="block mb-2 text-sm font-medium">User ID</label>
          <input value={userid} onChange={e=>setUserid(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" placeholder="userid" />

          <label className="block mb-2 text-sm font-medium">Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full border rounded px-3 py-2 mb-4" placeholder="password" />

          <button disabled={loading} className="w-full bg-royal text-white py-2 rounded">{loading ? 'Logging in...' : 'Login'}</button>

        </form>
      </div>
    </div>
  )
}
