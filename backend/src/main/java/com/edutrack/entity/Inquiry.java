package com.edutrack.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Inquiry {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String phone;
  private String name;
  private String interestedCourse;
  private String discussion;
  private String inquiryType;
  private String callType;
  private String status;
  private String empEmail;
  private String timeOfInquiry;
  private String dateOfInquiry;

  public String getTimeOfInquiry() {
    return timeOfInquiry;
  }

  public void setTimeOfInquiry(String timeOfInquiry) {
    this.timeOfInquiry = timeOfInquiry;
  }

  public String getDateOfInquiry() {
    return dateOfInquiry;
  }

  public void setDateOfInquiry(String dateOfInquiry) {
    this.dateOfInquiry = dateOfInquiry;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getInterestedCourse() {
    return interestedCourse;
  }

  public void setInterestedCourse(String interestedCourse) {
    this.interestedCourse = interestedCourse;
  }

  public String getDiscussion() {
    return discussion;
  }

  public void setDiscussion(String discussion) {
    this.discussion = discussion;
  }

  public String getInquiryType() {
    return inquiryType;
  }

  public void setInquiryType(String inquiryType) {
    this.inquiryType = inquiryType;
  }

  public String getCallType() {
    return callType;
  }

  public void setCallType(String callType) {
    this.callType = callType;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getEmpEmail() {
    return empEmail;
  }

  public void setEmpEmail(String empEmail) {
    this.empEmail = empEmail;
  }

}
