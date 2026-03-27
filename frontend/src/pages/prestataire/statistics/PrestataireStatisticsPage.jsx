import { proReservationsSeed, proReviewsSeed } from '../prestataireMockData'
import './PrestataireStatisticsPage.css'

export function PrestataireStatisticsPage() {
  const totalBookings = proReservationsSeed.length
  const avgScore = (proReviewsSeed.reduce((sum, r) => sum + r.score, 0) / proReviewsSeed.length).toFixed(1)
  const conversion = Math.round((proReservationsSeed.filter((r) => r.status !== 'pending').length / totalBookings) * 100)

  return (
    <section className="pro-statistics-page">
      <h1>Statistiques</h1>
      <div className="stats-grid">
        <article><span>Reservations</span><strong>{totalBookings}</strong></article>
        <article><span>Note moyenne</span><strong>{avgScore} / 5</strong></article>
        <article><span>Taux de conversion</span><strong>{conversion}%</strong></article>
      </div>
    </section>
  )
}
