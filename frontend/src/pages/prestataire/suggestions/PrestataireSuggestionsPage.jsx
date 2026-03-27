import { useState } from 'react'
import { proSuggestionsSeed } from '../prestataireMockData'
import './PrestataireSuggestionsPage.css'

export function PrestataireSuggestionsPage() {
  const [rows, setRows] = useState(proSuggestionsSeed)
  const [idea, setIdea] = useState('')

  const vote = (id) => setRows((current) => current.map((item) => (item.id === id ? { ...item, votes: item.votes + 1 } : item)))
  const addIdea = (event) => {
    event.preventDefault()
    if (!idea.trim()) return
    setRows((current) => [...current, { id: `SG-${Date.now()}`, label: idea.trim(), votes: 1 }])
    setIdea('')
  }

  return (
    <section className="pro-suggestions-page">
      <h1>Suggestions produit</h1>
      <form onSubmit={addIdea} className="pro-inline-form">
        <input value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="Proposer une amelioration..." />
        <button type="submit">Proposer</button>
      </form>
      <div className="pro-card-list">
        {rows.map((item) => (
          <article key={item.id} className="suggestion-row">
            <p>{item.label}</p>
            <button type="button" onClick={() => vote(item.id)}>+1 ({item.votes})</button>
          </article>
        ))}
      </div>
    </section>
  )
}
