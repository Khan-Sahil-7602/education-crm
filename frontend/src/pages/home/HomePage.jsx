import Footer from "../../components/Footer";
import Header from "../../components/Header";

import CheckCircle from "../../assets/img/banner/check-circle.svg";
import Check from "../../assets/img/banner/check.svg";
import HeaderBanner from "../../assets/img/banner/header-banner.png";
import BookOpen from "../../assets/img/courses/book-open.svg";
import Users from "../../assets/img/courses/users.svg";

import { useEffect, useRef, useState } from "react";
import { getCourses } from "../../api/courseApi";
import { getToken, isAuthenticated } from "../../utils/auth";

import "./HomePage.css";

const IMAGE_URL = "http://localhost:8080/api/files/";

function HomePage() {
  const isLoggedIn = isAuthenticated();

  const [courses, setCourses] = useState([]);

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (hasFetched.current) {
      return;
    }

    hasFetched.current = true;

    fetchCourseData();
  }, []);

  const handleBuyButton = async (course) => {
    const token = getToken();

    try {
      const orderResponse = await fetch(
        "http://localhost:8080/api/purchase/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: course.id,
          }),
        },
      );

      const order = await orderResponse.json();

      const options = {
        key: `${import.meta.env.VITE_RZP_KEY}`,
        amount: order.data.amount,
        currency: order.data.currency,
        name: "EduTrack",
        description: course.courseName,
        order_id: order.data.id,

        handler: async function (response) {
          await fetch("http://localhost:8080/api/purchase/save-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              courseId: course.id,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
            }),
          });

          alert("Payment Successful");
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.log(response);
      });

      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <section id="main-banner">
        <div className="main-banner-left">
          <div className="desc-line-1">
            <img src={Check} />
            <p>Get 30% off on your first enroll</p>
          </div>
          <h1 className="banner-heading">
            Advance your
            <br />
            engineering skills with us.
          </h1>
          <p className="banner-desc">
            Build skills with our courses and mentor from world class companies.
          </p>
          <div className="main-banner-search-box">
            <input type="text" placeholder="Search courses here..." />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className="main-banner-keywords">
            <div>
              <img src={CheckCircle} />
              <p>Flexible</p>
            </div>
            <div>
              <img src={CheckCircle} />
              <p>Learning Path</p>
            </div>
            <div>
              <img src={CheckCircle} />
              <p>Community</p>
            </div>
          </div>
        </div>
        <div className="main-banner-right">
          <img src={HeaderBanner} />
        </div>
      </section>
      <section id="courses">
        <div className="course-heading">
          <h1>Popular Courses.</h1>
          <a href="#">
            Explore Courses<i className="fa-solid fa-angle-right"></i>
          </a>
        </div>
        <div className="course-card-container">
          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              <div className="course-img">
                <img src={`${IMAGE_URL}${course.imagePath}`} />
              </div>
              <p className="course-name">{course.courseName}</p>
              <span className="course-mentor">
                <i className="fa-solid fa-chalkboard-user"></i>
                <span>{course.courseMentor}</span>
              </span>
              <div className="course-rating-price">
                <div className="course-price">
                  <i className="fa-solid fa-rupee-sign"></i>
                  <span>{course.discountPrice}</span>
                  <s>
                    <span>{course.coursePrice}</span>
                  </s>
                </div>
              </div>
              <div className="hr-line"></div>
              <div className="course-stats">
                <div className="course-chapter">
                  <img src={BookOpen} />
                  <span>{course.courseClasses} Classes</span>
                </div>
                <div className="course-students">
                  <img src={Users} />
                  <span>{course.studentCount} Students</span>
                </div>
              </div>
              {!isLoggedIn ? (
                <a href="/login" className="buy-course-btn">
                  Login to Buy
                </a>
              ) : (
                <button
                  className="buy-course-btn"
                  onClick={() => handleBuyButton(course)}
                >
                  Buy Now
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
      <section id="newsletter">
        <div className="newsletter-container">
          <div className="newsletter-desc">
            <h1>NewsLetter</h1>
            <p>Subscribe to get exciting offers & many more...</p>
          </div>
          <div className="newsletter-search-box">
            <input type="text" placeholder="Enter your email..." />
            <button>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default HomePage;
