import { useState } from 'react'
import { adminReviewsSeed } from '../adminMockData'
import './AdminReviewsPage.css'

export function AdminReviewsPage() {
  const [reviews, setReviews] = useState(adminReviewsSeed)
  const toggleFlag = (id) => setReviews((rows) => rows.map((row) => (row.id === id ? { ...row, flagged: !row.flagged } : row)))

  return (
    <section className="admin-reviews-page">
      <h1>Avis</h1>
      <div className="admin-list">
        {reviews.map((review) => (
          <article key={review.id} className="admin-row">
            <div><h2>{review.activity}</h2><p>{'★'.repeat(review.score)}</p></div>
            <div className="admin-row-actions">
              <span>{review.flagged ? 'signale' : 'ok'}</span>
              <button type="button" onClick={() => toggleFlag(review.id)}>Basculer</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
