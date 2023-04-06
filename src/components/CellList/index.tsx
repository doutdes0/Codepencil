import { useTypedSelector } from '../../hooks/use-typed-selector';
import CellListItem from '../CellListItem/index';
import AddCell from '../AddCell/index';
import { Fragment } from 'react';
import './cell-list.css';
import { useLocation } from 'react-router-dom';

const CellList: React.FC = () => {
  const location = useLocation();
  const threadID = location.state;
  const cells = useTypedSelector((state) => {
    return Object.values(state.cells.data[threadID]);
  });
  return (
    <div className="cell-list-wrapper">
      {cells.length === 0 && (
        <AddCell
          forceVisible={cells.length === 0}
          nextCellID={null}
          threadID={threadID}
        />
      )}

      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem
            key={cell.id}
            cell={cell}
            threadID={threadID}
          />

          <AddCell
            nextCellID={cell.id}
            threadID={threadID}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
