import { useState } from 'react'
import { adminAdsSeed } from '../adminMockData'
import './AdminAdsPage.css'

export function AdminAdsPage() {
  const [ads, setAds] = useState(adminAdsSeed)
  const toggle = (id) => setAds((rows) => rows.map((row) => (row.id === id ? { ...row, status: row.status === 'active' ? 'paused' : 'active' } : row)))
  return (
    <section className="admin-ads-page">
      <h1>Publicites</h1>
      <div className="admin-list">
        {ads.map((ad) => (
          <article key={ad.id} className="admin-row">
            <div><h2>{ad.owner}</h2><p>Budget: {ad.budget.toLocaleString('fr-FR')} XAF</p></div>
            <div className="admin-row-actions"><span>{ad.status}</span><button type="button" onClick={() => toggle(ad.id)}>Basculer</button></div>
          </article>
        ))}
      </div>
    </section>
  )
}
