import { useState } from 'react'
import { clientProfile } from '../clientMockData'
import './ClientProfilePage.css'

export function ClientProfilePage() {
  const [form, setForm] = useState(clientProfile)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const onFieldChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setSaved(false)
  }

  const onSave = (event) => {
    event.preventDefault()
    setIsSaving(true)
    window.setTimeout(() => {
      setIsSaving(false)
      setSaved(true)
    }, 600)
  }

  return (
    <section className="client-profile-page">
      <header className="profile-head">
        <img src={form.avatar} alt={form.firstName} />
        <div>
          <h1>Mon profil</h1>
          <p>Membre ALL EVENT depuis {form.memberSince}</p>
        </div>
      </header>

      <form className="profile-form" onSubmit={onSave}>
        <label>
          Prenom
          <input name="firstName" value={form.firstName} onChange={onFieldChange} />
        </label>
        <label>
          Nom
          <input name="lastName" value={form.lastName} onChange={onFieldChange} />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={onFieldChange} />
        </label>
        <label>
          Telephone
          <input name="phone" value={form.phone} onChange={onFieldChange} />
        </label>
        <label>
          Ville
          <input name="city" value={form.city} onChange={onFieldChange} />
        </label>
        <label>
          Date de naissance
          <input
            name="birthday"
            type="date"
            value={form.birthday}
            onChange={onFieldChange}
          />
        </label>

        <div className="profile-actions">
          <button type="submit" disabled={isSaving}>
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
          {saved && <span>Profil mis a jour avec succes.</span>}
        </div>
      </form>
    </section>
  )
}
