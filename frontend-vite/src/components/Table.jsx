import React from 'react'

export default function Table({ columns, data }){
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(c=> <th key={c.key} className="text-left px-4 py-2">{c.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx)=> (
            <tr key={idx} className="border-t">
              {columns.map(c=> (
                <td key={c.key} className="px-4 py-2">
                  {c.render ? c.render(row) : (row[c.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
