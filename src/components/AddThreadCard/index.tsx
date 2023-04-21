import { useNavigate } from 'react-router-dom';
import './add-thread-card.css';

const AddThreadCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/add-updThread')}
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
