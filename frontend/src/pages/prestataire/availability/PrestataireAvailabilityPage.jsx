import { useState } from 'react'
import './PrestataireAvailabilityPage.css'

const slotsSeed = [
  { id: 1, day: 'Lundi', value: '09:00 - 17:00', active: true },
  { id: 2, day: 'Mardi', value: '09:00 - 17:00', active: true },
  { id: 3, day: 'Mercredi', value: 'Ferme', active: false },
]

export function PrestataireAvailabilityPage() {
  const [slots, setSlots] = useState(slotsSeed)
  return (
    <section className="pro-availability-page">
      <h1>Disponibilites</h1>
      <div className="pro-card-list">
        {slots.map((slot) => (
          <article key={slot.id} className="slot-card">
            <div><h2>{slot.day}</h2><p>{slot.value}</p></div>
            <label>
              <input
                type="checkbox"
                checked={slot.active}
                onChange={() => setSlots((rows) => rows.map((r) => (r.id === slot.id ? { ...r, active: !r.active } : r)))}
              />
              Actif
            </label>
          </article>
        ))}
      </div>
    </section>
  )
}
