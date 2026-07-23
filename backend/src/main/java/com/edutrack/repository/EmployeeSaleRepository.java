package com.edutrack.repository;

import com.edutrack.dto.SalesProjection;
import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entity.EmployeeSale;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeSaleRepository extends JpaRepository<EmployeeSale, Long> {
    String SELECT_QUERY = """
            SELECT
                u.name as userName,
                u.email as userEmail,
                u.phone as phoneNo,
                SUM(c.discount_price) as empIndivSale
            FROM
                users u
            JOIN
                employee_details e
            ON
                u.id = e.user_id
            JOIN
                employee_sales es
            ON
                e.employee_code = es.employee_code
            JOIN
                course c
            ON
                es.course_id = c.id
            WHERE
                u.role = 'EMPLOYEE'
            GROUP BY
                u.id, u.name, u.email, u.phone;
            """;

    @Query(value = SELECT_QUERY, nativeQuery = true)
    SalesProjection getIndiEmpDetailsAndSales();
}
