import React from 'react'
import Modal from './Modal'

export default function ConfirmModal({ open, title = 'Confirm', message = 'Are you sure?', confirmText = 'Confirm', onConfirm, onClose }){
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="space-y-4">
        <div>{message}</div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
          <button onClick={() => { onConfirm && onConfirm(); onClose && onClose(); }} className="px-3 py-2 bg-red-600 text-white rounded">{confirmText}</button>
        </div>
      </div>
    </Modal>
  )
}
