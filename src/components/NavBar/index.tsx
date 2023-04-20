import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../assets/logo.svg';
import './navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const changeBG = () => {
    if (window.scrollY > 59) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBG);
    return () => {
      window.removeEventListener('scroll', changeBG);
    };
  }, []);
  return (
    <div className={isScrolled ? 'nav-sticky scrolled' : 'nav-sticky'}>
      <div className="navbar">
        <div className="logo">
          <img
            src={logo}
            alt="logo"
          />
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
            <a
              href="https://github.com/doutdes0"
              target="_blank"
              rel="noreferrer"
            >
              Contacts
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
