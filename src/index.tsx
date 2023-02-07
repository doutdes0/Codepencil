import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugin/unpkPathPlugin';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const ref = useRef<esbuild.Service>();
  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    ref.current = await esbuild.startService({
      wasmURL: '/esbuild.wasm',
      worker: true,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ref.current) {
      return;
    }
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(input)],
      define: {
        'process.env.NODE.ENV': "'production'",
        global: 'window',
      },
    });
    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          cols={30}
          rows={10}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <pre>{code}</pre>
    </div>
  );
};
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
