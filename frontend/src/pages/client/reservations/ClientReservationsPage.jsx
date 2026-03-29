import { useEffect, useMemo, useState } from 'react'
import { reservationsSeed } from '../clientMockData'
import { clientApi } from '../../../services/clientApi'
import './ClientReservationsPage.css'

const tabs = [
  { id: 'upcoming', label: 'A venir' },
  { id: 'done', label: 'Passees' },
  { id: 'cancelled', label: 'Annulees' },
]

function formatAmount(value) {
  return `${value.toLocaleString('fr-FR')} XAF`
}

export function ClientReservationsPage() {
  const [selectedTab, setSelectedTab] = useState('upcoming')
  const [search, setSearch] = useState('')
  const [rows, setRows] = useState(reservationsSeed)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    clientApi
      .getReservations()
      .then((data) => {
        if (!active) return
        if (data.length) setRows(data)
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

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (item) =>
          item.status === selectedTab &&
          `${item.title} ${item.city}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [rows, search, selectedTab],
  )

  const cancelReservation = async (id) => {
    setIsLoading(true)
    try {
      await clientApi.cancelReservation(id)
      setRows((current) =>
        current.map((row) => (row.id === id ? { ...row, status: 'cancelled' } : row)),
      )
      setSelectedTab('cancelled')
    } catch (apiError) {
      setError(apiError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="client-reservations-page">
      <header className="reservations-head">
        <h1>Mes reservations</h1>
        <p>Suivez vos experiences, gelez des options et annulez si besoin.</p>
      </header>

      <div className="reservations-toolbar">
        <div className="tab-switcher">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedTab(tab.id)}
              className={selectedTab === tab.id ? 'active' : ''}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Rechercher une reservation..."
        />
      </div>

      {isLoading && <div className="state-card">Mise a jour en cours...</div>}
      {!isLoading && error && <div className="state-card">{error}</div>}

      {!isLoading && filteredRows.length === 0 && (
        <div className="state-card">Aucune reservation dans cette categorie.</div>
      )}

      {!isLoading && filteredRows.length > 0 && (
        <div className="reservations-list">
          {filteredRows.map((item) => (
            <article key={item.id} className="reservation-card">
              <div>
                <h2>{item.title}</h2>
                <p>
                  {item.city} - {item.date} - {item.hour}
                </p>
                <small>{item.guests} participants</small>
              </div>
              <div className="reservation-actions">
                <strong>{formatAmount(item.amount)}</strong>
                {item.status === 'upcoming' && (
                  <button type="button" onClick={() => cancelReservation(item.id)}>
                    Annuler
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
