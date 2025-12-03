import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Topbar'
import Sidebar from '../../components/Sidebar'
import Card from '../../components/Card'
import SearchBar from '../../components/SearchBar'
import { getAlerts } from '../../api/api'

export default function Admin(){
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      try{
        const data = await getAlerts()
        setAlerts(data)
      }catch(e){
        // ignore
      }finally{ setLoading(false) }
    })()
  },[])

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1">
        <Topbar />
        <main className="p-6">
          <div className="mb-4">
            <SearchBar placeholder="Global search..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card title="Missing Aadhaar" value="12" />
            <Card title="Unpaid Fees" value="34" />
            <Card title="Salary Pending" value="5" />
            <Card title="Attendance Alerts" value="8" />
          </div>

          <div className="mt-6 flex gap-2">
            <button className="px-3 py-2 bg-royal text-white rounded">Export CSV</button>
            <button className="px-3 py-2 border rounded">Export PDF</button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Alerts</h3>
            {loading ? <div>Loading...</div> : (
              <ul className="space-y-2">
                {alerts.length===0 && <li className="text-sm text-gray-500">No alerts</li>}
                {alerts.map(a=> <li key={a.id} className="p-2 border rounded">{a.message}</li>)}
              </ul>
            )}
          </div>

        </main>
      </div>
    </div>
  )
}
