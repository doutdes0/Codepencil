import { useState } from 'react';
import CodeEditor from './code-editor';
import Iframe from './iframe';
import bundle from '../bundler';
import Resizable from './resizable';
import './codecell.css';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onChange = async () => {
    const res = await bundle(input);
    setCode(res);
  };

  return (
    <Resizable direction="vertical">
      <div className="codecell-wrapper">
        <CodeEditor
          onChange={(value) => setInput(value)}
          initialValue='const foo = "bar";'
        />
        <Iframe code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
