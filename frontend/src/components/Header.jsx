import Logo from "../assets/img/logo/ellipse.svg";
import "./Header.css";

import { Link, useNavigate } from "react-router";
import { getUserRole, isAuthenticated } from "../utils/auth";
import { logoutUser } from "../services/authService";

function Header() {
  const navigate = useNavigate();

  const loggedIn = isAuthenticated();

  const role = getUserRole();

  const handleLogout = async () => {
    try {
      const data = await logoutUser();

      if (data.success) {
        localStorage.removeItem("token");
        alert(data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          EduTrack <img src={Logo} />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {loggedIn && role === "CUSTOMER" && (
            <li>
              <Link to="/my-course">My Course</Link>
            </li>
          )}
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
          <li>
            <Link to={"/feedBack"}>FeedBack</Link>
          </li>
        </ul>
      </nav>
      <div className="nav-buttons">
        {!loggedIn && (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {loggedIn && role === "CUSTOMER" && (
          <button
            title="Go To Profile"
            className="profile-link"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <img src="/user.png" />
          </button>
        )}

        {loggedIn && (
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
