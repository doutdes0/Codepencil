import { Cell } from '../state';
import ActionBar from './action-bar';
import CodeCell from './codecell';
import TextEditor from './text-editor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div>
      <ActionBar
        id={cell.id}
        type={cell.type}
      />
      {cell.type === 'code' && <CodeCell cell={cell} />}
      {cell.type === 'text' && <TextEditor cell={cell} />}
    </div>
  );
};

export default CellListItem;
