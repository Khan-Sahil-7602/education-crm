export async function getCourses() {
  const response = await fetch("http://localhost:8080/api/courses");
  return response.json();
}

export async function getCoursesByPagination(page) {
  const response = await fetch(
    `http://localhost:8080/api/courses/paginated-courses?page=${page}&size=4`,
  );

  const courseData = await response.json();

  return courseData;
}

export async function getPurchasedCourses(token) {
  const response = await fetch(
    "http://localhost:8080/api/courses/purchased-courses",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
}

export async function addCourse(courseData) {
  const formData = new FormData();

  formData.append("courseName", courseData.courseName);
  formData.append("courseMentor", courseData.courseMentor);
  formData.append("courseClasses", courseData.courseClasses);
  formData.append("coursePrice", courseData.coursePrice);
  formData.append("discountPrice", courseData.discountPrice);
  formData.append("imagePath", courseData.imagePath);
  formData.append("studentCount", courseData.studentCount);

  const response = await fetch("http://localhost:8080/api/courses/add-course", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  return result;
}

export async function getCourseById(id) {
  const response = await fetch(`http://localhost:8080/api/courses/${id}`);
  return await response.json();
}

export const updateCourse = async (id, courseData) => {
  const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
    method: "PUT",
    body: courseData,
  });

  return await response.json;
};

export const deleteCourse = async (id) => {
  const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
    method: "DELETE",
  });

  return response;
};
