import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import CodeEditor from './components/code-editor';
import Iframe from './components/iframe';
import bundle from './bundler';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onChange = async () => {
    const res = await bundle(input);
    setCode(res);
  };

  return (
    <div>
      <CodeEditor
        onChange={(value) => setInput(value)}
        initialValue='const foo = "bar";'
      />
      <button onClick={onChange}>Submit</button>
      <pre>{code}</pre>
      <Iframe code={code} />
    </div>
  );
};
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
