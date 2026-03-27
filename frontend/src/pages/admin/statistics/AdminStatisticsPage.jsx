import { adminActivitiesSeed, adminPrestatairesSeed, adminUsersSeed } from '../adminMockData'
import './AdminStatisticsPage.css'

export function AdminStatisticsPage() {
  return (
    <section className="admin-statistics-page">
      <h1>Statistiques plateforme</h1>
      <div className="stats-grid">
        <article><span>Utilisateurs</span><strong>{adminUsersSeed.length}</strong></article>
        <article><span>Prestataires</span><strong>{adminPrestatairesSeed.length}</strong></article>
        <article><span>Activites suivies</span><strong>{adminActivitiesSeed.length}</strong></article>
      </div>
    </section>
  )
}
