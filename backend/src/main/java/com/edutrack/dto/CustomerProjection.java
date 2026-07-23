package com.edutrack.dto;

public interface CustomerProjection {
  Long getUserId();

  String getCustomerName();

  String getCustomerEmail();

  String getPhoneNo();

  Boolean getActiveStatus();
}
