package com.edutrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.entity.Inquiry;
import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
  List<Inquiry> findByPhone(String phone);
}
