import { Link } from 'react-router-dom';

const Navbar = ({ handleTogglePopup,handleToggleRegistrationPopup }) => {
  return (
    <div className="top-navbar">

      <div className="nav-buttons">
      <Link to="/favorites">
        <button>About</button>
      </Link>
      <Link to="/browse">
        <button>Browse</button>
      </Link>
      <Link to="/favorites">
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
