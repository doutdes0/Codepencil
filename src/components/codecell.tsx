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

  const cumulativeCode = useTypedSelector((state) => {
    const { order, data } = state.cells;
    const orderedList = order.map((id) => data[id]);
    const cumulativeCode = [
      `
    import React from 'react';
    import ReactDOM from 'react-dom';
    const _root = ReactDOM.createRoot(root);
    const show = (val) => {
      if(typeof val === 'object') {
        if(val.$$typeof && val.props) {
          _root.render(val);
        } else {
        root.innerHTML = JSON.stringify(val);
        }
      } else {
        root.innerHTML = val;
      }
    }
    `,
    ];

    for (let c of orderedList) {
      if (c.type === 'code') cumulativeCode.push(c.content);
      if (c.id === cell.id) break;
    }
    return cumulativeCode.join('\n');
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, createBundle]);

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
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
          {(!bundle || bundle.loading) && (
            <div className="spinner-wrapper">
              <div className="loading-spinner"></div>
            </div>
          )}
          {bundle && (
            <Iframe
              code={bundle.code}
              bundlerErr={bundle.err}
            />
          )}
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
