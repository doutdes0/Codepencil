import { Thread } from '../../state/reducers/threadsReducer';
import './thread-item.css';

interface ThreadListItemProps {
  thread: Thread;
}

const ThreadListItem: React.FC<ThreadListItemProps> = ({ thread: { name, description } }) => {
  return (
    <div className="thread-item-wrapper">
      <h3>{name}</h3>
      {description && <p>`${description}`</p>}
    </div>
  );
};

export default ThreadListItem;
