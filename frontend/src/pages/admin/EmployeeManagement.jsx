import { Link } from "react-router";
import AdminSidePanel from "../../components/AdminSidePanel";

import { useEffect, useState } from "react";
import { getAllEmp } from "../../api/empApi";
import "./CourseManagement.css";

function CourseManagement() {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getAllEmp();
        setEmployee(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployee();
  }, []);

  return (
    <main className="course-manage-container">
      <AdminSidePanel />
      <section className="manage-course-dashboard">
        <div className="header-dashboard">
          <span>Employee Management</span>
          <Link to="/add-emp">
            <i className="fa-solid fa-plus"></i>Add Employee
          </Link>
        </div>
        <div className="course-table">
          <table>
            <thead>
              <tr>
                <th>EMP-Code</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Phone No</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((emp) => (
                <tr key={emp.userId}>
                  <td>{emp.empCode}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.phone}</td>
                  <td>
                    <Link to={`/${emp.userId}`} className="edit-icon">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default CourseManagement;
