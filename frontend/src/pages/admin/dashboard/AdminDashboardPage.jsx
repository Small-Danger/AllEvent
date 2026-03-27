import { adminCommissionsSeed, adminDisputesSeed, adminReportsSeed, adminUsersSeed } from '../adminMockData'
import './AdminDashboardPage.css'

function money(value) {
  return `${value.toLocaleString('fr-FR')} XAF`
}

export function AdminDashboardPage() {
  const totalCommissions = adminCommissionsSeed.reduce((sum, row) => sum + row.amount, 0)
  return (
    <section className="admin-dashboard-page">
      <h1>Dashboard admin</h1>
      <div className="admin-kpi-grid">
        <article><span>Utilisateurs</span><strong>{adminUsersSeed.length}</strong></article>
        <article><span>Signalements ouverts</span><strong>{adminReportsSeed.filter((r) => r.status === 'open').length}</strong></article>
        <article><span>Litiges en cours</span><strong>{adminDisputesSeed.filter((d) => d.status !== 'closed').length}</strong></article>
        <article><span>Commissions cumulees</span><strong>{money(totalCommissions)}</strong></article>
      </div>
    </section>
  )
}
