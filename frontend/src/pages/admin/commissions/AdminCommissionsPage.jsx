import { adminCommissionsSeed } from '../adminMockData'
import './AdminCommissionsPage.css'

export function AdminCommissionsPage() {
  return (
    <section className="admin-commissions-page">
      <h1>Commissions</h1>
      <div className="admin-list">
        {adminCommissionsSeed.map((item) => (
          <article key={item.id} className="admin-row">
            <h2>{item.month}</h2>
            <strong>{item.amount.toLocaleString('fr-FR')} XAF</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
