import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Iframe from './iframe';
import bundle from '../bundler';
import Resizable from './resizable';
import { useActions } from '../hooks/use-actions';
import { Cell } from '../state';
import './codecell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const res = await bundle(cell.content);
      setCode(res.code);
      setErr(res.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
      setErr('');
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="codecell-wrapper">
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCell(cell.id, value)}
            initialValue={cell.content}
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
