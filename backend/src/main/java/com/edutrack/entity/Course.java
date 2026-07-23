package com.edutrack.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Course {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String courseName;
  private String courseMentor;
  private String courseClasses;
  private Double coursePrice;
  private Double discountPrice;
  private String imagePath;
  private String studentCount;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

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

  public String getCourseClasses() {
    return courseClasses;
  }

  public void setCourseClasses(String courseClasses) {
    this.courseClasses = courseClasses;
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

  public String getImagePath() {
    return imagePath;
  }

  public void setImagePath(String imagePath) {
    this.imagePath = imagePath;
  }

  public String getStudentCount() {
    return studentCount;
  }

  public void setStudentCount(String studentCount) {
    this.studentCount = studentCount;
  }

}
