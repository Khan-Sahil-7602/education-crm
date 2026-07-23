import { useEffect, useState } from "react";
import AdminSidePanel from "../../components/AdminSidePanel";

import { useNavigate, useParams } from "react-router";
import { getCourseById, updateCourse } from "../../api/courseApi";
import "./AddCourse.css";

const IMAGE_URL = "http://localhost:8080/api/files/";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    courseName: "",
    courseMentor: "",
    coursePrice: "",
    discountPrice: "",
    imagePath: "",
    courseClasses: "",
    studentCount: "",
  });

  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchSingleCourse = async () => {
      try {
        const course = await getCourseById(id);
        setCourseData({
          courseName: course.courseName,
          courseMentor: course.courseMentor,
          coursePrice: course.coursePrice,
          discountPrice: course.discountPrice,
          imagePath: course.imagePath,
          courseClasses: course.courseClasses,
          studentCount: course.studentCount,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCourse();
  }, [id]);

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("courseName", courseData.courseName);
      data.append("courseMentor", courseData.courseMentor);
      data.append("coursePrice", courseData.coursePrice);
      data.append("discountPrice", courseData.discountPrice);
      data.append("courseClasses", courseData.courseClasses);
      data.append("studentCount", courseData.studentCount);

      if (newImage) {
        data.append("imagePath", newImage);
      }

      await updateCourse(id, data);

      alert("Course Updated");

      navigate("/manage-course");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <AdminSidePanel />
      <section className="course-register">
        <div className="course-form-container">
          <h2>Edit Course</h2>

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
              <img
                src={`${IMAGE_URL}${courseData.imagePath}`}
                alt="Current Banner"
                width={120}
              />
            </div>

            <div className="form-group">
              <label>Update Banner</label>
              <input
                type="file"
                name="imagePath"
                accept="image/*"
                onChange={handleNewImageChange}
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
              Save
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default EditCourse;
