import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { Fragment } from 'react';
import './cell-list.css';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) => {
    return order.map((id) => data[id]);
  });
  return (
    <div className="cell-list-wrapper">
      {cells.length === 0 && (
        <AddCell
          forceVisible={cells.length === 0}
          nextCellId={null}
        />
      )}

      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem
            key={cell.id}
            cell={cell}
          />

          <AddCell nextCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
