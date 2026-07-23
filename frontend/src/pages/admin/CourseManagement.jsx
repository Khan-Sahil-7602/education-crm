import { Link } from "react-router";
import AdminSidePanel from "../../components/AdminSidePanel";

import { useEffect, useState } from "react";
import { deleteCourse, getCoursesByPagination } from "../../api/courseApi";
import "./CourseManagement.css";

const IMAGE_URL = "http://localhost:8080/api/files/";

function CourseManagement() {
  const [courses, setCourses] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCoursesByPagination(currentPage);
        setCourses(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete the course?")) {
      return;
    }

    try {
      await deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="course-manage-container">
      <AdminSidePanel />
      <section className="manage-course-dashboard">
        <div className="header-dashboard">
          <span>Course Management</span>
          <Link to="/add-course">
            <i className="fa-solid fa-plus"></i>Add Course
          </Link>
        </div>
        <div className="course-table">
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Mentor</th>
                <th>Course Banner</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.courseName}</td>
                  <td>{course.courseMentor}</td>
                  <td>
                    <img src={`${IMAGE_URL}${course.imagePath}`} />
                  </td>
                  <td>
                    <Link
                      to={`/edit-course/${course.id}`}
                      className="edit-icon"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(course.id);
                      }}
                      className="dlt-icon"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>

            {[...Array(totalPages).keys()].map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)}>
                {page + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CourseManagement;
