import { SyntheticEvent, useState } from 'react';
import { useActions } from '../../hooks/use-actions';
import { useLocation, useNavigate } from 'react-router-dom';
import './add-upd-thread.css';

interface NavigateProps {
  threadID: string | null;
  name: string | null;
  description: string | null;
}

const AddUpdThread: React.FC = () => {
  const { createThread, updateThread } = useActions();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    threadID,
    name: currentName,
    description: currentDescription,
  } = location.state
    ? (location.state as NavigateProps)
    : { threadID: null, name: null, description: null };

  const [name, setName] = useState(currentName ? currentName : '');
  const [description, setDescription] = useState(currentDescription ? currentDescription : '');

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (location.state) {
      updateThread(threadID!, name, description);
    } else {
      createThread(name, description);
    }

    navigate('/threads');
  };

  return (
    <div className="add-thread-wrapper">
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          value={name}
          autoComplete="off"
          maxLength={60}
        />
        <label htmlFor="description">Description</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          value={description}
          cols={40}
          rows={10}
          maxLength={600}
        ></textarea>
        <div className="button-wrapper">
          <button type="submit">{location.state ? 'Update' : 'Create'}</button>
          <button
            name="discard"
            onClick={() => navigate('/threads')}
          >
            {location.state ? 'Discard changes' : 'Discard'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUpdThread;
