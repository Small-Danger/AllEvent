import { Link } from 'react-router-dom'
import { proActivitiesSeed, proProfile, proReservationsSeed, proRevenueSeed } from '../prestataireMockData'
import './PrestataireDashboardPage.css'

function money(value) {
  return `${value.toLocaleString('fr-FR')} XAF`
}

export function PrestataireDashboardPage() {
  const monthlyNet = proRevenueSeed[proRevenueSeed.length - 1]?.net || 0
  const pending = proReservationsSeed.filter((item) => item.status === 'pending').length

  return (
    <section className="pro-dashboard-page">
      <header className="pro-hero">
        <div>
          <p className="pro-kicker">Espace prestataire</p>
          <h1>{proProfile.name}</h1>
          <p>{proProfile.category} - {proProfile.city}</p>
        </div>
        <Link to="/prestataire/activities">Gerer mes activites</Link>
      </header>
      <div className="pro-kpis">
        <article><span>Activites</span><strong>{proActivitiesSeed.length}</strong></article>
        <article><span>Reservations en attente</span><strong>{pending}</strong></article>
        <article><span>Revenu net du mois</span><strong>{money(monthlyNet)}</strong></article>
      </div>
    </section>
  )
}
