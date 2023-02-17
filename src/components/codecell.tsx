import { useState } from 'react';
import CodeEditor from './code-editor';
import Iframe from './iframe';
import bundle from '../bundler';

const CodeCell = () => {
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
      <Iframe code={code} />
    </div>
  );
};

export default CodeCell;
