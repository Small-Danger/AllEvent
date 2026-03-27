import { useState } from 'react'
import { adminPrestatairesSeed } from '../adminMockData'
import './AdminPrestatairesPage.css'

export function AdminPrestatairesPage() {
  const [rows, setRows] = useState(adminPrestatairesSeed)
  const verify = (id) => setRows((current) => current.map((item) => (item.id === id ? { ...item, status: 'verified' } : item)))

  return (
    <section className="admin-prestataires-page">
      <h1>Prestataires</h1>
      <div className="admin-list">
        {rows.map((item) => (
          <article key={item.id} className="admin-row">
            <div><h2>{item.name}</h2><p>{item.city}</p></div>
            <div className="admin-row-actions">
              <span>{item.status}</span>
              {item.status !== 'verified' && <button type="button" onClick={() => verify(item.id)}>Verifier</button>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
