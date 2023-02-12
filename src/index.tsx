import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';
import { unpkgPlugin } from './plugin/unpkPlugin';
import { fetchPlugin } from './plugin/fetchPlugin';
import CodeEditor from './components/code-editor';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const ref = useRef<esbuild.Service>();
  const iframe = useRef<any>();
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
    //Reset iframe before each bundling
    iframe.current.srcDoc = html;
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

    // setCode(result.outputFiles[0].text);
    //Post a message from parent window to iframe, containing bundled code
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = ` <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (e) => {
          try {
            eval(e.data);
          } catch(err) {
            const root = document.getElementById('root');
            root.innerHTML = '<div>' + err + '</div>';
            console.error(err);
          }
          
        }, false);
      </script>
    </body>
  </html>`;

  return (
    <div>
      <CodeEditor
        onChange={(value) => setInput(value)}
        initialValue='const foo = "bar";'
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        cols={30}
        rows={10}
      ></textarea>
      <button onClick={onChange}>Submit</button>
      <pre>{code}</pre>
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      ></iframe>
    </div>
  );
};
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
