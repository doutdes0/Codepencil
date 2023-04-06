import { useActions } from '../../hooks/use-actions';
import { Fragment } from 'react';
import './action-bar.css';

interface ActionBarProps {
  cellID: string;
  type: string;
  threadID: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ cellID, type, threadID }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <Fragment>
      <div className="action-bar-wrapper">
        <div className="mark">
          <span className="icon">
            {type === 'code' && <i className="fas fa-code"></i>}
            {type === 'text' && <i className="fas fa-pencil-alt"></i>}
          </span>
        </div>
        <button
          title="Move cell up"
          onClick={() => moveCell(threadID, cellID, 'up')}
        >
          <span className="icon">
            <i className="fas fa-angle-double-up"></i>
          </span>
        </button>
        <button
          title="Move cell down"
          onClick={() => moveCell(threadID, cellID, 'down')}
        >
          <span className="icon">
            <i className="fas fa-angle-double-down"></i>
          </span>
        </button>
        <button
          title="Delete cell"
          onClick={() => deleteCell(threadID, cellID)}
        >
          <span className="icon">
            <i className="fas fa-times"></i>
          </span>
        </button>
      </div>
      <div className="action-bar-divider"></div>
    </Fragment>
  );
};

export default ActionBar;
