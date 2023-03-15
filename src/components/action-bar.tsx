import { useActions } from '../hooks/use-actions';
import './action-bar.css';

interface ActionBarProps {
  id: string;
  type: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, type }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar-wrapper">
      <div className="mark">
        <span className="icon">
          {type === 'code' && <i className="fas fa-code"></i>}
          {type === 'text' && <i className="fas fa-pencil-alt"></i>}
        </span>
      </div>
      <button
        title="Move cell up"
        onClick={() => moveCell(id, 'up')}
      >
        <span className="icon">
          <i className="fas fa-angle-double-up"></i>
        </span>
      </button>
      <button
        title="Move cell down"
        onClick={() => moveCell(id, 'down')}
      >
        <span className="icon">
          <i className="fas fa-angle-double-down"></i>
        </span>
      </button>
      <button
        title="Delete cell"
        onClick={() => deleteCell(id)}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
