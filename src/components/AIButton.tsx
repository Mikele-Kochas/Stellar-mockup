import { useState, useRef, useEffect } from 'react'
import './AIButton.css'

interface AIButtonProps {
  onApplyCorrection?: (text: string) => void
}

function AIButton({ onApplyCorrection }: AIButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [resultType, setResultType] = useState<string>('')
  const panelRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const [customPrompt, setCustomPrompt] = useState('')

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node) &&
          resultRef.current && !resultRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowResult(false)
      }
    }

    if (isOpen || showResult) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, showResult])

  const getCorrectedText = (type: string) => {
    const examples: { [key: string]: string } = {
      'quick-edit': `UX Design to proces projektowania produktów cyfrowych skupiony na doświadczeniu użytkownika. Główne zasady to: użyteczność, dostępność, estetyka i funkcjonalność.

**Użyteczność** oznacza, że produkt jest łatwy w obsłudze i intuicyjny. Użytkownik powinien móc osiągnąć swoje cele bez zbędnych komplikacji.

**Dostępność** (a11y) czyni produkt użytecznym dla wszystkich, niezależnie od ich możliwości. To kluczowy element odpowiedzialnego projektowania.

**Estetyka** wpływa na pierwsze wrażenie i ogólne odczucia użytkownika. Piękny interfejs może zwiększyć zaufanie do produktu.

**Funkcjonalność** zapewnia, że wszystkie elementy działają zgodnie z oczekiwaniami użytkownika.`,

      'advanced-edit': `# Wprowadzenie do UX Design

## Podstawowe zasady

UX Design to kompleksowy proces projektowania produktów cyfrowych, który skupia się na **doświadczeniu użytkownika**. Proces ten obejmuje kilka kluczowych zasad:

### Użyteczność (Usability)

**Użyteczność** oznacza, że produkt jest łatwy w obsłudze i intuicyjny. Użytkownik powinien móc osiągnąć swoje cele bez zbędnych komplikacji. Dobrze zaprojektowany interfejs prowadzi użytkownika przez proces w sposób naturalny i przewidywalny.

### Dostępność (Accessibility)

**Dostępność**, często oznaczana jako **a11y**, czyni produkt użytecznym dla wszystkich, niezależnie od ich możliwości. To kluczowy element odpowiedzialnego projektowania, który uwzględnia różnorodne potrzeby użytkowników.

### Estetyka (Aesthetics)

**Estetyka** wpływa na pierwsze wrażenie i ogólne odczucia użytkownika. Piękny interfejs może zwiększyć zaufanie do produktu i poprawić ogólne doświadczenie użytkownika.

### Funkcjonalność (Functionality)

**Funkcjonalność** zapewnia, że wszystkie elementy działają zgodnie z oczekiwaniami użytkownika. Każda funkcja powinna być przemyślana i służyć konkretnemu celowi.`
    }
    return examples[type] || examples['quick-edit']
  }

  const handleAIAction = (action: string) => {
    if (action === 'quick-edit' || action === 'advanced-edit') {
      setResultType(action)
      setShowResult(true)
      setIsOpen(false)
    } else {
      console.log(`AI Action: ${action}`)
      setIsOpen(false)
    }
  }

  const handleAccept = () => {
    const correctedText = getCorrectedText(resultType)
    if (onApplyCorrection) {
      onApplyCorrection(correctedText)
    }
    setShowResult(false)
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
      
      {showResult && (
        <div className="ai-result-overlay">
          <div className="ai-result-modal" ref={resultRef}>
            <div className="ai-result-header">
              <h3>{resultType === 'quick-edit' ? 'Szybka korekta' : 'Zaawansowana korekta'}</h3>
              <button className="close-result-btn" onClick={() => setShowResult(false)}>×</button>
            </div>
            <div className="ai-result-content">
              <div 
                className="corrected-text"
                dangerouslySetInnerHTML={{ 
                  __html: getCorrectedText(resultType)
                    .split('\n\n')
                    .map(para => {
                      if (para.startsWith('#')) {
                        return `<h1>${para.replace(/^#+\s*/, '')}</h1>`
                      }
                      if (para.startsWith('##')) {
                        return `<h2>${para.replace(/^##+\s*/, '')}</h2>`
                      }
                      if (para.startsWith('###')) {
                        return `<h3>${para.replace(/^###+\s*/, '')}</h3>`
                      }
                      return `<p>${para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`
                    })
                    .join('')
                }}
              />
            </div>
            <div className="ai-result-actions">
              <button className="accept-btn" onClick={handleAccept}>
                Zaakceptuj zmiany
              </button>
              <button className="reject-btn" onClick={() => setShowResult(false)}>
                Odrzuć
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIButton
