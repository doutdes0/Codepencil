import { Thread } from '../../state/reducers/threadsReducer';
import { useNavigate } from 'react-router-dom';
import './thread-item.css';

interface ThreadListItemProps {
  thread: Thread;
}

const ThreadListItem: React.FC<ThreadListItemProps> = ({ thread: { name, description, id } }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/cellList', { state: { threadID: id } })}
      className="thread-item-wrapper"
    >
      <h3>{name}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default ThreadListItem;
