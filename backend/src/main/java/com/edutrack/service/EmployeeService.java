package com.edutrack.service;

import com.edutrack.dto.*;
import com.edutrack.repository.PurchaseRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edutrack.entity.Course;
import com.edutrack.entity.Employee;
import com.edutrack.entity.EmployeeSale;
import com.edutrack.entity.FollowUp;
import com.edutrack.entity.Inquiry;
import com.edutrack.entity.Purchase;
import com.edutrack.model.Role;
import com.edutrack.model.User;
import com.edutrack.repository.CourseRepository;
import com.edutrack.repository.EmployeeRepository;
import com.edutrack.repository.EmployeeSaleRepository;
import com.edutrack.repository.FollowUpRepository;
import com.edutrack.repository.InquiryRepository;
import com.edutrack.repository.UserRepository;

@Service
public class EmployeeService {

    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final CourseRepository courseRepository;
    private final EmployeeSaleRepository employeeSaleRepository;
    private final InquiryRepository inquiryRepository;
    private final FollowUpRepository followUpRepository;
    private final PasswordEncoder passwordEncoder;

    public EmployeeService(UserRepository userRepository, EmployeeRepository employeeRepository,
                           EmployeeSaleRepository employeeSaleRepository,
                           CourseRepository courseRepository, InquiryRepository inquiryRepository, FollowUpRepository followUpRepository,
                           PurchaseRepository purchaseRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.courseRepository = courseRepository;
        this.employeeSaleRepository = employeeSaleRepository;
        this.inquiryRepository = inquiryRepository;
        this.followUpRepository = followUpRepository;
        this.purchaseRepository = purchaseRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private String generateEmployeeCode() {
        String lastCode = employeeRepository.findLastEmployeeCode();

        if (lastCode == null) {
            return "EMP-001";
        }

        int lastNumber = Integer.parseInt(lastCode.replace("EMP-", ""));

        return String.format("EMP-%03d", lastNumber + 1);
    }

    @Transactional
    public void addEmployee(AddEmpRequest request, User adminUser) {
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(Role.EMPLOYEE);
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        Employee employee = new Employee();

        employee.setUser(savedUser);
        employee.setEmployeeCode(generateEmployeeCode());
        employee.setDepartment(request.getDepartment());
        employee.setDesignation(request.getDesignation());
        employee.setAssignedBy(adminUser);

        employeeRepository.save(employee);
    }

    public List<EmployeeProjection> getAllEmployee() {
        return employeeRepository.findAllEmployee();
    }

    @Transactional
    public void editEmployee(Long id, EditEmployeeRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found!"));
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setActive(request.getIsActive());
        userRepository.save(user);

        Employee employee = employeeRepository.findByUserId(id)
                .orElseThrow(() -> new RuntimeException("Employee details not found!"));
        employee.setDepartment(request.getDepartment());
        employee.setDesignation(request.getDesignation());
        employeeRepository.save(employee);
    }

    public List<CourseProjection> getCourseNameIdList() {
        return courseRepository.getCourseNameIdList();
    }

    @Transactional
    public void sellCourse(SellCourseRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found!"));

        User user = userRepository.findByEmail(request.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        EmployeeSale employeeSale = new EmployeeSale();

        employeeSale.setDiscountPrice(request.getDiscountPrice());
        employeeSale.setEmployeeCode(request.getEmpCode());
        employeeSale.setOrderId(request.getOrderId());
        employeeSale.setPaymentId(request.getPaymentId());
        employeeSale.setPurchaseDateTime(LocalDateTime.now());
        employeeSale.setCourse(course);
        employeeSale.setUser(user);

        employeeSaleRepository.save(employeeSale);

        Purchase purchase = new Purchase();

        purchase.setOrderId(request.getOrderId());
        purchase.setPurchaseDateTime(LocalDateTime.now());
        purchase.setPaymentId(request.getPaymentId());
        purchase.setCourse(course);
        purchase.setUser(user);

        purchaseRepository.save(purchase);
    }

    public void addInquiry(AddInquiryRequest request, String email) {
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();

        Inquiry inquiry = new Inquiry();

        inquiry.setPhone(request.getPhone());
        inquiry.setName(request.getName());
        inquiry.setInterestedCourse(request.getInterestedCourse());
        inquiry.setDiscussion(request.getDiscussion());
        inquiry.setInquiryType(request.getInquiryType());
        inquiry.setCallType(request.getCallType());
        inquiry.setStatus(request.getStatus());
        inquiry.setEmpEmail(email);
        inquiry.setDateOfInquiry(date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        inquiry.setTimeOfInquiry(time.format(DateTimeFormatter.ofPattern("HH:mm:ss")));

        inquiryRepository.save(inquiry);

        String status = inquiry.getStatus();

        if (status.equals("Interested(Follow Up)")) {
            FollowUp followUp = new FollowUp();
            followUp.setPhoneNo(request.getPhone());
            followUp.setEmpEmail(email);
            followUp.setFollowUpDate(request.getDateOfInquiry());
            followUpRepository.save(followUp);
        }
    }

    public String getPhoneByEmailAndDate(String email, String followUpDate) {
        return followUpRepository.getPhoneNoByEmailDate(email, followUpDate);
    }

    public SalesProjection getIndiEmpDetailsAndSales() {
        return employeeSaleRepository.getIndiEmpDetailsAndSales();
    }

}
