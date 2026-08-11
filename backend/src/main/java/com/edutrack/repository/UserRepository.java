package com.edutrack.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.edutrack.dto.CustomerCourseProjection;
import com.edutrack.dto.CustomerProjection;
import com.edutrack.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

        String SELECT_QUERY = """
                        SELECT
                        u.id AS userId,
                        u.name AS customerName,
                        u.email AS customerEmail,
                        u.phone AS phoneNo,
                        u.active AS activeStatus
                        FROM
                        users u
                        WHERE
                        u.role = 'CUSTOMER'
                        """;

        String SELECT_QUERY2 = """
                        SELECT
                        c.id AS courseId,
                        c.course_name AS courseName,
                        c.discount_price AS coursePrice,
                        p.purchase_date_time AS purchaseDateTime,
                        p.order_id AS orderId,
                        p.payment_id AS paymentId,
                        u.name AS customerName
                        FROM
                        course c
                        JOIN
                        purchases p
                        ON
                        c.id = p.course_id
                        JOIN
                        users u
                        ON
                        u.id = p.user_id
                        WHERE
                        p.user_id = :userId
                        """;

        boolean existsByEmail(String email);

        Optional<User> findByEmail(String email);

        @Query(value = SELECT_QUERY, nativeQuery = true)
        List<CustomerProjection> findByRoleCustomer();

        @Query(value = SELECT_QUERY2, nativeQuery = true)
        List<CustomerCourseProjection> getCustomerPurchasedCourse(Long userId);

        boolean existsByPhone(String phone);

}
