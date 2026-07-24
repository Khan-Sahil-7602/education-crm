package com.edutrack.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edutrack.dto.CustomerCourseProjection;
import com.edutrack.dto.CustomerFeedbackRequest;
import com.edutrack.dto.CustomerProjection;
import com.edutrack.model.User;
import com.edutrack.repository.UserRepository;
import com.edutrack.service.CustomerService;
import com.edutrack.util.ApiResponse;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final UserRepository userRepository;
    private final CustomerService customerService;

    public CustomerController(UserRepository userRepository, CustomerService customerService) {
        this.userRepository = userRepository;
        this.customerService = customerService;
    }

    @GetMapping
    public User customerDashboard(Principal principal) {
        User user = userRepository
                .findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User Not Found!"));

        return user;
    }

    @GetMapping("/getCustomers")
    public ResponseEntity<ApiResponse<List<CustomerProjection>>> getCustomers() {
        List<CustomerProjection> customersList = customerService.getCustomerList();
        if (customersList.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Error fetching customers data!", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "Customers fetched successfully...", customersList));
    }

    @GetMapping("/courseDetails/{id}")
    public ResponseEntity<ApiResponse<List<CustomerCourseProjection>>> getCustomerCourseDetails(
            @PathVariable("id") Long userId) {
        List<CustomerCourseProjection> courseList = customerService.getCustomerCourseList(userId);
        if (courseList.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Error fetching customers course data!", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "Data fetched!", courseList));
    }

    @PostMapping("/banUser")
    public ResponseEntity<ApiResponse<String>> banUser(@RequestParam Long userId) {
        customerService.banUser(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "User banned!", null));
    }

    @PostMapping("/unbanUser")
    public ResponseEntity<ApiResponse<String>> unBanUser(@RequestParam Long userId) {
        customerService.unBanUser(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "User unbanned!", null));
    }

    @PostMapping("/feedback")
    public ResponseEntity<ApiResponse<String>> postMethodName(@RequestBody CustomerFeedbackRequest request) {
        customerService.handleCustomerFeedback(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Feedback Sent!", null));
    }

}
