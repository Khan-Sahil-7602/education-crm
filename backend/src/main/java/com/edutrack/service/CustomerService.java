package com.edutrack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.edutrack.dto.CustomerCourseProjection;
import com.edutrack.dto.CustomerProjection;
import com.edutrack.model.User;
import com.edutrack.repository.UserRepository;

@Service
public class CustomerService {

  private final UserRepository userRepository;

  public CustomerService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<CustomerProjection> getCustomerList() {
    return userRepository.findByRoleCustomer();
  }

  public List<CustomerCourseProjection> getCustomerCourseList(Long userId) {
    return userRepository.getCustomerPurchasedCourse(userId);
  }

  public void banUser(Long id) {
    User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    user.setActive(false);
    userRepository.save(user);
  }

  public void unBanUser(Long id) {
    User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    user.setActive(true);
    userRepository.save(user);
  }

}
