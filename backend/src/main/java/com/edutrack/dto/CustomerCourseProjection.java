package com.edutrack.dto;

import java.time.LocalDateTime;

public interface CustomerCourseProjection {
  Long getCourseId();

  String getCourseName();

  Double getCoursePrice();

  LocalDateTime getPurchaseDateTime();

  String getOrderId();

  String getPaymentId();

  String getCustomerName();
}
