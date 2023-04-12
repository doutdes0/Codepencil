import { useTypedSelector } from '../../hooks/use-typed-selector';
import ThreadListItem from '../ThreadListItem';
import AddThreadCard from '../AddThreadCard';
import { Fragment } from 'react';
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
          <ThreadListItem
            key={thread.id}
            thread={thread}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default ThreadList;
