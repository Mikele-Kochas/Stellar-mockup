import './NotesGrid.css'

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  tags: string[]
}

type Mode = 'synthesis' | 'chat' | 'study' | null

interface NotesGridProps {
  notes: Note[]
  onNoteClick: (noteId: string) => void
  activeMode: Mode
  selectedNotes: string[]
  onModeActivate: (mode: Mode) => void
  onConfirmSelection: () => void
  onCancelSelection: () => void
}

function NotesGrid({ 
  notes, 
  onNoteClick, 
  activeMode, 
  selectedNotes,
  onModeActivate,
  onConfirmSelection,
  onCancelSelection
}: NotesGridProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const getModeLabel = () => {
    switch (activeMode) {
      case 'synthesis':
        return 'Wybierz co najmniej 2 notatki do syntezy'
      case 'chat':
        return 'Wybierz notatki do rozmowy'
      case 'study':
        return 'Wybierz notatki do nauki'
      default:
        return ''
    }
  }

  const canConfirm = () => {
    if (activeMode === 'synthesis') {
      return selectedNotes.length >= 2
    }
    return selectedNotes.length >= 1
  }

  return (
    <div className="notes-grid-container">
      <div className="notes-header">
        <h2>Moje Notatki</h2>
        <div className="header-actions">
          {!activeMode ? (
            <>
              <button className="mode-activate-btn" onClick={() => onModeActivate('synthesis')}>
                Synteza
              </button>
              <button className="mode-activate-btn" onClick={() => onModeActivate('chat')}>
                Rozmowa
              </button>
              <button className="mode-activate-btn" onClick={() => onModeActivate('study')}>
                Nauka
              </button>
              <button className="new-note-button">
                <span className="icon">+</span>
                Nowa Notatka
              </button>
            </>
          ) : (
            <div className="selection-mode-bar">
              <span className="selection-info">{getModeLabel()}</span>
              <div className="selection-actions">
                <button className="cancel-selection-btn" onClick={onCancelSelection}>
                  Anuluj
                </button>
                <button 
                  className="confirm-selection-btn"
                  onClick={onConfirmSelection}
                  disabled={!canConfirm()}
                >
                  Potwierdź ({selectedNotes.length})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="notes-grid">
        {notes.map((note) => (
          <div 
            key={note.id} 
            className={`note-card ${selectedNotes.includes(note.id) ? 'selected' : ''} ${activeMode ? 'selection-mode' : ''}`}
            onClick={() => onNoteClick(note.id)}
          >
            <div className="note-card-header">
              <h3 className="note-title">{note.title}</h3>
              <span className="note-date">{formatDate(note.createdAt)}</span>
            </div>
            <p className="note-preview">{note.content}</p>
            <div className="note-tags">
              {note.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
            {!activeMode && (
              <div className="note-card-footer">
                <span className="note-actions">
                  <button className="action-btn" onClick={(e) => { e.stopPropagation(); console.log('Edit') }}>
                    Edytuj
                  </button>
                  <button className="action-btn" onClick={(e) => { e.stopPropagation(); console.log('Delete') }}>
                    Usun
                  </button>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotesGrid
