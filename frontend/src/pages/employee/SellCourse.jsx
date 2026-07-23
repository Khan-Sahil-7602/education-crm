import { useEffect, useState } from "react";
import EmployeeSidePanel from "../../components/EmpSidePanel";

import "./SellCourse.css";
import { getCourseNameId, getOrderId, sellCourse } from "../../api/empApi";

function SellCourse() {
  const [courseData, setCourseData] = useState([]);

  const [formData, setFormData] = useState({
    courseId: "",
    empCode: "",
    userEmail: "",
    discountPrice: "",
    orderId: "",
    paymentId: "",
  });

  useEffect(() => {
    const fetchCourseIdName = async () => {
      try {
        const response = await getCourseNameId();
        setCourseData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseIdName();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.courseId === "") {
      alert("Please choose a course!");
      return;
    }

    const response = await getOrderId(formData.courseId);

    const orderId = response.data.id;

    const finalFormData = { ...formData, orderId };

    setFormData(finalFormData);

    const response2 = await sellCourse(finalFormData);

    alert(response2.message);

    setFormData({
      courseId: "",
      empCode: "",
      userEmail: "",
      discountPrice: "",
      orderId: "",
      paymentId: "",
    });
  };

  return (
    <main>
      <EmployeeSidePanel />
      <section className="sell-course-form">
        <h3>Sell Course</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emp-code">Employee Code</label>
            <input
              type="text"
              name="empCode"
              id="emp-code"
              value={formData.empCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="user-email">User Email</label>
            <input
              type="email"
              name="userEmail"
              id="user-email"
              value={formData.userEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Course Name</label>
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              {courseData.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="discount-price">Discount</label>
            <input
              type="text"
              name="discountPrice"
              id="discount-price"
              value={formData.discountPrice}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="payment-id">Payment ID</label>
            <input
              type="text"
              name="paymentId"
              id="payment-id"
              value={formData.paymentId}
              onChange={handleChange}
              required
            />
          </div>

          <button className="sell-course-btn">Sell Course</button>
        </form>
      </section>
    </main>
  );
}

export default SellCourse;
