import { Thread } from '../../state/reducers/threadsReducer';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/use-actions';
import { SyntheticEvent } from 'react';
import './thread-item.css';

interface ThreadListItemProps {
  thread: Thread;
}

const ThreadListItem: React.FC<ThreadListItemProps> = ({ thread: { name, description, id } }) => {
  const navigate = useNavigate();
  const { deleteThread } = useActions();
  const onClickEdit = (e: SyntheticEvent) => {
    e.stopPropagation();
    navigate('/add-updThread', { state: { threadID: id, name, description } });
  };
  return (
    <div
      onClick={() => navigate('/cellList', { state: { threadID: id } })}
      className="thread-item-wrapper"
    >
      <h3>{name}</h3>
      {description && <p>{description}</p>}
      <div className="action-buttons">
        <button
          onClick={(e) => onClickEdit(e)}
          title="Edit thread"
        >
          <span className="icon">
            <i className="fas fa-sm fa-pencil-alt"></i>
          </span>
        </button>
        <button
          title="Delete thread"
          onClick={(e) => {
            e.stopPropagation();
            deleteThread(id);
          }}
        >
          <span className="icon">
            <i className="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ThreadListItem;
