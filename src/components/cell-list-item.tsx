import { Cell } from '../state';
import CodeCell from './codecell';
import TextEditor from './text-editor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div>
      {cell.type === 'code'} && <CodeCell />
      {cell.type === 'text'} && <TextEditor />
    </div>
  );
};

export default CellListItem;
