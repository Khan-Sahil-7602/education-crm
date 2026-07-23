import { useState } from "react";
import AdminSidePanel from "../../components/AdminSidePanel";

import "./AddCourse.css";
import { addEmp } from "../../api/empApi";

const DEPARTMENTS = ["Sales", "Support", "Marketing", "Operations"];
const DESIGNATIONS = ["Counselor", "Senior Counselor", "Team Lead", "Manager", "Support Executive"];

function AddEmployee() {
  const [empData, setEmpData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    designation: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmpData({
      ...empData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addEmp(empData);

      setEmpData({
        name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        designation: ""
      });

      alert(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <AdminSidePanel />
      <section className="course-register">
        <div className="course-form-container">
          <h2>Add Employee</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={empData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={empData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={empData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                value={empData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select name="department" value={empData.department} onChange={handleChange}>
                <option value="">Select Department</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Designation</label>
              <select name="designation" value={empData.designation} onChange={handleChange}>
                <option value="">Select Designation</option>
                {DESIGNATIONS.map(des => (
                  <option key={des} value={des}>{des}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-btn">
              Add Employee
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddEmployee;
