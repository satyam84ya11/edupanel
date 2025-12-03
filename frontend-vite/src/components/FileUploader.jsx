import React from 'react'

export default function FileUploader({ onChange, accept='*' }){
  return (
    <div>
      <input type="file" accept={accept} onChange={e=>onChange && onChange(e.target.files)} />
    </div>
  )
}
