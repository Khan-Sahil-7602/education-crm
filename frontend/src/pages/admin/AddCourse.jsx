import { useRef, useState } from "react";
import AdminSidePanel from "../../components/AdminSidePanel";

import "./AddCourse.css";
import { addCourse } from "../../api/courseApi";

function AddCourse() {
  const imagePathRef = useRef(null);

  const [courseData, setCourseData] = useState({
    courseName: "",
    courseMentor: "",
    coursePrice: "",
    discountPrice: "",
    imagePath: null,
    courseClasses: "",
    studentCount: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setCourseData({
      ...courseData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addCourse(courseData);

      setCourseData({
        courseName: "",
        courseMentor: "",
        coursePrice: "",
        discountPrice: "",
        imagePath: null,
        courseClasses: "",
        studentCount: "",
      });

      imagePathRef.current.value = "";

      alert(response.courseName + " course added.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <AdminSidePanel />
      <section className="course-register">
        <div className="course-form-container">
          <h2>Add Course</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course Name</label>
              <input
                type="text"
                name="courseName"
                value={courseData.courseName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mentor Name</label>
              <input
                type="text"
                name="courseMentor"
                value={courseData.courseMentor}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Original Price</label>
              <input
                type="number"
                name="coursePrice"
                min="0"
                value={courseData.coursePrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Offer Price</label>
              <input
                type="number"
                name="discountPrice"
                min="0"
                value={courseData.discountPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Course Banner</label>
              <input
                type="file"
                name="imagePath"
                accept="image/*"
                onChange={handleChange}
                ref={imagePathRef}
                required
              />
            </div>

            <div className="form-group">
              <label>Course Classes</label>
              <input
                type="text"
                name="courseClasses"
                value={courseData.courseClasses}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Student Count</label>
              <input
                type="text"
                name="studentCount"
                value={courseData.studentCount}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Add Course
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddCourse;
