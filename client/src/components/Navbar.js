import { Link } from 'react-router-dom';

const Navbar = ({ handleTogglePopup,handleToggleRegistrationPopup }) => {
  return (
    <div className="top-navbar">

      <div className="nav-buttons">
      <Link to="/about">
        <button>About</button>
      </Link>
      <Link to="/user">
        <button>Services</button>
      </Link>
      <Link to="/contact">
        <button>Contact</button>
      </Link>
      <button onClick={handleToggleRegistrationPopup}>
        Register
      </button>

      <button onClick={handleTogglePopup}>
      Login
      </button>
      </div>
    </div>
  );
};

export default Navbar;
