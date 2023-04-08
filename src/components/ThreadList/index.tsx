import { useTypedSelector } from '../../hooks/use-typed-selector';
import ThreadListItem from '../ThreadListItem';
import AddThreadCard from '../AddThreadCard';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './thread-list.css';

const ThreadList: React.FC = () => {
  const threads = useTypedSelector(({ threads: { data } }) => {
    return Object.values(data);
  });
  return (
    <div className="thread-list-wrapper">
      <AddThreadCard />
      {threads.map((thread) => (
        <Fragment key={thread.id}>
          <Link
            to="/cellList"
            state={thread.id}
          >
            <ThreadListItem
              key={thread.id}
              thread={thread}
            />
          </Link>
        </Fragment>
      ))}
    </div>
  );
};

export default ThreadList;
