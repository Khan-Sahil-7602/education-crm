import EmployeeSidePanel from "../../components/EmpSidePanel";

function EmployeeProfile() {
  return (
    <main className="dashboard-container">
      <EmployeeSidePanel />
      <section className="dashboard">
        <h4>Welcome : Joy Adak</h4>
        <h2>This is Employee Dashboard!</h2>
      </section>
    </main>
  );
}

export default EmployeeProfile;
