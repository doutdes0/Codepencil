import { useActions } from '../../hooks/use-actions';
import './add-cell.css';

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCell } = useActions();
  return (
    <div className={`add-cell-wrapper ${forceVisible ? 'force-visible' : ''}`}>
      <div className="divider"></div>

      <button
        title="Add codecell"
        onClick={() => insertCell(nextCellId, 'code')}
      >
        <span className="icon">
          <i className="fas fa-code"></i>
        </span>
      </button>

      <button
        title="Add textcell"
        onClick={() => insertCell(nextCellId, 'text')}
      >
        <span className="icon">
          <i className="fas fa-pencil-alt"></i>
        </span>
      </button>
    </div>
  );
};

export default AddCell;
