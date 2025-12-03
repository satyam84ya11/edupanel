import React, { useEffect, useState } from 'react'
import { fetchFees } from '../../api/api'
import Table from '../../components/Table'

export default function FeesList(){
  const [fees, setFees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      setLoading(true)
      try{ const d = await fetchFees(); setFees(d || []) }catch(e){}finally{ setLoading(false) }
    })()
  },[])

  const columns = [{ key: 'id', title: 'ID' }, { key: 'studentName', title: 'Student' }, { key: 'amount', title: 'Amount' }, { key: 'status', title: 'Status' }]

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Fees</h2>
      {loading ? <div>Loading...</div> : <Table columns={columns} data={fees} />}
    </div>
  )
}
