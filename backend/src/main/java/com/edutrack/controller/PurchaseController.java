package com.edutrack.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edutrack.dto.CreatePurchaseRequest;
import com.edutrack.dto.SavePurchaseRequest;
import com.edutrack.entity.Course;
import com.edutrack.entity.Purchase;
import com.edutrack.model.User;
import com.edutrack.repository.CourseRepository;
import com.edutrack.repository.PurchaseRepository;
import com.edutrack.repository.UserRepository;
import com.edutrack.util.ApiResponse;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {

  private final RazorpayClient razorpayClient;
  private final CourseRepository courseRepository;
  private final UserRepository userRepository;
  private final PurchaseRepository purchaseRepository;

  public PurchaseController(RazorpayClient razorpayClient, CourseRepository courseRepository,
      UserRepository userRepository, PurchaseRepository purchaseRepository) {
    this.razorpayClient = razorpayClient;
    this.courseRepository = courseRepository;
    this.userRepository = userRepository;
    this.purchaseRepository = purchaseRepository;
  }

  @PostMapping("/create-order")
  public ResponseEntity<ApiResponse<?>> createOrder(@RequestBody CreatePurchaseRequest request)
      throws RazorpayException {

    Course course = courseRepository.findById(request.getCourseId())
        .orElseThrow(() -> new RuntimeException("Course not found"));

    JSONObject orderRequest = new JSONObject();

    orderRequest.put("amount", course.getDiscountPrice() * 100);
    orderRequest.put("currency", "INR");
    orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

    Order order = razorpayClient.orders.create(orderRequest);

    Map<String, Object> response = new HashMap<>();

    response.put("id", order.get("id"));
    response.put("amount", order.get("amount"));
    response.put("currency", order.get("currency"));

    return ResponseEntity
        .status(HttpStatus.ACCEPTED)
        .body(new ApiResponse<>(true, "Order Created", response));
  }

  @PostMapping("/save-order")
  public ResponseEntity<ApiResponse<?>> savePurchasedOrder(@RequestBody SavePurchaseRequest request,
      Principal principal) {
    try {
      User user = userRepository
          .findByEmail(principal.getName())
          .orElseThrow(() -> new RuntimeException("User not found!"));

      Course course = courseRepository
          .findById(request.getCourseId())
          .orElseThrow(() -> new RuntimeException("Course not found!"));

      boolean alreadyPurchased = purchaseRepository.existsByUserIdAndCourseId(user.getId(), course.getId());

      if (alreadyPurchased) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(new ApiResponse<>(false, "Course already purchased", null));
      }

      Purchase purchase = new Purchase();
      purchase.setOrderId(request.getOrderId());
      purchase.setPurchaseDateTime(LocalDateTime.now());
      purchase.setPaymentId(request.getPaymentId());
      purchase.setCourse(course);
      purchase.setUser(user);

      purchaseRepository.save(purchase);

      return ResponseEntity
          .status(HttpStatus.OK)
          .body(new ApiResponse<>(true, "Course Purchased Successfully", purchase));

    } catch (Exception e) {
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(new ApiResponse<>(false, e.getMessage(), null));
    }

  }

}
