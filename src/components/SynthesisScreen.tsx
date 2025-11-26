import { useState } from 'react'
import './SynthesisScreen.css'

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  tags: string[]
}

interface SynthesisScreenProps {
  notes: Note[]
  onComplete: (note: Note) => void
  onCancel: () => void
}

function SynthesisScreen({ notes, onComplete, onCancel }: SynthesisScreenProps) {
  const [customPrompt, setCustomPrompt] = useState('')
  const [synthesisResult, setSynthesisResult] = useState<string | null>(null)
  const [synthesisTitle, setSynthesisTitle] = useState('')

  const handleGenerate = () => {
    // Mockup - symulacja generowania syntezy
    const mockSynthesis = `# Synteza notatek: ${notes.map(n => n.title).join(', ')}

## Wprowadzenie
Niniejsza notatka stanowi syntezę wybranych materiałów, łącząc kluczowe informacje w spójną całość.

${notes.map((note, idx) => `
## ${note.title}

${note.content}

`).join('\n')}

## Podsumowanie
Połączenie tych notatek pozwala na kompleksowe zrozumienie tematu, łącząc różne perspektywy i podejścia przedstawione w poszczególnych materiałach.

${customPrompt ? `\n## Dodatkowe uwagi\n${customPrompt}` : ''}
`
    setSynthesisResult(mockSynthesis)
    setSynthesisTitle(`Synteza: ${notes.map(n => n.title).join(' + ')}`)
  }

  const handleConfirm = () => {
    if (!synthesisResult) return
    
    const newNote: Note = {
      id: Date.now().toString(),
      title: synthesisTitle || 'Nowa synteza',
      content: synthesisResult,
      createdAt: new Date().toISOString().split('T')[0],
      tags: Array.from(new Set(notes.flatMap(n => n.tags)))
    }
    
    onComplete(newNote)
  }

  return (
    <div className="synthesis-screen">
      <div className="synthesis-header">
        <h2>Synteza Notatek</h2>
        <button className="close-synthesis-btn" onClick={onCancel}>×</button>
      </div>
      
      <div className="synthesis-content">
        <div className="synthesis-sidebar">
          <h3>Wybrane notatki:</h3>
          <div className="selected-notes-list">
            {notes.map(note => (
              <div key={note.id} className="selected-note-item">
                <h4>{note.title}</h4>
                <p>{note.content.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>

        <div className="synthesis-main">
          {!synthesisResult ? (
            <div className="synthesis-setup">
              <div className="prompt-section">
                <label htmlFor="custom-prompt">Dodatkowy prompt (opcjonalny):</label>
                <textarea
                  id="custom-prompt"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Np. Skup się na praktycznych zastosowaniach..."
                  className="custom-prompt-input"
                />
              </div>
              <button className="generate-btn" onClick={handleGenerate}>
                Generuj Syntezę
              </button>
            </div>
          ) : (
            <div className="synthesis-result">
              <div className="result-header">
                <input
                  type="text"
                  value={synthesisTitle}
                  onChange={(e) => setSynthesisTitle(e.target.value)}
                  className="result-title-input"
                  placeholder="Tytuł syntezy..."
                />
              </div>
              <div className="result-content">
                <pre className="result-text">{synthesisResult}</pre>
              </div>
              <div className="result-actions">
                <button className="regenerate-btn" onClick={() => setSynthesisResult(null)}>
                  Wygeneruj ponownie
                </button>
                <button className="confirm-btn" onClick={handleConfirm}>
                  Zatwierdź i utwórz notatkę
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SynthesisScreen

