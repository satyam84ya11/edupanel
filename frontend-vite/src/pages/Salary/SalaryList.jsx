import React, { useEffect, useState } from 'react'
import { fetchSalaries } from '../../api/api'
import Table from '../../components/Table'

export default function SalaryList(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      setLoading(true)
      try{ const d = await fetchSalaries(); setItems(d || []) }catch(e){}finally{ setLoading(false) }
    })()
  },[])

  const columns = [{ key: 'id', title: 'ID' }, { key: 'staffName', title: 'Staff' }, { key: 'month', title: 'Month' }, { key: 'amount', title: 'Amount' }, { key: 'status', title: 'Status' }]

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Salary</h2>
      {loading ? <div>Loading...</div> : <Table columns={columns} data={items} />}
    </div>
  )
}
