import { useState } from 'react'
import { adminActivitiesSeed } from '../adminMockData'
import './AdminActivitiesPage.css'

export function AdminActivitiesPage() {
  const [activities, setActivities] = useState(adminActivitiesSeed)
  const approve = (id) => setActivities((rows) => rows.map((row) => (row.id === id ? { ...row, status: 'published' } : row)))

  return (
    <section className="admin-activities-page">
      <h1>Activites</h1>
      <div className="admin-list">
        {activities.map((activity) => (
          <article key={activity.id} className="admin-row">
            <div><h2>{activity.title}</h2><p>{activity.provider}</p></div>
            <div className="admin-row-actions">
              <span>{activity.status}</span>
              {activity.status !== 'published' && <button type="button" onClick={() => approve(activity.id)}>Approuver</button>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
