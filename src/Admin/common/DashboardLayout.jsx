import React, { useState, useEffect } from "react";
import Listing from "../Api/Listing";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { adduser, reduxdatauser } from "../../Redux/UserSlice";
import logo from "../../assert/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Navbar,
  Nav,
  Button,
  Container
} from "react-bootstrap";
import ProfileIcon from "../components/ProfileIcon";
import { MdLogout } from "react-icons/md";

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async (signal) => {
    try {
      const main = new Listing();
      const response = await main.profileVerify({ signal });
      console.log("response", response);
      dispatch(adduser(response?.data?.data));
      dispatch(reduxdatauser(response?.data?.profileData));
    } catch (error) {
      localStorage && localStorage.removeItem("AdminToken");
      toast.error("Please log in first.");
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const token = localStorage.getItem("AdminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchData(signal);

    return () => controller.abort();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile if width <= 768px
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false); // Close sidebar when moving to desktop
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("AdminToken");
    navigate("/admin/login");
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/admin-contact", label: "Contacts" },
    { to: "/admin/webniar-list", label: "Webniar" },
    { to: "/admin/payout", label: "Today Payout" },
    { to: "/admin/subsribe", label: "Subscribes" },
    { to: "/admin/user", label: "Users" },
    { to: "/admin/instructor", label: "Instructors" },
    { to: "/admin/course-list", label: "Courses" },
    { to: "/admin/course-content-list", label: "Course Contents" },
    { to: "/admin/payment-list", label: "Payments" },
    { to: "/admin/gallery-list", label: "Gallery" },
    { to: "/admin/review-list", label: "Reviews" },
    { to: "/admin/blog-list", label: "Blogs" },
    { to: "/admin/online-list", label: "Online Videos" },
    { to: "/admin/admin-refral", label: "Refral Management" },
    { to: "/admin/payment-data", label: "Transactions" },
    { to: "/admin/video_list", label: "Training Video" },
    { to: "/admin/best_course", label: "Best Selling Course" },
    { to: "/admin/admin-setting", label: "Setting" },
    { to: "/admin/email", label: "Email" },
  ];

  return (
    <div>

      {/* Sidebar */}
      <div
        className={`navbar-light bg-light border-end position-fixed top-0 start-0 h-100 ${showSidebar ? "d-block" : "d-none"} d-lg-block`}
        style={{ width: "250px", zIndex: 1040 }}
      >
        <div className="ms-auto d-flex align-items-center px-2  py-2">
          <ProfileIcon />
        </div>
        <div className="d-flex flex-column h-100 overflow-auto custom-scroll account-settings mb-2">
          {/* Navigation links */}
          <nav className="nav flex-column ">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className={`nav-link  px-3 py-2 mt-2  rounded d-flex align-items-center justify-content-center text-uppercase fw-semibold  ${location.pathname === item.to
                  ? "login-head "
                  : " "
                  }`}
                style={{ minHeight: "45px", textAlign: "center" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-grow-1 ms-lg-250">
        <Navbar
          bg="light"
          expand="lg"
          className="border-bottom position-fixed top-0 w-100"
          style={{ zIndex: 1050 }}
        >
          <Container fluid className="px-3">
            <div className="header-responsive">
              <Button
                variant="outline-primary"
                className="d-lg-none mb-2 mb-lg-0 me-lg-3"
                onClick={toggleSidebar}
              >
                <i className="bi bi-list"></i>
              </Button>
              <Navbar.Brand href="#" className="ms-lg-2 mb-2 mb-lg-0">
                <img src={logo} height="30" alt="Logo" className="header-img" />
              </Navbar.Brand>
              <nav
                className="btn btn-outline-danger mb-0 logout-button"
                onClick={handleLogout}
              >
                <MdLogout className="me-2" />
                <span className="logout-text">Logout</span>
              </nav>

            </div>
          </Container>
        </Navbar>

        {/* Content Padding */}
        <div className="p-2" style={{ marginTop: "70px" }}>
          {children}
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;