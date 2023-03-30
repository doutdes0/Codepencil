import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="nav-sticky">
      <div className="navbar">
        <div className="logo">
          <svg
            fill="#ffffff"
            height="1.25rem"
            width="1.5rem"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 306.637 306.637"
            xmlSpace="preserve"
            stroke="#ffffff"
          >
            <g
              id="SVGRepo_bgCarrier"
              stroke-width="0"
            ></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <g>
                {' '}
                <g>
                  {' '}
                  <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896 l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"></path>{' '}
                  <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095 L265.13,75.602L231.035,41.507z"></path>{' '}
                </g>{' '}
                <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{' '}
                <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{' '}
              </g>{' '}
            </g>
          </svg>
          <h3>CODEPENCIL</h3>
        </div>

        <ul className="links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/threads">Threads</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
        </ul>

        <div className="nav-buttons">
          <button>Sign-up</button>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
