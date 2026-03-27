import { useState } from 'react'
import { proReviewsSeed } from '../prestataireMockData'
import './PrestataireReviewsPage.css'

export function PrestataireReviewsPage() {
  const [reviews, setReviews] = useState(proReviewsSeed)
  const reply = (id) => setReviews((rows) => rows.map((r) => (r.id === id ? { ...r, replied: true } : r)))

  return (
    <section className="pro-reviews-page">
      <h1>Avis clients</h1>
      <div className="pro-card-list">
        {reviews.map((item) => (
          <article key={item.id} className="review-row">
            <h2>{item.client} - {'★'.repeat(item.score)}</h2>
            <p>{item.text}</p>
            <div className="review-footer">
              <small>{item.date}</small>
              {item.replied ? <span>Reponse envoyee</span> : <button type="button" onClick={() => reply(item.id)}>Repondre</button>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
