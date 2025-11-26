import { useState, useRef, useEffect } from 'react'
import './AIButton.css'

function AIButton() {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const [customPrompt, setCustomPrompt] = useState('')

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleAIAction = (action: string) => {
    console.log(`AI Action: ${action}`)
    setIsOpen(false)
  }

  return (
    <>
      <button className="ai-button" onClick={() => setIsOpen(!isOpen)}>
        AI
      </button>
      {isOpen && (
        <div className="ai-panel" ref={panelRef}>
          <div className="ai-panel-header">
            <h3>Opcje AI</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="ai-options">
            <button 
              className="ai-option"
              onClick={() => handleAIAction('quick-edit')}
            >
              Szybka korekta
            </button>
            <button 
              className="ai-option"
              onClick={() => handleAIAction('advanced-edit')}
            >
              Zaawansowana korekta
            </button>
            <button 
              className="ai-option"
              onClick={() => handleAIAction('expand')}
            >
              Rozszerzanie
            </button>
            <button 
              className="ai-option"
              onClick={() => handleAIAction('questions')}
            >
              Generowanie pytań
            </button>
            <div className="custom-prompt-section">
              <label>Niestandardowy prompt:</label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Wpisz swój prompt..."
                className="custom-prompt-input"
              />
              <button 
                className="ai-option custom-submit"
                onClick={() => handleAIAction(`custom: ${customPrompt}`)}
                disabled={!customPrompt.trim()}
              >
                Wykonaj
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIButton
