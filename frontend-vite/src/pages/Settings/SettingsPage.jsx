import React, { useEffect, useState } from 'react'
import { getSettings, updateSettings } from '../../api/api'
import AlertBox from '../../components/AlertBox'

export default function SettingsPage(){
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [flash, setFlash] = useState(null)

  useEffect(()=>{
    (async ()=>{
      setLoading(true)
      try{ const s = await getSettings(); setSettings(s) }catch(e){}finally{ setLoading(false) }
    })()
  },[])

  async function handleSave(){
    setSaving(true)
    try{ await updateSettings(settings); setFlash({ type: 'info', text: 'Settings saved' }) }catch(e){ setFlash({ type: 'error', text: 'Save failed' }) }finally{ setSaving(false) }
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      {flash && <div className="mb-3"><AlertBox type={flash.type}>{flash.text}</AlertBox></div>}
      <div className="card">
        <label className="block text-sm mb-2">School Name</label>
        <input className="w-full border rounded px-2 py-1 mb-3" value={settings.schoolName || ''} onChange={e=>setSettings({...settings, schoolName: e.target.value})} />
        <label className="block text-sm mb-2">Contact Email</label>
        <input className="w-full border rounded px-2 py-1 mb-3" value={settings.contactEmail || ''} onChange={e=>setSettings({...settings, contactEmail: e.target.value})} />
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving} className="px-3 py-2 bg-royal text-white rounded">Save</button>
        </div>
      </div>
    </div>
  )
}
