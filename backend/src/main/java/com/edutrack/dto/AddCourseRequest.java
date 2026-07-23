package com.edutrack.dto;

import org.springframework.web.multipart.MultipartFile;

public class AddCourseRequest {

  private String courseName;

  private String courseMentor;

  private Double coursePrice;

  private Double discountPrice;

  private MultipartFile imagePath;

  private String courseClasses;

  private String studentCount;

  public String getCourseName() {
    return courseName;
  }

  public void setCourseName(String courseName) {
    this.courseName = courseName;
  }

  public String getCourseMentor() {
    return courseMentor;
  }

  public void setCourseMentor(String courseMentor) {
    this.courseMentor = courseMentor;
  }

  public Double getCoursePrice() {
    return coursePrice;
  }

  public void setCoursePrice(Double coursePrice) {
    this.coursePrice = coursePrice;
  }

  public Double getDiscountPrice() {
    return discountPrice;
  }

  public void setDiscountPrice(Double discountPrice) {
    this.discountPrice = discountPrice;
  }

  public MultipartFile getImagePath() {
    return imagePath;
  }

  public void setImagePath(MultipartFile imagePath) {
    this.imagePath = imagePath;
  }

  public String getCourseClasses() {
    return courseClasses;
  }

  public void setCourseClasses(String courseClasses) {
    this.courseClasses = courseClasses;
  }

  public String getStudentCount() {
    return studentCount;
  }

  public void setStudentCount(String studentCount) {
    this.studentCount = studentCount;
  }

}
