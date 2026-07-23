import { useEffect, useRef, useState } from "react";
import { getToken } from "../../utils/auth";
import { getPurchasedCourses } from "../../api/courseApi";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./MyCourse.css";

function Course() {
  const IMAGE_URL = "http://localhost:8080/api/files/";

  const token = getToken();

  const [purchasedCourse, setPurchasedCourse] = useState([]);

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const data = await getPurchasedCourses(token);
        setPurchasedCourse(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (hasFetched.current) {
      return;
    }

    hasFetched.current = true;

    fetchPurchasedCourses();
  }, [token]);

  return (
    <>
      <Header />

      <div className="purchased-courses">
        <h2>Your Purchased Courses</h2>
        <div className="purchased-courses-container">
          {purchasedCourse.length === 0 && <h3>No Course Purchased!</h3>}
          {purchasedCourse.map((course) => {
            return (
              <div className="purchased-course-card" key={course.courseId}>
                <img src={`${IMAGE_URL}${course.imagePath}`} />
                <div className="card-desc">
                  <span>{course.courseName}</span>
                  <span>Mentor : {course.courseMentor}</span>
                  <span>Classes : {course.courseClasses}</span>
                  <span>
                    Purchase Date :
                    {new Date(course.purchaseDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <a href="#" className="continue-course-btn">
                  Continue
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Course;
