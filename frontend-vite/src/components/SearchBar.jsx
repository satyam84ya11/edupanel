import React, { useState } from 'react'
import { getSearch } from '../api/api'

export default function SearchBar({ placeholder }){
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])

  async function onSearch(e){
    e.preventDefault()
    try{
      const data = await getSearch(q)
      setResults(data)
    }catch(err){
      // ignore
    }
  }

  return (
    <div>
      <form onSubmit={onSearch} className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder={placeholder} className="flex-1 border rounded px-3 py-2" />
        <button className="px-3 py-2 bg-royal text-white rounded">Search</button>
      </form>
      {results.length>0 && (
        <div className="mt-2 bg-white border p-2 rounded max-h-40 overflow-auto">
          {results.map(r=> <div key={r.id} className="py-1">{r.name || r.userid}</div>)}
        </div>
      )}
    </div>
  )
}
