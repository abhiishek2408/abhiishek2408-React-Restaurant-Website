// UserDashboard.js
import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Profile from "./UserProfile";
import Cart from "./Cart";
import Order from "./Order";
import BookTable from "./BookTable";
import EventBook from "./EventBook";
import "./UserDashboardStyle.css";

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return location.state?.user || JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      return null;
    }
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen((prev) => !prev);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest("#logindropdown") &&
        !event.target.closest("#loginButton")
      ) {
        setIsDropdownOpen(false);
      }
      if (
        !event.target.closest("#profiledropdown") &&
        !event.target.closest("#profile-content")
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost/backend/logout.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out. Please try again later.");
    }
  };

  const currentPath = location.pathname;

  return (
    <div>
      <nav>
        <div className="hamburger" id="hamburgerMenu">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <h1>Bistrofy</h1>

        <div className="nav-links">
          <ul>
            <li className={currentPath === "/user/home" ? "active" : ""}>
              <Link to="home">Shop</Link>
            </li>
            <li className={currentPath === "/user/about" ? "active" : ""}>
              <Link to="about">About</Link>
            </li>
            <li className={currentPath === "/user/order" ? "active" : ""}>
              <Link to="order">Menu</Link>
            </li>
            <li className={currentPath === "/user/eventbook" ? "active" : ""}>
              <Link to="eventbook">Book</Link>
            </li>
            <li>
              <Link
                id="loginButton"
                to="/login"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown();
                }}
              >
                Login
              </Link>
              {isDropdownOpen && (
                <div className="dropdown show" id="logindropdown">
                  <Link to="/login">Signin</Link>
                  <Link to="/signup">Signup</Link>
                  <Link to="/logout" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link to="cart">
                <span className="cart-icon" id="cart-icon">
                  {/* SVG code */}
                  <svg
                    className="icon-cart"
                    viewBox="0 0 24.38 30.52"
                    height="20.52"
                    width="24.38"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>icon-cart</title>
                    <path
                      transform="translate(-3.62 -0.85)"
                      d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"
                    ></path>
                  </svg>
                  <span className="quantity"></span>
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="profile-container"
          id="profile-content"
          onClick={toggleProfileDropdown}
        >
          <img
            src="https://cdn.vectorstock.com/i/500p/96/75/gray-scale-male-character-profile-picture-vector-51589675.jpg"
            alt="User"
            className="profile-picture"
          />

          {isProfileDropdownOpen && (
            <div className="dropdown show" id="profiledropdown">
              <Link to="profile" id="profile-page">
                View Profile
              </Link>
              <Link to="order-history">Order History</Link>
              <Link to="reservations">My Reservations</Link>
              <Link to="/logout" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Render Sub-routes */}
      <Routes>
  {/* Default route redirects to "home" */}
  <Route path="/" element={<Navigate to="user/home" />} />
  <Route path="home" element={<Home />} />
  <Route path="about" element={<About />} />
  <Route path="profile" element={<Profile />} />
  <Route path="order" element={<Order />} />
  <Route path="booktable" element={<BookTable />} />
  <Route path="eventbook" element={<EventBook />} />
  <Route path="cart" element={<Cart />} />
</Routes>


      <footer className="footer">
        {/* Footer content */}
        <div className="footer-content">
          <div className="footer-section contact-info">
            <h3>Contact Us</h3>
            <p>123 Kashi Vishwanath Road, Varanasi, Uttar Pradesh, 221001</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: info@yourbistrofy.com</p>
          </div>

          <div className="footer-section quick-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="home">Home</Link></li>
              <li><Link to="order">Menu</Link></li>
              <li><Link to="eventbook">Book</Link></li>
              <li><Link to="about">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-section social-media">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" className="icon" target="_blank" rel="noopener noreferrer">
                📘
              </a>
              <a href="https://instagram.com" className="icon" target="_blank" rel="noopener noreferrer">
                📷
              </a>
              <a href="https://twitter.com" className="icon" target="_blank" rel="noopener noreferrer">
                🐦
              </a>
              <a href="https://maps.google.com" className="icon" target="_blank" rel="noopener noreferrer">
                📍
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p style={{ fontSize: '1rem' }}>&copy; 2024 Bistrofy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
