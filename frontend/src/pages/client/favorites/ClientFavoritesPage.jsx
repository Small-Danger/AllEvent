import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { favoritesSeed } from '../clientMockData'
import { clientApi } from '../../../services/clientApi'
import './ClientFavoritesPage.css'

function formatAmount(value) {
  return `${value.toLocaleString('fr-FR')} XAF`
}

export function ClientFavoritesPage() {
  const [favorites, setFavorites] = useState(favoritesSeed)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    clientApi
      .getFavorites()
      .then((data) => {
        if (!active) return
        if (data.length) setFavorites(data)
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

  const removeFromFavorites = async (id) => {
    try {
      await clientApi.removeFavorite(id)
      setFavorites((current) => current.filter((item) => item.id !== id))
    } catch (apiError) {
      setError(apiError.message)
    }
  }

  return (
    <section className="client-favorites-page">
      <header>
        <h1>Mes favoris</h1>
        <p>Gardez vos activites preferees et revenez reserver au bon moment.</p>
      </header>

      {isLoading && <article className="favorites-empty">Chargement des favoris...</article>}
      {!isLoading && error && <article className="favorites-empty">{error}</article>}

      {!isLoading && favorites.length === 0 && (
        <article className="favorites-empty">
          <h2>Votre liste est vide</h2>
          <p>Explorez de nouvelles experiences et ajoutez vos coups de coeur.</p>
          <Link to="/search">Decouvrir les activites</Link>
        </article>
      )}

      {!isLoading && favorites.length > 0 && (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <article key={item.id} className="favorite-card">
              <img src={item.image} alt={item.title} />
              <div className="favorite-content">
                <span>{item.category}</span>
                <h2>{item.title}</h2>
                <p>{item.city}</p>
                <div className="favorite-footer">
                  <strong>{formatAmount(item.price)}</strong>
                  <small>{item.rating} / 5</small>
                </div>
                <div className="favorite-actions">
                  <Link to={`/activity/${item.id}`}>Reserver</Link>
                  <button type="button" onClick={() => removeFromFavorites(item.id)}>
                    Retirer
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
