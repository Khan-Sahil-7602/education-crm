package com.edutrack.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.edutrack.dto.AddCourseRequest;
import com.edutrack.entity.Course;
import com.edutrack.repository.CourseRepository;

@Service
public class CourseService {

  @Value("${file.upload-dir}")
  private String uploadDir;

  private final CourseRepository courseRepository;
  private final FileService fileService;

  public CourseService(CourseRepository courseRepository, FileService fileService) {
    this.courseRepository = courseRepository;
    this.fileService = fileService;
  }

  public Course addCourse(AddCourseRequest request) {
    try {
      String imageName = fileService.uploadFile(request.getImagePath(), "course-banner");

      Course course = new Course();

      course.setCourseName(request.getCourseName());
      course.setCourseMentor(request.getCourseMentor());
      course.setCourseClasses(request.getCourseClasses());
      course.setCoursePrice(request.getCoursePrice());
      course.setDiscountPrice(request.getDiscountPrice());
      course.setImagePath(imageName);
      course.setStudentCount(request.getStudentCount());

      return courseRepository.save(course);
    } catch (IOException e) {
      throw new RuntimeException("Failed to add course!");
    }
  }

  public Course updateCourse(Long id, String courseName, String courseMentor, String courseClasses, Double coursePrice,
      Double discountPrice, String studentCount, MultipartFile image) {

    Course course = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found!"));

    course.setCourseClasses(courseClasses);
    course.setCourseMentor(courseMentor);
    course.setCourseName(courseName);
    course.setCoursePrice(coursePrice);
    course.setDiscountPrice(discountPrice);
    course.setStudentCount(studentCount);

    if (image != null && !image.isEmpty()) {

      if (course.getImagePath() != null) {
        Path oldImagePath = Paths.get(uploadDir, course.getImagePath());
        try {
          Files.deleteIfExists(oldImagePath);
        } catch (IOException e) {
          e.printStackTrace();
        }
      }

      try {
        String newImagePath = fileService.uploadFile(image, "course-banner");
        course.setImagePath(newImagePath);
      } catch (IOException e) {
        e.printStackTrace();
      }

    }

    return courseRepository.save(course);
  }

  public void deleteCourse(Long id) {
    Course course = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));

    if (course.getImagePath() != null) {
      Path path = Paths.get(uploadDir, course.getImagePath());
      try {
        Files.deleteIfExists(path);
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    courseRepository.deleteById(id);
  }

}
