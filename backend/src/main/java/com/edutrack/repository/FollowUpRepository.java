package com.edutrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.edutrack.entity.FollowUp;

public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {
  String SELECT_QUERY = """
      SELECT
      phone_no
      FROM
      follow_up
      WHERE
      emp_email = :empEmail
      AND
      follow_up_date = :followUpDate
      """;

  @Query(value = SELECT_QUERY, nativeQuery = true)
  String getPhoneNoByEmailDate(String empEmail, String followUpDate);
}
