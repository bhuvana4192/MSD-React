import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ cartItemsCount, toggleCart }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo-area">
        <img src="/image.jpg" alt="The Homely Spoon Logo" />
        <div className="brand-text">
          <h1>The Homely Spoon</h1>
          <p>Homemade food, made with love.</p>
        </div>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register-cook">Register Cook</Link></li>
        <li><Link to="/chefs">Chefs</Link></li>
        <li>
          <button onClick={toggleCart} style={{ cursor: "pointer" }}>
            🛒 Cart ({cartItemsCount})
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
