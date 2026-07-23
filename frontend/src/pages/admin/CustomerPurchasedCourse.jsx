import { useParams } from "react-router";
import AdminSidePanel from "../../components/AdminSidePanel";

import "./CustomerPurchasedCourse.css";
import { useEffect, useState } from "react";
import { getCustomerPurchasedCourse } from "../../api/customerApi";
import BanUserModal from "../../components/BanUserModal";
import { X } from "lucide-react";

function CustomerPurchasedCourse() {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourseList = async () => {
      try {
        const response = await getCustomerPurchasedCourse(id);
        setCourseData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCourseList();
  }, [id]);

  return (
    <main>
      <AdminSidePanel />
      {courseData && courseData.length > 0 && (
        <section className="purchased-course-container">
          <h1>Courses Purchased By {courseData[0].customerName}</h1>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Amount</th>
                <th>Date of Purchase</th>
                <th>Order Id</th>
                <th>Payment Id</th>
              </tr>
            </thead>
            <tbody>
              {courseData.map((course) => (
                <tr key={course.courseId}>
                  <td>{course.courseName}</td>
                  <td>{course.coursePrice}</td>
                  <td>{course.purchaseDateTime}</td>
                  <td>{course.orderId}</td>
                  <td>{course.paymentId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}

export default CustomerPurchasedCourse;
