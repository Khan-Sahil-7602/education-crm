import { Link, useNavigate } from "react-router";

import { logoutUser } from "../services/authService";

import "./EmpSidePanel.css";

function EmployeeSidePanel() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await logoutUser();

      if (data.success) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <aside className="emp-aside-panel">
      <div className="emp-features">
        <Link to={"/emp-profile"} className="emp-feature-link">
          <i className="fa-solid fa-house"></i>
          <span>DashBoard</span>
        </Link>
        <Link to={"/sell-course"} className="emp-feature-link">
          <i className="fa-solid fa-book"></i>
          <span>Sell Course</span>
        </Link>
        <Link to={"/inquiry"} className="emp-feature-link">
          <i className="fa-solid fa-users"></i>
          <span>Inquiry Management</span>
        </Link>
        <Link to={"/follow-up"} className="emp-feature-link">
          <i className="fa-solid fa-headset"></i>
          <span>Follow Up</span>
        </Link>
      </div>

      <button className="emp-logout-btn" onClick={handleLogout}>
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default EmployeeSidePanel;
