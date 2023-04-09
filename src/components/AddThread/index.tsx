import { SyntheticEvent, useState } from 'react';
import { useActions } from '../../hooks/use-actions';
import { Link, useNavigate } from 'react-router-dom';
import './add-thread.css';

const AddThread: React.FC = () => {
  const { createThread } = useActions();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    createThread(name, description);
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
        <button type="submit">Create</button>
        <Link to="/threads">
          <button>Discard</button>
        </Link>
      </form>
    </div>
  );
};

export default AddThread;
