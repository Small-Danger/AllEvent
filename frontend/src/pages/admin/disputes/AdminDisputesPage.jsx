import { useState } from 'react'
import { adminDisputesSeed } from '../adminMockData'
import './AdminDisputesPage.css'

export function AdminDisputesPage() {
  const [rows, setRows] = useState(adminDisputesSeed)
  const close = (id) => setRows((current) => current.map((item) => (item.id === id ? { ...item, status: 'closed' } : item)))
  return (
    <section className="admin-disputes-page">
      <h1>Litiges</h1>
      <div className="admin-list">
        {rows.map((item) => (
          <article key={item.id} className="admin-row">
            <h2>{item.subject}</h2>
            <div className="admin-row-actions">
              <span>{item.status}</span>
              {item.status !== 'closed' && <button type="button" onClick={() => close(item.id)}>Cloturer</button>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
