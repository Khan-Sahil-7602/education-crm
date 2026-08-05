package com.edutrack.controller;

import com.edutrack.repository.EmployeeSaleRepository;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.edutrack.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edutrack.entity.Inquiry;
import com.edutrack.model.User;
import com.edutrack.repository.EmployeeRepository;
import com.edutrack.repository.InquiryRepository;
import com.edutrack.repository.UserRepository;
import com.edutrack.service.EmployeeService;
import com.edutrack.util.ApiResponse;

@RestController
@RequestMapping("/api/emp")
public class EmployeeController {

    private final EmployeeSaleRepository employeeSaleRepository;
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final EmployeeService employeeService;
    private final InquiryRepository inquiryRepository;

    public EmployeeController(EmployeeService employeeService, UserRepository userRepository,
            EmployeeRepository employeeRepository, InquiryRepository inquiryRepository,
            EmployeeSaleRepository employeeSaleRepository) {
        this.employeeService = employeeService;
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.employeeSaleRepository = employeeSaleRepository;
        this.inquiryRepository = inquiryRepository;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<String>> addEmployee(@RequestBody AddEmpRequest request, Principal principal) {

        User admin = userRepository.findByEmail(principal.getName()).orElseThrow();

        employeeService.addEmployee(request, admin);

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Employee Added Successfully", null));
    }

    @GetMapping
    public List<EmployeeProjection> getAllEmployee() {
        return employeeService.getAllEmployee();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SingleEmployeeProjection>> getSingleEmployee(@PathVariable Long id) {
        Optional<SingleEmployeeProjection> empDetails = employeeRepository.findSingleEmployee(id);

        if (empDetails.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, null, empDetails.get()));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(false, "Employee not present!", null));
    }

    @PutMapping("/edit-emp/{id}")
    public ResponseEntity<ApiResponse<String>> putMethodName(@PathVariable Long id,
            @RequestBody EditEmployeeRequest request) {
        employeeService.editEmployee(id, request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Employee details updated successfully.", null));
    }

    @GetMapping("/get-course")
    public ResponseEntity<ApiResponse<List<CourseProjection>>> getCourseNameId() {
        List<CourseProjection> courseIdNameList = employeeService.getCourseNameIdList();
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Success", courseIdNameList));
    }

    @PostMapping("/sell-course")
    public ResponseEntity<ApiResponse<?>> sellCourse(@RequestBody SellCourseRequest request) {
        employeeService.sellCourse(request);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(false, "Course sold successfully!", null));
    }

    @PostMapping("/add-inquiry")
    public ResponseEntity<ApiResponse<String>> addInquiry(@RequestBody AddInquiryRequest request, Principal principal) {
        employeeService.addInquiry(request, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Inquiry Added Successfully", null));
    }

    @GetMapping("/inquiries")
    public ResponseEntity<ApiResponse<List<Inquiry>>> getMethodName(@RequestParam String phone) {
        List<Inquiry> inquiries = inquiryRepository.findByPhone(phone);
        if (inquiries.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, "No records!", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "Records found", inquiries));
    }

    @GetMapping("/getPhone")
    public ResponseEntity<ApiResponse<String>> getPhoneByEmailDate(Principal principal,
            @RequestParam String followUpDate) {
        String phone = employeeService.getPhoneByEmailAndDate(principal.getName(), followUpDate);
        if (phone == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "No Records Found...", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "Records Found.", phone));
    }

    @GetMapping("/getIndivSales")
    public ResponseEntity<ApiResponse<List<SalesProjection>>> getSalesProjection() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Success", employeeService.getIndiEmpDetailsAndSales()));
    }

    @GetMapping("/getTotalSale")
    public ResponseEntity<ApiResponse<Double>> getTotalSaleByEmp() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Success", employeeSaleRepository.getTotalSalesFromEmp()));
    }

}