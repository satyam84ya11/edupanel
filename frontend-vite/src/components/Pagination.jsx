import React from 'react'

export default function Pagination({ page=1, total=1, onPage }){
  return (
    <div className="flex items-center gap-2">
      <button disabled={page<=1} onClick={()=>onPage(page-1)} className="px-2 py-1 border rounded">Prev</button>
      <div>Page {page} / {total}</div>
      <button disabled={page>=total} onClick={()=>onPage(page+1)} className="px-2 py-1 border rounded">Next</button>
    </div>
  )
}
