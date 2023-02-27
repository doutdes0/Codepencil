import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Iframe from './iframe';
import bundle from '../bundler';
import Resizable from './resizable';
import './codecell.css';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const res = await bundle(input);
      setCode(res.code);
      setErr(res.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
      setErr('');
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div className="codecell-wrapper">
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => setInput(value)}
            initialValue='const foo = "bar";'
          />
        </Resizable>
        <Iframe
          code={code}
          bundlerErr={err}
        />
      </div>
    </Resizable>
  );
};

export default CodeCell;
