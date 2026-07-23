import { useEffect, useState } from "react";
import AdminSidePanel from "../../components/AdminSidePanel";

import { useNavigate, useParams } from "react-router";
import { fetchSingleEmployee, updateEmployee } from "../../api/empApi";
import "./AddCourse.css";

const DEPARTMENTS = ["Sales", "Support", "Marketing", "Operations"];
const DESIGNATIONS = ["Counselor", "Senior Counselor", "Team Lead", "Manager", "Support Executive"];

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [empData, setEmpData] = useState({
    name: "",
    phone: "",
    department: "",
    designation: "",
    isActive: true,
  });

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const empDetails = await fetchSingleEmployee(id);
        setEmpData({
          name: empDetails.data.name,
          phone: empDetails.data.phone,
          department: empDetails.data.department,
          designation: empDetails.data.designation,
          isActive: empDetails.data.isActive
        });
      } catch (error) {
        console.log(error);
      }
    };
    loadEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmpData({
      ...empData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateEmployee(id, empData);

      alert(response.message);

      navigate("/manage-emp");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <AdminSidePanel />
      <section className="course-register">
        <div className="course-form-container">
          <h2>Edit Employee</h2>
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
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={empData.phone}
                onChange={handleChange}
                maxLength={10}
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
            <div className="form-group">
              <label>Employee Status</label>
              <div>
                <span>
                  {empData.isActive ? "Active" : "Inactive"}
                </span>
                <label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={empData.isActive}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <button type="submit" className="submit-btn">Save</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default EditEmployee;
