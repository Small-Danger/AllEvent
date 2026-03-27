import { useState } from 'react'
import { invoicesSeed, paymentMethodsSeed } from '../clientMockData'
import './ClientPaymentsPage.css'

function formatAmount(value) {
  return `${value.toLocaleString('fr-FR')} XAF`
}

export function ClientPaymentsPage() {
  const [methods, setMethods] = useState(paymentMethodsSeed)
  const [invoices] = useState(invoicesSeed)
  const [newMethod, setNewMethod] = useState('')

  const addMethod = (event) => {
    event.preventDefault()
    if (!newMethod.trim()) return

    setMethods((current) => [
      ...current,
      {
        id: `PM-${Date.now()}`,
        type: 'Mobile Money',
        label: newMethod.trim(),
        isDefault: false,
      },
    ])
    setNewMethod('')
  }

  const markDefault = (id) => {
    setMethods((current) =>
      current.map((method) => ({ ...method, isDefault: method.id === id })),
    )
  }

  return (
    <section className="client-payments-page">
      <header>
        <h1>Paiements</h1>
        <p>Suivez vos transactions et configurez vos moyens de paiement.</p>
      </header>

      <div className="payments-grid">
        <article className="payments-panel">
          <div className="panel-head">
            <h2>Moyens de paiement</h2>
          </div>
          <div className="methods-list">
            {methods.map((method) => (
              <div key={method.id} className="method-card">
                <div>
                  <strong>{method.label}</strong>
                  <p>{method.type}</p>
                </div>
                {method.isDefault ? (
                  <span className="default-badge">Par defaut</span>
                ) : (
                  <button type="button" onClick={() => markDefault(method.id)}>
                    Definir par defaut
                  </button>
                )}
              </div>
            ))}
          </div>
          <form className="new-method-form" onSubmit={addMethod}>
            <input
              type="text"
              placeholder="Ex: Orange Money - **** 9011"
              value={newMethod}
              onChange={(event) => setNewMethod(event.target.value)}
            />
            <button type="submit">Ajouter</button>
          </form>
        </article>

        <article className="payments-panel">
          <div className="panel-head">
            <h2>Factures recentes</h2>
          </div>
          <div className="invoice-list">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="invoice-row">
                <div>
                  <strong>{invoice.id}</strong>
                  <p>{invoice.date}</p>
                </div>
                <div className="invoice-meta">
                  <span className={invoice.status === 'paid' ? 'paid' : 'refunded'}>
                    {invoice.status}
                  </span>
                  <strong>{formatAmount(invoice.amount)}</strong>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
