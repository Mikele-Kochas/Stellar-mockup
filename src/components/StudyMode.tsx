import { useState } from 'react'
import './StudyMode.css'

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  tags: string[]
}

interface StudyModeProps {
  notes: Note[]
  onClose: () => void
}

function StudyMode({ notes, onClose }: StudyModeProps) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: `Cześć! Jestem twoim asystentem do nauki. Będę zadawał ci pytania na podstawie notatek: ${notes.map(n => n.title).join(', ')}. Gotowy na pierwsze pytanie?`, 
      isBot: true 
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { id: messages.length + 1, text: input, isBot: false }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Placeholder pytanie od bota
    setTimeout(() => {
      const questions = [
        'Świetnie! Oto następne pytanie: Co to jest UX Design i jakie są jego główne zasady?',
        'Dobrze! Teraz: Jak kolory wpływają na zachowania użytkowników w interfejsach?',
        'Doskonale! Kolejne pytanie: Czym różnią się prototypy niskiej i wysokiej wierności?',
        'Bardzo dobrze! Ostatnie pytanie: Jakie metody badania użytkowników znasz?'
      ]
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: randomQuestion,
        isBot: true
      }])
    }, 1000)
  }

  return (
    <div className="study-mode">
      <div className="study-header">
        <h2>Tryb Nauki</h2>
        <button className="close-study-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="study-content-wrapper">
        <div className="study-sidebar">
        <h3>Wybrane notatki:</h3>
        <div className="study-notes-list">
          {notes.map(note => (
            <div key={note.id} className="study-note-item">
              <h4>{note.title}</h4>
              <p>{note.content.substring(0, 80)}...</p>
            </div>
          ))}
        </div>
      </div>

      <div className="study-main">
        <div className="study-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="study-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Odpowiedz na pytanie..."
            className="study-input"
          />
          <button onClick={handleSend} className="send-button">Wyślij</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default StudyMode

