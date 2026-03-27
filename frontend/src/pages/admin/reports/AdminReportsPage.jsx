import { useState } from 'react'
import { adminReportsSeed } from '../adminMockData'
import './AdminReportsPage.css'

export function AdminReportsPage() {
  const [reports, setReports] = useState(adminReportsSeed)
  const resolve = (id) => setReports((rows) => rows.map((row) => (row.id === id ? { ...row, status: 'resolved' } : row)))
  return (
    <section className="admin-reports-page">
      <h1>Signalements</h1>
      <div className="admin-list">
        {reports.map((item) => (
          <article key={item.id} className="admin-row">
            <div><h2>{item.target}</h2><p>{item.reason}</p></div>
            <div className="admin-row-actions">
              <span>{item.status}</span>
              {item.status !== 'resolved' && <button type="button" onClick={() => resolve(item.id)}>Resoudre</button>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
