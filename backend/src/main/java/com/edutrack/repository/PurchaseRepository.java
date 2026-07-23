package com.edutrack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.edutrack.dto.PurchasedCourseView;
import com.edutrack.entity.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
  boolean existsByUserIdAndCourseId(Long userId, Long courseId);

  final String SELECT_QUERY = """
        SELECT
          c.id AS courseId,
          c.course_classes AS courseClasses,
          c.course_mentor AS courseMentor,
          c.course_name AS courseName,
          c.image_path AS imagePath,
          p.purchase_date_time AS purchaseDateTime
        FROM course c
        JOIN purchases p
        ON c.id = p.course_id
        WHERE p.user_id = :userId
        ORDER BY p.purchase_date_time DESC
      """;

  @Query(value = SELECT_QUERY, nativeQuery = true)
  List<PurchasedCourseView> findPurchasedCourseByUserId(Long userId);
}
