import { useState } from 'react'
import NotesGrid from './components/NotesGrid'
import Editor from './components/Editor'
import SynthesisScreen from './components/SynthesisScreen'
import ChatMode from './components/ChatMode'
import StudyMode from './components/StudyMode'
import StarfieldBackground from './components/StarfieldBackground'
import './App.css'

type Mode = 'synthesis' | 'chat' | 'study' | null

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  tags: string[]
}

function App() {
  const [currentNote, setCurrentNote] = useState<string | null>(null)
  const [activeMode, setActiveMode] = useState<Mode>(null)
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])
  const [showSynthesis, setShowSynthesis] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showStudy, setShowStudy] = useState(false)
  const [notes, setNotes] = useState<Note[]>([
    { 
      id: '1', 
      title: 'Wprowadzenie do UX Design', 
      content: 'UX Design to proces projektowania produktów cyfrowych skupiony na doświadczeniu użytkownika. Główne zasady to: użyteczność, dostępność, estetyka i funkcjonalność...', 
      createdAt: '2024-01-15',
      tags: ['UX', 'Design', 'Podstawy']
    },
    { 
      id: '2', 
      title: 'Psychologia kolorów w interfejsach', 
      content: 'Kolory wpływają na emocje i zachowania użytkowników. Niebieski budzi zaufanie, czerwony przyciąga uwagę, zielony kojarzy się z sukcesem...', 
      createdAt: '2024-01-18',
      tags: ['Psychologia', 'Kolory']
    },
    { 
      id: '3', 
      title: 'Prototypowanie i testowanie', 
      content: 'Prototypy pozwalają na szybkie testowanie pomysłów przed finalną implementacją. Wyróżniamy prototypy niskiej i wysokiej wierności...', 
      createdAt: '2024-01-20',
      tags: ['Prototypowanie', 'Testowanie']
    },
    { 
      id: '4', 
      title: 'Responsywność i dostępność', 
      content: 'Projektowanie responsywne zapewnia działanie interfejsu na różnych urządzeniach. Dostępność (a11y) czyni produkt użytecznym dla wszystkich...', 
      createdAt: '2024-01-22',
      tags: ['Responsywność', 'A11y']
    },
    { 
      id: '5', 
      title: 'User Research metodologie', 
      content: 'Badania użytkowników to podstawa dobrego UX. Metody: wywiady, ankiety, testy użyteczności, analiza danych behawioralnych...', 
      createdAt: '2024-01-25',
      tags: ['Research', 'Metodologie']
    },
    { 
      id: '6', 
      title: 'Design Systems i komponenty', 
      content: 'Systemy designu zapewniają spójność wizualną i funkcjonalną. Zawierają biblioteki komponentów, style guide i zasady użycia...', 
      createdAt: '2024-01-28',
      tags: ['Design System', 'Komponenty']
    },
  ])

  const handleNoteClick = (noteId: string) => {
    if (activeMode) {
      // Tryb zaznaczania
      setSelectedNotes(prev => 
        prev.includes(noteId)
          ? prev.filter(id => id !== noteId)
          : [...prev, noteId]
      )
    } else {
      // Normalne otwarcie notatki
      setCurrentNote(noteId)
    }
  }

  const handleModeActivate = (mode: Mode) => {
    setActiveMode(mode)
    setSelectedNotes([])
  }

  const handleConfirmSelection = () => {
    if (activeMode === 'synthesis' && selectedNotes.length >= 2) {
      setShowSynthesis(true)
    } else if (activeMode === 'chat' && selectedNotes.length >= 1) {
      setShowChat(true)
    } else if (activeMode === 'study' && selectedNotes.length >= 1) {
      setShowStudy(true)
    }
  }

  const handleCancelSelection = () => {
    setActiveMode(null)
    setSelectedNotes([])
  }

  const handleSynthesisComplete = (synthesizedNote: Note) => {
    setNotes(prev => [synthesizedNote, ...prev])
    setShowSynthesis(false)
    setActiveMode(null)
    setSelectedNotes([])
    setCurrentNote(synthesizedNote.id)
  }

  const handleCloseMode = () => {
    setShowSynthesis(false)
    setShowChat(false)
    setShowStudy(false)
    setActiveMode(null)
    setSelectedNotes([])
  }

  const handleCloseEditor = () => {
    setCurrentNote(null)
  }

  return (
    <div className="app">
      <StarfieldBackground />
      <div className="app-header">
        <h1 className="app-title">Stellar Notebook</h1>
      </div>
      
      {showSynthesis ? (
        <SynthesisScreen
          notes={notes.filter(n => selectedNotes.includes(n.id))}
          onComplete={handleSynthesisComplete}
          onCancel={handleCloseMode}
        />
      ) : showChat ? (
        <ChatMode
          notes={notes.filter(n => selectedNotes.includes(n.id))}
          onClose={handleCloseMode}
        />
      ) : showStudy ? (
        <StudyMode
          notes={notes.filter(n => selectedNotes.includes(n.id))}
          onClose={handleCloseMode}
        />
      ) : currentNote ? (
        <Editor 
          noteId={currentNote} 
          note={notes.find(n => n.id === currentNote)}
          onClose={handleCloseEditor}
        />
      ) : (
        <NotesGrid 
          notes={notes} 
          onNoteClick={handleNoteClick}
          activeMode={activeMode}
          selectedNotes={selectedNotes}
          onModeActivate={handleModeActivate}
          onConfirmSelection={handleConfirmSelection}
          onCancelSelection={handleCancelSelection}
        />
      )}
    </div>
  )
}

export default App
