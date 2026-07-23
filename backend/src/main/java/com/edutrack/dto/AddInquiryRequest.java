package com.edutrack.dto;

public class AddInquiryRequest {

  private String phone;
  private String name;
  private String interestedCourse;
  private String discussion;
  private String inquiryType;
  private String callType;
  private String status;
  private String dateOfInquiry;

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

  public String getDateOfInquiry() {
    return dateOfInquiry;
  }

  public void setDateOfInquiry(String dateOfInquiry) {
    this.dateOfInquiry = dateOfInquiry;
  }

}
