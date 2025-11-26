import { useState, useRef, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import AIButton from './AIButton'
import './Editor.css'

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  tags: string[]
}

interface EditorProps {
  noteId: string | null
  note?: Note
  onClose: () => void
}

function Editor({ note, onClose }: EditorProps) {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const quillRef = useRef<ReactQuill>(null)

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [note])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ],
  }

  return (
    <div className="editor-container">
      <div className="editor-header">
        <button className="close-editor-btn" onClick={onClose}>
          ← Wróć do listy
        </button>
        <div className="editor-header-actions">
          <button className="save-btn">Zapisz</button>
        </div>
      </div>
      <div className="editor-wrapper">
        <input
          type="text"
          className="editor-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tytuł notatki..."
        />
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="Zacznij pisać swoją notatkę..."
          className="editor"
        />
      </div>
      <AIButton />
    </div>
  )
}

export default Editor
