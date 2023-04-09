import { Link } from 'react-router-dom';
import './add-thread-card.css';

const AddThreadCard = () => {
  return (
    <div className="add-thread-item-wrapper">
      <Link to="/addThread">
        <div className="icon-wrapper">
          <span className="icon">
            <i className="fas fa-plus fa-3x fa-fade"></i>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default AddThreadCard;
