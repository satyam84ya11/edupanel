import React, { useEffect, useState } from 'react'
import { fetchReports, exportReport } from '../../api/api'

export default function ReportsList(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      setLoading(true)
      try{ const d = await fetchReports(); setItems(d || []) }catch(e){}finally{ setLoading(false) }
    })()
  },[])

  async function handleExport(path){
    try{
      const blob = await exportReport(path)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = path
      document.body.appendChild(a)
      a.click()
+      a.remove()
    }catch(e){ alert('Export failed') }
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Reports</h2>
      {loading ? <div>Loading...</div> : (
        <div className="space-y-2">
          {items.map(r=> (
            <div key={r.id} className="p-3 border rounded flex items-center justify-between">
              <div>
                <div className="font-semibold">{r.title}</div>
                <div className="text-sm text-gray-500">{r.desc}</div>
              </div>
              <div>
                <button onClick={()=>handleExport(r.path)} className="px-3 py-2 bg-royal text-white rounded">Export</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
