import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import { useActions } from '../../hooks/use-actions';
import { Cell } from '../../state';
import './text-editor.css';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [editing, setEditing] = useState(false);
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
        <div className="editor-wrapper">
          <MDEditor
            value={cell.content}
            height={window.innerHeight * 0.6}
            onChange={(value) => updateCell(cell.id, value || '')}
          />
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <div className="md-wrapper">
        <MDEditor.Markdown source={cell.content || 'Click me to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
