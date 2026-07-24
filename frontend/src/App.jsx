import { Route, Routes } from "react-router";

import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/home/HomePage"));

const Login = lazy(() => import("./pages/auth/Login"));

const Register = lazy(() => import("./pages/auth/Register"));

const CustomerProfile = lazy(() => import("./pages/customer/CustomerProfile"));

const MyCourse = lazy(() => import("./pages/customer/MyCourse"));

const AdminProfile = lazy(() => import("./pages/admin/AdminProfile"));

const CourseManagement = lazy(() => import("./pages/admin/CourseManagement"));

const EditCourse = lazy(() => import("./pages/admin/EditCourse"));

const EmployeeManagement = lazy(
  () => import("./pages/admin/EmployeeManagement"),
);
const EditEmployee = lazy(() => import("./pages/admin/EditEmployee"));

const InquiryManagement = lazy(
  () => import("./pages/employee/InquiryManagement"),
);

const CustomerManagement = lazy(
  () => import("./pages/admin/CustomerManagement"),
);

const CustomerPurchasedCourse = lazy(
  () => import("./pages/admin/CustomerPurchasedCourse"),
);

const Sales = lazy(() => import("./pages/admin/Sales"));

import Loader from "./pages/Loader";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddCourse from "./pages/admin/AddCourse";
import AddEmployee from "./pages/admin/AddEmployee";
import EmployeeProfile from "./pages/employee/EmpProfile";
import SellCourse from "./pages/employee/SellCourse";
import NewInquiry from "./pages/employee/NewInquiry";
import FollowUp from "./pages/employee/FollowUp";
import FeedBackForm from "./pages/customer/FeedBackForm";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* public */}
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CUSTOMER */}
        <Route element={<ProtectedRoute role={"CUSTOMER"} />}>
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/my-course" element={<MyCourse />} />
          <Route path="/feedBack" element={<FeedBackForm />} />
        </Route>

        {/* ADMIN */}
        <Route element={<ProtectedRoute role={"ADMIN"} />}>
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/manage-course" element={<CourseManagement />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/edit-course/:id" element={<EditCourse />} />
          <Route path="/manage-emp" element={<EmployeeManagement />} />
          <Route path="/add-emp" element={<AddEmployee />} />
          <Route path="/:id" element={<EditEmployee />} />
          <Route path="/customerManage" element={<CustomerManagement />} />
          <Route
            path="/courseDetails/:id"
            element={<CustomerPurchasedCourse />}
          />
          <Route path="/totalSales" element={<Sales />} />
        </Route>

        {/* Employee */}
        <Route element={<ProtectedRoute role={"EMPLOYEE"} />}>
          <Route path="/emp-profile" element={<EmployeeProfile />} />
          <Route path="/sell-course" element={<SellCourse />} />
          <Route path="/inquiry" element={<InquiryManagement />} />
          <Route path="/new-inquiry" element={<NewInquiry />} />
          <Route path="/follow-up" element={<FollowUp />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
