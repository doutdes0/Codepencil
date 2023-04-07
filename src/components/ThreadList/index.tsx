import { useTypedSelector } from '../../hooks/use-typed-selector';
import ThreadListItem from '../ThreadListItem';
import { Fragment } from 'react';
import { redirect, Link } from 'react-router-dom';

const ThreadList: React.FC = () => {
  const threads = useTypedSelector(({ threads: { data } }) => {
    return Object.values(data);
  });
  return (
    <div>
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
