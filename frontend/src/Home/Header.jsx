import { Link } from 'react-router-dom';
import '../style/home.css';
import logo from '../assets/logosmall.png';
import xmark from '../assets/xmark.svg';
import bar from '../assets/bar.svg';
import { useState } from 'react';

const Header = () => {
  const [isNavActive, setNavActive] = useState(false);
  
  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  return (
    <div>
      <nav>
        <div className="top">
          <Link to="/" className="mainlogo">
            <img src={logo} alt="logo" />
          </Link>
          {/* <div className="bar" onClick={toggleNavigation}>
            <img src={isNavActive ? xmark : bar} alt="menu" />
          </div> */}
        </div>
        <ul className={`menu ${isNavActive ? 'active' : ''}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          
          <li>
            <Link to="/login" className="book">
              Sign-in
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
