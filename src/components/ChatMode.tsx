import { useState } from 'react'
import './ChatMode.css'

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  tags: string[]
}

interface ChatModeProps {
  notes: Note[]
  onClose: () => void
}

function ChatMode({ notes, onClose }: ChatModeProps) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: `Cześć! Jestem asystentem AI. Mogę odpowiadać na pytania dotyczące wybranych notatek: ${notes.map(n => n.title).join(', ')}. O co chciałbyś zapytać?`, 
      isBot: true 
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { id: messages.length + 1, text: input, isBot: false }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Placeholder odpowiedź
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'To jest przykładowa odpowiedź AI. W rzeczywistej aplikacji tutaj byłaby analiza wybranych notatek i odpowiedź na podstawie ich treści. AI może odpowiadać na pytania, wyjaśniać koncepcje, porównywać informacje z różnych notatek i wiele więcej.',
        isBot: true
      }])
    }, 1000)
  }

  return (
    <div className="chat-mode">
      <div className="chat-header">
        <h2>Rozmowa o Notatkach</h2>
        <button className="close-chat-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="chat-content-wrapper">
        <div className="chat-sidebar">
        <h3>Wybrane notatki:</h3>
        <div className="chat-notes-list">
          {notes.map(note => (
            <div key={note.id} className="chat-note-item">
              <h4>{note.title}</h4>
              <p>{note.content.substring(0, 80)}...</p>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Zadaj pytanie..."
            className="chat-input"
          />
          <button onClick={handleSend} className="send-button">Wyślij</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ChatMode

