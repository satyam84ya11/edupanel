import React, { useEffect, useState } from 'react'
import { fetchStudents, createStudent, updateStudent, deleteStudent } from '../../api/api'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import StudentForm from './StudentForm'
import ConfirmModal from '../../components/ConfirmModal'

export default function StudentsList(){
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [serverErrors, setServerErrors] = useState(null)
  const [flash, setFlash] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmId, setConfirmId] = useState(null)

  async function load(){
    setLoading(true)
    try{
      const data = await fetchStudents()
      setStudents(data || [])
    }catch(e){}
    finally{ setLoading(false) }
  }

  useEffect(()=>{ load() },[])

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'admissionNo', title: 'Admission No' },
    { key: 'class', title: 'Class' },
    { key: 'actions', title: 'Actions', render: (row) => (
      <div className="flex gap-2">
        <button onClick={()=>{ setEditing(row); setModalOpen(true) }} className="px-2 py-1 border rounded">Edit</button>
        <button onClick={()=>{ setConfirmId(row.id); setConfirmOpen(true) }} className="px-2 py-1 border rounded text-red-600">Delete</button>
      </div>
    ) }
  ]

  async function handleCreate(payload){
    setSaving(true)
    try{
      await createStudent(payload)
      setModalOpen(false)
      setServerErrors(null)
      setFlash({ type: 'info', text: 'Student created' })
      await load()
    }catch(err){
      const res = err?.response
      if (res?.status === 422 && res.data?.errors){
        setServerErrors(res.data.errors)
      } else {
        setFlash({ type: 'error', text: res?.data?.error || 'Create failed' })
      }
    }finally{ setSaving(false) }
  }

  async function handleUpdate(id,payload){
    setSaving(true)
    try{
      await updateStudent(id,payload)
      setModalOpen(false)
      setEditing(null)
      setServerErrors(null)
      setFlash({ type: 'info', text: 'Student updated' })
      await load()
    }catch(err){
      const res = err?.response
      if (res?.status === 422 && res.data?.errors){
        setServerErrors(res.data.errors)
      } else {
        setFlash({ type: 'error', text: res?.data?.error || 'Update failed' })
      }
    }finally{ setSaving(false) }
  }

  async function handleDelete(id){
    try{
      await deleteStudent(id)
      setFlash({ type: 'info', text: 'Student deleted' })
      await load()
    }catch(err){
      setFlash({ type: 'error', text: 'Delete failed' })
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Students</h2>
        <div>
          <button onClick={()=>{ setEditing(null); setModalOpen(true) }} className="px-3 py-2 bg-royal text-white rounded">Add Student</button>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        <Table columns={columns} data={students} />
      )}

      <Modal open={modalOpen} title={editing? 'Edit Student' : 'Add Student'} onClose={()=>{ setModalOpen(false); setServerErrors(null); setFlash(null) }}>
        <StudentForm initial={editing || {}} serverErrors={serverErrors} generalMessage={flash} onCancel={()=>{ setModalOpen(false); setServerErrors(null); setFlash(null) }} onSubmit={async (payload)=>{
          if (editing) await handleUpdate(editing.id, payload)
          else await handleCreate(payload)
        }} />
      </Modal>
      <ConfirmModal open={confirmOpen} title="Delete student" message="Delete this student? This action cannot be undone." confirmText="Delete" onConfirm={async ()=>{ await handleDelete(confirmId); setConfirmOpen(false); setConfirmId(null) }} onClose={()=>{ setConfirmOpen(false); setConfirmId(null) }} />
    </div>
  )
}
