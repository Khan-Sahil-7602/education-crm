package com.edutrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entity.CustomerFeedback;

public interface CustomerFeedbackRepository extends JpaRepository<CustomerFeedback, Long> {

}
