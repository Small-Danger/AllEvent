import { useState } from 'react'
import { proActivitiesSeed } from '../prestataireMockData'
import './PrestataireActivitiesPage.css'

export function PrestataireActivitiesPage() {
  const [activities, setActivities] = useState(proActivitiesSeed)
  const [title, setTitle] = useState('')

  const toggleStatus = (id) => {
    setActivities((rows) =>
      rows.map((row) =>
        row.id === id
          ? { ...row, status: row.status === 'published' ? 'draft' : 'published' }
          : row,
      ),
    )
  }

  const addActivity = (event) => {
    event.preventDefault()
    if (!title.trim()) return
    setActivities((rows) => [
      ...rows,
      { id: `ACT-${Date.now()}`, title: title.trim(), city: 'Douala', price: 25000, status: 'draft', seats: 10 },
    ])
    setTitle('')
  }

  return (
    <section className="pro-activities-page">
      <h1>Mes activites</h1>
      <form onSubmit={addActivity} className="pro-inline-form">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nouvelle activite..." />
        <button type="submit">Ajouter</button>
      </form>
      <div className="pro-card-list">
        {activities.map((item) => (
          <article key={item.id} className="pro-card-row">
            <div><h2>{item.title}</h2><p>{item.city} - {item.seats} places</p></div>
            <div className="row-actions">
              <span className={item.status === 'published' ? 'tag published' : 'tag draft'}>{item.status}</span>
              <button type="button" onClick={() => toggleStatus(item.id)}>Basculer</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
