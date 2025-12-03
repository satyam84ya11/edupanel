import React, { createContext, useContext, useState, useEffect } from 'react'
import * as api from '../api/api'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch(e){ return null }
  })
  const navigate = useNavigate()

  useEffect(()=>{
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  },[token])

  useEffect(()=>{
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  },[user])

  async function login(userid, password){
    const data = await api.login(userid, password)
    // expected: { token, user: { id, name, role, userid } }
    setToken(data.token)
    setUser(data.user)
    // redirect according to role
    const role = data.user.role
    if (role === 'admin') navigate('/dashboard/admin')
    else if (role === 'faculty') navigate('/dashboard/faculty')
    else if (role === 'staff') navigate('/dashboard/staff')
    else if (role === 'student') navigate('/dashboard/student')
    else navigate('/')
  }

  function logout(){
    setToken(null)
    setUser(null)
    navigate('/')
  }

  function getCurrentUser(){
    return user
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}
