import { useActions } from '../hooks/use-actions';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div>
      <button onClick={() => moveCell(id, 'up')}>
        <span className="icon">
          <i className="fas fa-angle-double-up"></i>
        </span>
      </button>
      <button onClick={() => moveCell(id, 'down')}>
        <span className="icon">
          <i className="fas fa-angle-double-down"></i>
        </span>
      </button>
      <button onClick={() => deleteCell(id)}>
        <span className="icon">
          <i className="fas fa-trash-alt"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
