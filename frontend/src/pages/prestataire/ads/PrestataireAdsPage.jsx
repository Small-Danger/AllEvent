import { useState } from 'react'
import { proAdsSeed } from '../prestataireMockData'
import './PrestataireAdsPage.css'

export function PrestataireAdsPage() {
  const [ads, setAds] = useState(proAdsSeed)
  const toggle = (id) => setAds((rows) => rows.map((row) => (row.id === id ? { ...row, status: row.status === 'active' ? 'paused' : 'active' } : row)))

  return (
    <section className="pro-ads-page">
      <h1>Publicites</h1>
      <div className="pro-card-list">
        {ads.map((ad) => (
          <article key={ad.id} className="ad-row">
            <div><h2>{ad.title}</h2><p>Budget {ad.budget.toLocaleString('fr-FR')} XAF - {ad.clicks} clics</p></div>
            <div className="ad-actions">
              <span className={ad.status === 'active' ? 'tag-active' : 'tag-paused'}>{ad.status}</span>
              <button type="button" onClick={() => toggle(ad.id)}>Basculer</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
