import { useTypedSelector } from '../../hooks/use-typed-selector';
import './cell-list-card.css';

interface CellListCardProps {
  threadID: string;
}

const CellListCard: React.FC<CellListCardProps> = ({ threadID }) => {
  const { name, description } = useTypedSelector((state) => {
    return state.threads.data[threadID];
  });
  return (
    <div className="title-wrapper">
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default CellListCard;
