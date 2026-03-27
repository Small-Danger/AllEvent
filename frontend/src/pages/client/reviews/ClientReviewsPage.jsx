import { useMemo, useState } from 'react'
import { reservationsSeed, reviewsSeed } from '../clientMockData'
import './ClientReviewsPage.css'

export function ClientReviewsPage() {
  const [reviews, setReviews] = useState(reviewsSeed)
  const [newReview, setNewReview] = useState({
    reservationId: '',
    score: 5,
    text: '',
  })

  const reviewableReservations = useMemo(
    () =>
      reservationsSeed.filter(
        (reservation) =>
          reservation.status === 'done' &&
          !reviews.some((review) => review.reservationId === reservation.id),
      ),
    [reviews],
  )

  const onSubmitReview = (event) => {
    event.preventDefault()
    if (!newReview.reservationId || newReview.text.trim().length < 10) {
      return
    }

    const selectedReservation = reservationsSeed.find(
      (reservation) => reservation.id === newReview.reservationId,
    )

    setReviews((current) => [
      {
        id: `REV-${Date.now()}`,
        reservationId: newReview.reservationId,
        activity: selectedReservation?.title || 'Activite',
        score: Number(newReview.score),
        date: new Date().toISOString().slice(0, 10),
        text: newReview.text.trim(),
      },
      ...current,
    ])
    setNewReview({ reservationId: '', score: 5, text: '' })
  }

  return (
    <section className="client-reviews-page">
      <header>
        <h1>Mes avis</h1>
        <p>Partagez votre retour pour aider la communaute a mieux choisir.</p>
      </header>

      <form className="review-form" onSubmit={onSubmitReview}>
        <h2>Laisser un nouvel avis</h2>
        <select
          value={newReview.reservationId}
          onChange={(event) =>
            setNewReview((current) => ({ ...current, reservationId: event.target.value }))
          }
        >
          <option value="">Choisir une reservation terminee</option>
          {reviewableReservations.map((reservation) => (
            <option key={reservation.id} value={reservation.id}>
              {reservation.title} ({reservation.id})
            </option>
          ))}
        </select>
        <select
          value={newReview.score}
          onChange={(event) =>
            setNewReview((current) => ({ ...current, score: event.target.value }))
          }
        >
          {[5, 4, 3, 2, 1].map((score) => (
            <option key={score} value={score}>
              {score} etoiles
            </option>
          ))}
        </select>
        <textarea
          rows={4}
          placeholder="Decrivez votre experience..."
          value={newReview.text}
          onChange={(event) =>
            setNewReview((current) => ({ ...current, text: event.target.value }))
          }
        />
        <button type="submit">Publier mon avis</button>
      </form>

      <div className="review-list">
        {reviews.map((review) => (
          <article key={review.id} className="review-card">
            <div className="review-top">
              <h3>{review.activity}</h3>
              <strong>{'★'.repeat(review.score)}</strong>
            </div>
            <p>{review.text}</p>
            <small>
              Reservation {review.reservationId} - {review.date}
            </small>
          </article>
        ))}
      </div>
    </section>
  )
}
