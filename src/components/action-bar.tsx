import { useActions } from '../hooks/use-actions';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div>
      <button onClick={() => moveCell(id, 'up')}>up</button>
      <button onClick={() => moveCell(id, 'down')}>down</button>
      <button onClick={() => deleteCell(id)}>del</button>
    </div>
  );
};

export default ActionBar;
