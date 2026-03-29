import { useEffect, useMemo, useState } from 'react'
import { reservationsSeed, reviewsSeed } from '../clientMockData'
import { clientApi } from '../../../services/clientApi'
import './ClientReviewsPage.css'

export function ClientReviewsPage() {
  const [reviews, setReviews] = useState(reviewsSeed)
  const [reservations, setReservations] = useState(reservationsSeed)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [newReview, setNewReview] = useState({
    reservationId: '',
    activityId: '',
    score: 5,
    text: '',
  })
  const [editingReviewId, setEditingReviewId] = useState(null)
  const [editingReview, setEditingReview] = useState({ score: 5, text: '' })

  useEffect(() => {
    let active = true
    Promise.all([clientApi.getReviews(), clientApi.getReservations()])
      .then(([reviewsData, reservationsData]) => {
        if (!active) return
        if (reviewsData.length) setReviews(reviewsData)
        if (reservationsData.length) setReservations(reservationsData)
      })
      .catch((apiError) => {
        if (!active) return
        setError(apiError.message)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const reviewableReservations = useMemo(
    () =>
      reservations.filter(
        (reservation) =>
          (reservation.status === 'done' || reservation.backendStatus === 'payee') &&
          !reviews.some((review) => review.reservationId === reservation.id),
      ),
    [reservations, reviews],
  )

  const onSubmitReview = async (event) => {
    event.preventDefault()
    setError('')
    if (!newReview.reservationId || newReview.text.trim().length < 10) {
      return
    }

    const selectedReservation = reservations.find(
      (reservation) => reservation.id === newReview.reservationId,
    )

    try {
      await clientApi.createReview({
        reservationId: newReview.reservationId,
        activityId: selectedReservation?.activityId || newReview.activityId,
        score: Number(newReview.score),
        text: newReview.text.trim(),
      })
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
      setNewReview({ reservationId: '', activityId: '', score: 5, text: '' })
    } catch (apiError) {
      setError(apiError.message)
    }
  }

  const startEditReview = (review) => {
    setEditingReviewId(review.id)
    setEditingReview({ score: review.score, text: review.text })
    setError('')
  }

  const cancelEditReview = () => {
    setEditingReviewId(null)
    setEditingReview({ score: 5, text: '' })
  }

  const saveEditReview = async () => {
    if (!editingReviewId) return
    try {
      await clientApi.updateReview(editingReviewId, editingReview)
      setReviews((current) =>
        current.map((review) =>
          review.id === editingReviewId
            ? { ...review, score: Number(editingReview.score), text: editingReview.text }
            : review,
        ),
      )
      cancelEditReview()
    } catch (apiError) {
      setError(apiError.message)
    }
  }

  const removeReview = async (reviewId) => {
    const confirmed = window.confirm('Supprimer cet avis ?')
    if (!confirmed) return
    try {
      await clientApi.deleteReview(reviewId)
      setReviews((current) => current.filter((review) => review.id !== reviewId))
    } catch (apiError) {
      setError(apiError.message)
    }
  }

  return (
    <section className="client-reviews-page">
      <header>
        <h1>Mes avis</h1>
        <p>Partagez votre retour pour aider la communaute a mieux choisir.</p>
      </header>

      {isLoading && <div className="review-card">Chargement des avis...</div>}
      {!isLoading && error && <div className="review-card">{error}</div>}

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
            {editingReviewId === review.id ? (
              <div className="review-edit-box">
                <select
                  value={editingReview.score}
                  onChange={(event) =>
                    setEditingReview((current) => ({
                      ...current,
                      score: Number(event.target.value),
                    }))
                  }
                >
                  {[5, 4, 3, 2, 1].map((score) => (
                    <option key={score} value={score}>
                      {score} etoiles
                    </option>
                  ))}
                </select>
                <textarea
                  rows={3}
                  value={editingReview.text}
                  onChange={(event) =>
                    setEditingReview((current) => ({
                      ...current,
                      text: event.target.value,
                    }))
                  }
                />
                <div className="review-crud-actions">
                  <button type="button" onClick={saveEditReview}>
                    Enregistrer
                  </button>
                  <button type="button" className="ghost" onClick={cancelEditReview}>
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <p>{review.text}</p>
            )}
            <small>
              Reservation {review.reservationId} - {review.date}
            </small>
            {editingReviewId !== review.id && (
              <div className="review-crud-actions">
                <button type="button" onClick={() => startEditReview(review)}>
                  Modifier
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => removeReview(review.id)}
                >
                  Supprimer
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
