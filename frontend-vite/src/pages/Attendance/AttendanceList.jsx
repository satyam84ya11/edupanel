import React, { useEffect, useState } from 'react'
import { fetchAttendance } from '../../api/api'
import Table from '../../components/Table'

export default function AttendanceList(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      setLoading(true)
      try{ const d = await fetchAttendance(); setItems(d || []) }catch(e){}finally{ setLoading(false) }
    })()
  },[])

  const columns = [{ key: 'id', title: 'ID' }, { key: 'entityName', title: 'Name' }, { key: 'date', title: 'Date' }, { key: 'status', title: 'Status' }]

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Attendance</h2>
      {loading ? <div>Loading...</div> : <Table columns={columns} data={items} />}
    </div>
  )
}
