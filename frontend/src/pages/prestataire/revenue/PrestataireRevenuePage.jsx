import { proRevenueSeed } from '../prestataireMockData'
import './PrestataireRevenuePage.css'

function money(value) {
  return `${value.toLocaleString('fr-FR')} XAF`
}

export function PrestataireRevenuePage() {
  return (
    <section className="pro-revenue-page">
      <h1>Revenus</h1>
      <div className="pro-card-list">
        {proRevenueSeed.map((item) => (
          <article key={item.id} className="revenue-row">
            <h2>{item.month}</h2>
            <p>Brut: {money(item.gross)}</p>
            <p>Commission: {money(item.commission)}</p>
            <strong>Net: {money(item.net)}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
