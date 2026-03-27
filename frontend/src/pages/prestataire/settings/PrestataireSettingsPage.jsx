import { useState } from 'react'
import { proProfile } from '../prestataireMockData'
import './PrestataireSettingsPage.css'

export function PrestataireSettingsPage() {
  const [form, setForm] = useState({
    businessName: proProfile.name,
    city: proProfile.city,
    supportEmail: 'contact@savana-pro.local',
    autoConfirm: true,
  })
  const [saved, setSaved] = useState(false)
  const update = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }))
    setSaved(false)
  }

  return (
    <section className="pro-settings-page">
      <h1>Parametres</h1>
      <div className="settings-card">
        <label>Nom business<input value={form.businessName} onChange={(e) => update('businessName', e.target.value)} /></label>
        <label>Ville<input value={form.city} onChange={(e) => update('city', e.target.value)} /></label>
        <label>Email support<input value={form.supportEmail} onChange={(e) => update('supportEmail', e.target.value)} /></label>
        <label className="switch-row"><input type="checkbox" checked={form.autoConfirm} onChange={(e) => update('autoConfirm', e.target.checked)} /> Confirmation auto des reservations</label>
        <button type="button" onClick={() => setSaved(true)}>Sauvegarder</button>
        {saved && <span>Parametres enregistres.</span>}
      </div>
    </section>
  )
}
