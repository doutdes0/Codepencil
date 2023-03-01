import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import './text-editor.css';

const TextEditor: React.FC = () => {
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(true);
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (editorRef.current && e.target && !editorRef.current.contains(e.target as Node)) {
        setEditing(false);
      }
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={editorRef}>
        <div className="text-editor-wrapper">
          <MDEditor
            value={input}
            height={window.innerHeight * 0.6}
            onChange={(value) => {
              setInput(value || '');
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <div className="text-editor-wrapper">
        <MDEditor.Markdown source={input ? input : 'Click me to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
