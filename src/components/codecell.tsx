import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Iframe from './iframe';
import bundle from '../bundler';
import Resizable from './resizable';
import './codecell.css';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const res = await bundle(input);
      setCode(res);
    }, 1000);

    return () => {
      clearTimeout(timer);
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

        <Iframe code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
