import React, { useEffect, useState } from 'react'
import { fetchFaculties, createFaculty, updateFaculty, deleteFaculty } from '../../api/api'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import FacultyForm from './FacultyForm'
import ConfirmModal from '../../components/ConfirmModal'

export default function FacultiesList(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [serverErrors, setServerErrors] = useState(null)
  const [flash, setFlash] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmId, setConfirmId] = useState(null)

  async function load(){
    setLoading(true)
    try{ const d = await fetchFaculties(); setData(d || []) }catch(e){}
    finally{ setLoading(false) }
  }

  useEffect(()=>{ load() },[])

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'subjects', title: 'Subjects' },
    { key: 'actions', title: 'Actions', render: (row) => (
      <div className="flex gap-2">
        <button onClick={()=>{ setEditing(row); setModalOpen(true) }} className="px-2 py-1 border rounded">Edit</button>
        <button onClick={()=>{ setConfirmId(row.id); setConfirmOpen(true) }} className="px-2 py-1 border rounded text-red-600">Delete</button>
      </div>
    ) }
  ]

  async function handleCreate(payload){
    try{ await createFaculty(payload); setModalOpen(false); setServerErrors(null); setFlash({ type: 'info', text: 'Faculty created' }); await load() }catch(err){
      const res = err?.response
      if (res?.status === 422 && res.data?.errors) setServerErrors(res.data.errors)
      else setFlash({ type: 'error', text: res?.data?.error || 'Create failed' })
    }
  }

  async function handleUpdate(id,payload){
    try{ await updateFaculty(id,payload); setModalOpen(false); setEditing(null); setServerErrors(null); setFlash({ type: 'info', text: 'Faculty updated' }); await load() }catch(err){
      const res = err?.response
      if (res?.status === 422 && res.data?.errors) setServerErrors(res.data.errors)
      else setFlash({ type: 'error', text: res?.data?.error || 'Update failed' })
    }
  }

  async function handleDelete(id){
    try{ await deleteFaculty(id); setFlash({ type: 'info', text: 'Faculty deleted' }); await load() }catch(e){ setFlash({ type: 'error', text: 'Delete failed' }) }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Faculty</h2>
        <button onClick={()=>{ setEditing(null); setModalOpen(true) }} className="px-3 py-2 bg-royal text-white rounded">Add Faculty</button>
      </div>
      {loading ? <div>Loading...</div> : <Table columns={columns} data={data} />}

      <Modal open={modalOpen} title={editing ? 'Edit Faculty' : 'Add Faculty'} onClose={()=>{ setModalOpen(false); setServerErrors(null); setFlash(null) }}>
        <FacultyForm initial={editing || {}} serverErrors={serverErrors} generalMessage={flash} onCancel={()=>{ setModalOpen(false); setServerErrors(null); setFlash(null) }} onSubmit={async (payload)=>{ if (editing) await handleUpdate(editing.id,payload); else await handleCreate(payload) }} />
      </Modal>

      <ConfirmModal open={confirmOpen} title="Delete faculty" message="Delete this faculty? This action cannot be undone." confirmText="Delete" onConfirm={async ()=>{ await handleDelete(confirmId); setConfirmOpen(false); setConfirmId(null) }} onClose={()=>{ setConfirmOpen(false); setConfirmId(null) }} />
    </div>
  )
}
