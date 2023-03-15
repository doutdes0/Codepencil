import { useActions } from '../hooks/use-actions';
import './add-cell.css';

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCell } = useActions();
  return (
    <div className="add-cell-wrapper">
      <button
        title="Add codecell"
        onClick={() => insertCell(nextCellId, 'code')}
      >
        CODE
      </button>
      <button
        title="Add textcell"
        onClick={() => insertCell(nextCellId, 'text')}
      >
        TEXT
      </button>
    </div>
  );
};

export default AddCell;
