import { useTypedSelector } from '../../hooks/use-typed-selector';
import CellListItem from '../CellListItem/index';
import AddCell from '../AddCell/index';
import CellListCard from '../CellListCard';
import { Fragment } from 'react';
import './cell-list.css';
import { useLocation } from 'react-router-dom';

interface StateProps {
  threadID: string;
}

const CellList: React.FC = () => {
  const location = useLocation();
  const { threadID } = location.state as StateProps;
  const cells = useTypedSelector((state) => {
    return state.cells.order[threadID].map((id) => state.cells.data[threadID][id]);
  });

  return (
    <div className="cell-list-wrapper">
      <CellListCard threadID={threadID} />
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
