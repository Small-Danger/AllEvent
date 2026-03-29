import { useEffect, useState } from 'react'
import { proProfile } from '../prestataireMockData'
import { usePrestataireFlash } from '../../../context/PrestataireFlashContext'
import { prestataireApi } from '../../../services/prestataireApi'
import './PrestataireSettingsPage.css'

export function PrestataireSettingsPage() {
  const { showFlash } = usePrestataireFlash()
  const [profileId, setProfileId] = useState(null)
  const [form, setForm] = useState({
    businessName: proProfile.name,
    city: proProfile.city,
    supportEmail: 'contact@savana-pro.local',
    autoConfirm: true,
  })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    prestataireApi
      .getProfiles()
      .then((profiles) => {
        if (!active || !profiles.length) return
        const first = profiles[0]
        setProfileId(first.id)
        setForm((current) => ({
          ...current,
          businessName: first.nom || current.businessName,
        }))
      })
      .catch((apiError) => {
        if (!active) return
        setError(apiError.message)
      })
    return () => {
      active = false
    }
  }, [])

  const update = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }))
    setSaved(false)
  }

  const onSave = async () => {
    setError('')
    if (!profileId) {
      setSaved(true)
      showFlash('Aucun profil serveur : preferences locales uniquement.')
      return
    }
    try {
      await prestataireApi.updateProfile(profileId, { nom: form.businessName })
      setSaved(true)
      showFlash('Parametres enregistres sur le serveur.')
    } catch (apiError) {
      const msg = apiError.message
      setError(msg)
      showFlash(msg, 'error')
    }
  }

  return (
    <section className="pro-settings-page">
      <header className="settings-head">
        <h1>Parametres professionnels</h1>
        <p>Centralisez les informations de votre structure et vos preferences operationnelles.</p>
      </header>
      {error && <p>{error}</p>}
      <div className="settings-card">
        <h2>Identite de la structure</h2>
        <div className="settings-grid">
          <label>Nom business<input value={form.businessName} onChange={(e) => update('businessName', e.target.value)} /></label>
          <label>Ville<input value={form.city} onChange={(e) => update('city', e.target.value)} /></label>
          <label>Email support<input value={form.supportEmail} onChange={(e) => update('supportEmail', e.target.value)} /></label>
        </div>
        <h2>Automatisation</h2>
        <label className="switch-row"><input type="checkbox" checked={form.autoConfirm} onChange={(e) => update('autoConfirm', e.target.checked)} /> Confirmation automatique des reservations</label>
        <div className="settings-actions">
          <button type="button" onClick={onSave}>Sauvegarder les parametres</button>
        </div>
        {saved && <span>Parametres enregistres.</span>}
      </div>
    </section>
  )
}
