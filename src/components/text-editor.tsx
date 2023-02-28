import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';

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
        <MDEditor
          value={input}
          onChange={(value) => {
            setInput(value!);
          }}
        />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown
        source={input}
        prefixCls="Click me"
      />
    </div>
  );
};

export default TextEditor;
