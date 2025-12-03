import React, { useState, useEffect } from 'react'

import AlertBox from '../../components/AlertBox'

export default function StudentForm({ initial = {}, onCancel, onSubmit, serverErrors = null, generalMessage = null }){
  const [name, setName] = useState(initial.name || '')
  const [admissionNo, setAdmissionNo] = useState(initial.admissionNo || '')
  const [className, setClassName] = useState(initial.class || '')
  const [phone, setPhone] = useState(initial.phone || '')
  const [email, setEmail] = useState(initial.email || '')
  const [errors, setErrors] = useState({})

  useEffect(()=>{
    setName(initial.name || '')
    setAdmissionNo(initial.admissionNo || '')
    setClassName(initial.class || '')
    setPhone(initial.phone || '')
    setEmail(initial.email || '')
    setErrors({})
  },[initial])

  // apply server-side field errors when provided
  useEffect(()=>{
    if (serverErrors && typeof serverErrors === 'object'){
      setErrors(prev => ({ ...prev, ...serverErrors }))
    }
  },[serverErrors])

  function validate(){
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!admissionNo.trim()) e.admissionNo = 'Admission no is required'
    if (!className.toString().trim()) e.class = 'Class is required'
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Invalid email'
    setErrors(e)
    return Object.keys(e).length===0
  }

  function handleSubmit(e){
    e.preventDefault()
    if (!validate()) return
    onSubmit({ name, admissionNo, class: className, phone, email })
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
        <label className="block text-sm">Admission No</label>
        <input value={admissionNo} onChange={e=>setAdmissionNo(e.target.value)} className="w-full border rounded px-2 py-1" />
        {errors.admissionNo && <div className="text-red-600 text-sm">{errors.admissionNo}</div>}
      </div>

      <div className="mb-2">
        <label className="block text-sm">Class</label>
        <input value={className} onChange={e=>setClassName(e.target.value)} className="w-full border rounded px-2 py-1" />
        {errors.class && <div className="text-red-600 text-sm">{errors.class}</div>}
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
