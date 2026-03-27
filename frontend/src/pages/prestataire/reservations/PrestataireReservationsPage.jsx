import { useMemo, useState } from 'react'
import { proReservationsSeed } from '../prestataireMockData'
import './PrestataireReservationsPage.css'

function money(value) {
  return `${value.toLocaleString('fr-FR')} XAF`
}

export function PrestataireReservationsPage() {
  const [rows, setRows] = useState(proReservationsSeed)
  const [filter, setFilter] = useState('all')
  const visible = useMemo(() => rows.filter((r) => (filter === 'all' ? true : r.status === filter)), [rows, filter])
  const updateStatus = (id, status) => setRows((current) => current.map((row) => (row.id === id ? { ...row, status } : row)))

  return (
    <section className="pro-reservations-page">
      <h1>Reservations clients</h1>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Toutes</option><option value="pending">En attente</option><option value="confirmed">Confirmees</option><option value="done">Terminees</option>
      </select>
      <div className="pro-card-list">
        {visible.map((item) => (
          <article key={item.id} className="reservation-row">
            <div><h2>{item.activity}</h2><p>{item.customer} - {item.date} - {item.people} pers.</p></div>
            <div className="reservation-meta">
              <strong>{money(item.amount)}</strong>
              <span>{item.status}</span>
              {item.status === 'pending' && <button type="button" onClick={() => updateStatus(item.id, 'confirmed')}>Confirmer</button>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
