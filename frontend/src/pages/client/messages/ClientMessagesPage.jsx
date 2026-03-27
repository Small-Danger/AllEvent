import { useMemo, useState } from 'react'
import { messageThreads } from '../clientMockData'
import './ClientMessagesPage.css'

export function ClientMessagesPage() {
  const [threads, setThreads] = useState(messageThreads)
  const [activeId, setActiveId] = useState(messageThreads[0]?.id || '')
  const [draft, setDraft] = useState('')

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeId),
    [threads, activeId],
  )

  const sendMessage = () => {
    if (!draft.trim() || !activeThread) return

    setThreads((current) =>
      current.map((thread) =>
        thread.id === activeThread.id
          ? {
              ...thread,
              messages: [
                ...thread.messages,
                {
                  id: `M-${Date.now()}`,
                  from: 'me',
                  text: draft.trim(),
                  time: 'Maintenant',
                },
              ],
            }
          : thread,
      ),
    )
    setDraft('')
  }

  return (
    <section className="client-messages-page">
      <header>
        <h1>Messages</h1>
        <p>Echangez rapidement avec vos prestataires.</p>
      </header>

      <div className="messages-layout">
        <aside className="thread-list">
          {threads.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => setActiveId(thread.id)}
              className={thread.id === activeId ? 'active' : ''}
            >
              <strong>{thread.with}</strong>
              <small>
                {thread.unread > 0 ? `${thread.unread} non lus` : 'Aucun non lu'}
              </small>
            </button>
          ))}
        </aside>

        <article className="chat-panel">
          {activeThread && (
            <>
              <h2>{activeThread.with}</h2>
              <div className="chat-messages">
                {activeThread.messages.map((message) => (
                  <div
                    key={message.id}
                    className={message.from === 'me' ? 'chat-bubble me' : 'chat-bubble'}
                  >
                    <p>{message.text}</p>
                    <small>{message.time}</small>
                  </div>
                ))}
              </div>
              <div className="chat-composer">
                <input
                  type="text"
                  placeholder="Votre message..."
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                />
                <button type="button" onClick={sendMessage}>
                  Envoyer
                </button>
              </div>
            </>
          )}
        </article>
      </div>
    </section>
  )
}
