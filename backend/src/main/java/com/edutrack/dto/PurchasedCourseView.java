package com.edutrack.dto;

import java.time.LocalDateTime;

public interface PurchasedCourseView {

  String getCourseId();

  String getCourseClasses();

  String getCourseMentor();

  String getCourseName();

  String getImagePath();

  LocalDateTime getPurchaseDate();

}
