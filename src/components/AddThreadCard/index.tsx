import { useNavigate } from 'react-router-dom';
import './add-thread-card.css';

const AddThreadCard = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/addThread')}
      className="add-thread-item-wrapper"
    >
      <div className="icon-wrapper">
        <span className="icon">
          <i className="fas fa-plus fa-3x fa-fade"></i>
        </span>
      </div>
    </div>
  );
};

export default AddThreadCard;
