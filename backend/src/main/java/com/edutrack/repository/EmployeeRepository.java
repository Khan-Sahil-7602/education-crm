package com.edutrack.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.edutrack.dto.EmployeeProjection;
import com.edutrack.dto.SingleEmployeeProjection;
import com.edutrack.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

        String SELECT_QUERY = """
                        SELECT
                        u.id AS user_id,
                        u.name AS name,
                        u.phone AS phone,
                        e.employee_code AS emp_code,
                        e.department AS department,
                        e.designation AS designation
                        FROM users u
                        JOIN employee_details e
                        ON
                        u.id = e.user_id
                        """;

        String SELECT_QUERY2 = """
                        SELECT
                        u.id AS user_id,
                        u.name AS name,
                        u.phone AS phone,
                        u.active as is_active,
                        e.department AS department,
                        e.designation AS designation
                        FROM users u
                        JOIN employee_details e
                        ON
                        u.id = e.user_id
                        WHERE
                        u.id = :userId
                        """;

        @Query(value = SELECT_QUERY, nativeQuery = true)
        List<EmployeeProjection> findAllEmployee();

        @Query(value = SELECT_QUERY2, nativeQuery = true)
        Optional<SingleEmployeeProjection> findSingleEmployee(Long userId);

        @Query(value = "SELECT ed.employee_code FROM employee_details ed ORDER BY ed.id DESC LIMIT 1", nativeQuery = true)
        String findLastEmployeeCode();

        Optional<Employee> findByUserId(Long id);

}
