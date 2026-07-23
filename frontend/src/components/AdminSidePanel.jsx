import { Link, useNavigate } from "react-router";

import "./AdminSidePanel.css";
import { logoutUser } from "../services/authService";

function AdminSidePanel() {
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
    <aside className="admin-aside-panel">
      <div className="admin-features">
        <Link to={"/admin-profile"} className="admin-feature-link">
          <i className="fa-solid fa-house"></i>
          <span>DashBoard</span>
        </Link>
        <Link to={"/manage-course"} className="admin-feature-link">
          <i className="fa-solid fa-book"></i>
          <span>Course Management</span>
        </Link>
        <Link to={"/manage-emp"} className="admin-feature-link">
          <i className="fa-solid fa-users"></i>
          <span>Employee Management</span>
        </Link>
        <Link to={"/customerManage"} className="admin-feature-link">
          <i className="fa-solid fa-headset"></i>
          <span>Customer Management</span>
        </Link>
        <Link to={"/totalSales"} className="admin-feature-link">
          <i className="fa-solid fa-chart-simple"></i>
          <span>Sales</span>
        </Link>
        <Link to={"#"} className="admin-feature-link">
          <i className="fa-brands fa-rocketchat"></i>
          <span>Feedback</span>
        </Link>
      </div>

      <button className="admin-logout-btn" onClick={handleLogout}>
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default AdminSidePanel;
