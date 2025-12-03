import React, { useState, useEffect } from 'react'

import AlertBox from '../../components/AlertBox'

export default function FacultyForm({ initial = {}, onCancel, onSubmit, serverErrors = null, generalMessage = null }){
  const [name, setName] = useState(initial.name || '')
  const [subjects, setSubjects] = useState((initial.subjects && initial.subjects.join(', ')) || '')
  const [phone, setPhone] = useState(initial.phone || '')
  const [email, setEmail] = useState(initial.email || '')
  const [errors, setErrors] = useState({})

  useEffect(()=>{
    setName(initial.name || '')
    setSubjects((initial.subjects && initial.subjects.join(', ')) || '')
    setPhone(initial.phone || '')
    setEmail(initial.email || '')
    setErrors({})
  },[initial])

  useEffect(()=>{
    if (serverErrors && typeof serverErrors === 'object'){
      setErrors(prev => ({ ...prev, ...serverErrors }))
    }
  },[serverErrors])

  function validate(){
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Invalid email'
    setErrors(e)
    return Object.keys(e).length===0
  }

  function handleSubmit(e){
    e.preventDefault()
    if (!validate()) return
    const payload = { name, subjects: subjects.split(',').map(s=>s.trim()).filter(Boolean), phone, email }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit}>
      {generalMessage && <div className="mb-3"><AlertBox type={generalMessage.type || 'error'}>{generalMessage.text}</AlertBox></div>}
      <div className="mb-2">
        <label className="block text-sm">Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-2 py-1" />
        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
      </div>
      <div className="mb-2">
        <label className="block text-sm">Subjects (comma separated)</label>
        <input value={subjects} onChange={e=>setSubjects(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Phone</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded px-2 py-1" />
        {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <button type="submit" className="px-3 py-2 bg-royal text-white rounded">Save</button>
        <button type="button" onClick={onCancel} className="px-3 py-2 border rounded">Cancel</button>
      </div>
    </form>
  )
}
