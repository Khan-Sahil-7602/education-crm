import AdminSidePanel from "../../components/AdminSidePanel";
import Header from "../../components/Header";

import "./AdminProfile.css";

function AdminProfile() {
  return (
    <main className="dashboard-container">
      <AdminSidePanel />
      <section className="dashboard">
        <h4>Welcome : Sahil Khan</h4>
        <h2>This is Admin Dashboard!</h2>
      </section>
    </main>
  );
}

export default AdminProfile;
