package com.edutrack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.edutrack.dto.CourseProjection;
import com.edutrack.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

  String SELECT_QUERY = """
      SELECT
        id AS courseId,
        course_name AS courseName
      FROM
      course
      """;

  @Query(value = SELECT_QUERY, nativeQuery = true)
  List<CourseProjection> getCourseNameIdList();
}
