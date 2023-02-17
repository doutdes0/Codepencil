import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';
import { unpkgPlugin } from './plugin/unpkPlugin';
import { fetchPlugin } from './plugin/fetchPlugin';
import CodeEditor from './components/code-editor';
import Iframe from './components/iframe';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const ref = useRef<esbuild.Service>();

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    ref.current = await esbuild.startService({
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
      worker: true,
    });
  };

  const onChange = async () => {
    if (!ref.current) {
      return;
    }

    //Bundle code
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': "'production'",
        global: 'window',
      },
    });

    setCode(result.outputFiles[0].text);
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
