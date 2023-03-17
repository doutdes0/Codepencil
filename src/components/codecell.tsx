import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Iframe from './iframe';
import Resizable from './resizable';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { Cell } from '../state';
import './codecell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundles = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    if (!bundles) {
      createBundle(cell.id, cell.content);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cell.content, createBundle]);

  return (
    <div>
      <Resizable direction="vertical">
        <div className="codecell">
          <Resizable direction="horizontal">
            <CodeEditor
              onChange={(value) => updateCell(cell.id, value)}
              initialValue={cell.content}
            />
          </Resizable>
          {bundles && (
            <Iframe
              code={bundles.code}
              bundlerErr={bundles.err}
            />
          )}
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
