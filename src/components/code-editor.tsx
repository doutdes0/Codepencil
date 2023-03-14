import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import './code-editor.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  //Reference the instance of editor to use in other methods
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    //Add in-built event listener for changes in editor, pass the value to onChange
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    const highlighter = new Highlighter(
      //@ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      //Removing unnecessary error logs
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormat = () => {
    //Get current value from editor
    const unformated = editorRef.current.getModel().getValue();
    //Format
    const formated = prettier.format(unformated, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    //Push formated value back to editor
    editorRef.current.setValue(formated);
  };
  return (
    <div className="code-wrapper">
      <button
        className="format-btn"
        onClick={onFormat}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        className="code-editor"
        language="javascript"
        theme="dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          colorDecorators: true,
          scrollbar: { alwaysConsumeMouseWheel: false },
        }}
      />
    </div>
  );
};

export default CodeEditor;
