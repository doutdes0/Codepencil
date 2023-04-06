import { Cell } from '../../state';
import ActionBar from '../ActionBar';
import CodeCell from '../CodeCell';
import TextEditor from '../TextEditor';

interface CellListItemProps {
  threadID: string;
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ threadID, cell }) => {
  return (
    <div>
      <ActionBar
        cellID={cell.id}
        type={cell.type}
        threadID={threadID}
      />
      {cell.type === 'code' && (
        <CodeCell
          cell={cell}
          threadID={threadID}
        />
      )}
      {cell.type === 'text' && (
        <TextEditor
          cell={cell}
          threadID={threadID}
        />
      )}
    </div>
  );
};

export default CellListItem;
