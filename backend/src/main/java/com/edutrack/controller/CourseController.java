package com.edutrack.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.edutrack.dto.AddCourseRequest;
import com.edutrack.dto.PurchasedCourseView;
import com.edutrack.entity.Course;
import com.edutrack.model.User;
import com.edutrack.repository.CourseRepository;
import com.edutrack.repository.PurchaseRepository;
import com.edutrack.repository.UserRepository;
import com.edutrack.service.CourseService;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

  private final UserRepository userRepository;
  private final CourseRepository courseRepository;
  private final CourseService courseService;
  private final PurchaseRepository purchaseRepository;

  public CourseController(UserRepository userRepository, CourseRepository courseRepository, CourseService courseService,
      PurchaseRepository purchaseRepository) {
    this.userRepository = userRepository;
    this.courseRepository = courseRepository;
    this.courseService = courseService;
    this.purchaseRepository = purchaseRepository;
  }

  @GetMapping
  public List<Course> getAllCourses() {
    return courseRepository.findAll();
  }

  @GetMapping("/{id}")
  public Course getSingleCourse(@PathVariable Long id) {
    Optional<Course> course = courseRepository.findById(id);
    return course.get();
  }

  @GetMapping("/paginated-courses")
  public Page<Course> getAllPaginatedCourses(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "4") int size) {

    Pageable pageable = PageRequest.of(page, size);

    return courseRepository.findAll(pageable);
  }

  @GetMapping("/purchased-courses")
  public ResponseEntity<List<PurchasedCourseView>> getPurchasedCourses(Principal principal) {

    User user = userRepository.findByEmail(principal.getName())
        .orElseThrow(() -> new RuntimeException("User not found!"));

    Long userId = user.getId();

    return ResponseEntity.ok(purchaseRepository.findPurchasedCourseByUserId(userId));
  }

  @PostMapping(path = "/add-course", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Course> addCourse(@ModelAttribute AddCourseRequest request) {
    return ResponseEntity.ok(courseService.addCourse(request));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Course> updateCourse(
      @PathVariable Long id,
      @RequestParam String courseName,
      @RequestParam String courseMentor,
      @RequestParam String courseClasses,
      @RequestParam Double coursePrice,
      @RequestParam Double discountPrice,
      @RequestParam String studentCount,
      @RequestParam(value = "imagePath", required = false) MultipartFile image) {

    Course updated = courseService.updateCourse(
        id, courseName, courseMentor, courseClasses,
        coursePrice, discountPrice, studentCount, image);

    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
    courseService.deleteCourse(id);
    return ResponseEntity.noContent().build();
  }

}
