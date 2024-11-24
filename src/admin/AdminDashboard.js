// import React, { useState, useEffect } from "react";
// import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import UserManagement from "./UserManagement";
// import Profile from "./AdminProfile";
// import MenuManagement from "./MenuManagement";
// import OrderManagement from "./OrderManagement";
// import "./AdminDashboardStyle.css";

// const UserDashboard = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const [user, setUser] = useState(
  //   location.state?.user || JSON.parse(localStorage.getItem("user"))
  // );
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       !event.target.closest("#logindropdown") &&
  //       !event.target.closest("#loginButton")
  //     ) {
  //       setIsDropdownOpen(false);
  //     }
  //     if (
  //       !event.target.closest("#profiledropdown") &&
  //       !event.target.closest("#profile-content")
  //     ) {
  //       setIsProfileDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);
  //   return () => document.removeEventListener("click", handleClickOutside);
  // }, []);

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch("http://localhost/backend/logout.php", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       localStorage.removeItem("user");
  //       setUser(null);
  //       navigate("/login");
  //     } else {
  //       alert("Logout failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //     alert("An error occurred while logging out. Please try again later.");
  //   }
  // };

//   return (
//     <div>
//       <nav>
//         <div className="hamburger" id="hamburgerMenu">
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>

//         <h1>BistrofyAdmin</h1>

//         <div className="nav-links">
          // <ul>
          //   <li>
          //     <Link to="usermanage">UserManagement</Link>
          //   </li>
          //   <li>
          //     <Link to="menumanage">MenuManagement</Link>
          //   </li>
          //   <li>
          //     <Link to="ordermanage">OrderManagement</Link>
          //   </li>
          //   <li>
          //     <Link
          //       id="loginButton"
          //       to="/login"
          //       onClick={(e) => {
          //         e.preventDefault();
          //         setIsDropdownOpen((prev) => !prev);
          //       }}
          //     >
          //       Login
          //     </Link>
          //     {isDropdownOpen && (
          //       <div className="dropdown show" id="logindropdown">
          //         <Link to="/login">Sign In</Link>
          //         <Link to="/signup">Sign Up</Link>
          //         <Link to="/logout" onClick={handleLogout}>
          //           Logout
          //         </Link>
          //       </div>
          //     )}
          //   </li>
          // </ul>
//         </div>

//         <div
//           className="profile-container"
//           id="profile-content"
//           onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
//         >
//           <img
//             src="https://cdn.vectorstock.com/i/500p/96/75/gray-scale-male-character-profile-picture-vector-51589675.jpg"
//             alt="User"
//             className="profile-picture"
//           />
//           {isProfileDropdownOpen && (
//             <div className="dropdown show" id="profiledropdown">
//               <Link to="/profile">View Profile</Link>
//               <Link to="/order-history">Order History</Link>
//               <Link to="/reservations">My Reservations</Link>
//               <Link to="/logout" onClick={handleLogout}>
//                 Logout
//               </Link>
//             </div>
//           )}
//         </div>
//       </nav>

//       <main>
//         {/* {user ? (
//           <section className="welcome-section">
//             <h1>Welcome, {user.username}!</h1>
//             <p>Role: {user.role}</p>
//             <p>Email: {user.email}</p>
//           </section>
//         ) : (
//           <section className="welcome-section">
//             <h1>Welcome, Guest!</h1>
//           </section>
//         )} */}

//         <Routes>
//           {/* Default route displays UserManagement */}
//           <Route path="/*" element={<UserManagement />} />

//           {/* Other sub-routes */}
//           <Route path="profile" element={<Profile />} />
//           <Route path="menumanage" element={<MenuManagement />} />
//           <Route path="ordermanage" element={<OrderManagement />} />
//         </Routes>
//       </main>

//       <footer className="footer">
//         <div className="footer-content">
//           <div className="footer-section contact-info">
//             <h3>Contact Us</h3>
//             <p>123 Kashi Vishwanath Road, Varanasi, Uttar Pradesh, 221001</p>
//             <p>Phone: +91 98765 43210</p>
//             <p>Email: info@yourbistrofy.com</p>
//           </div>

//           <div className="footer-section quick-links">
//             <h3>Quick Links</h3>
//             <ul>
//               <li>
//                 <Link to="/home">Home</Link>
//               </li>
//               <li>
//                 <Link to="/order">Menu</Link>
//               </li>
//               <li>
//                 <Link to="/eventbook">Book</Link>
//               </li>
//               <li>
//                 <Link to="/about">About Us</Link>
//               </li>
//             </ul>
//           </div>

//           <div className="footer-section social-media">
//             <h3>Follow Us</h3>
//             <div className="social-icons">
//               <a href="#facebook" className="icon" aria-label="Facebook">
//                 📘
//               </a>
//               <a href="#instagram" className="icon" aria-label="Instagram">
//                 📷
//               </a>
//               <a href="#twitter" className="icon" aria-label="Twitter">
//                 🐦
//               </a>
//               <a href="#location" className="icon" aria-label="Location">
//                 📍
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="footer-bottom">
//           <p>&copy; 2024 Bistrofy. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { useLocation, Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { FaHome, FaUserAlt, FaUtensils, FaShoppingCart, FaCog, FaList } from "react-icons/fa"; 
import UserManagement from "./UserManagement";
import HomeAdmin from "./HomeAdmin";
import Profile from "./AdminProfile";
import MenuManagement from "./MenuManagement";
import OrderManagement from "./OrderManagement";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // Refs to canvas elements for charts
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user || JSON.parse(localStorage.getItem("user")));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#logindropdown") && !event.target.closest("#loginButton")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost/backend/logout.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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



  

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.logo}>Sedap</div>
        <ul style={styles.nav}>
          <li style={styles.navItem}>
            <Link to="/admin" style={activePage === "adminhome" ? styles.navLinkActive : styles.navLink}>
              <FaHome style={styles.icon} /> Dashboard
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="ordermanage" style={activePage === "ordermanage" ? styles.navLinkActive : styles.navLink}>
              <FaShoppingCart style={styles.icon} /> Order Detail
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="usermanage" style={activePage === "usermanage" ? styles.navLinkActive : styles.navLink}>
              <FaUserAlt style={styles.icon} /> Customer
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="usermanage" style={activePage === "usermanage" ? styles.navLinkActive : styles.navLink}>
              <FaUserAlt style={styles.icon} /> Analytics
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="menumanage" style={activePage === "menumanage" ? styles.navLinkActive : styles.navLink}>
              <FaUtensils style={styles.icon} /> Foods
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="menumanage" style={activePage === "menumanage" ? styles.navLinkActive : styles.navLink}>
              <FaUtensils style={styles.icon} /> Food Detail
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="menumanage" style={activePage === "menumanage" ? styles.navLinkActive : styles.navLink}>
              <FaUtensils style={styles.icon} /> Customer Detail
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="menumanage" style={activePage === "menumanage" ? styles.navLinkActive : styles.navLink}>
              <FaUtensils style={styles.icon} />Calendar
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="menumanage" style={activePage === "menumanage" ? styles.navLinkActive : styles.navLink}>
              <FaUtensils style={styles.icon} />Chat
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="menumanage" style={activePage === "menumanage" ? styles.navLinkActive : styles.navLink}>
              <FaUtensils style={styles.icon} />Wallet
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="settings" style={activePage === "settings" ? styles.navLinkActive : styles.navLink}>
              <FaCog style={styles.icon} /> Settings
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="logout" onClick={handleLogout} style={styles.navLink}>
              <FaList style={styles.icon} /> Logout
            </Link>
          </li>
        </ul>
      </aside>
      <main style={styles.mainContent}>

    
        
        <Routes>
    
          <Route path="/usermanage" element={<UserManagement />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/menumanage" element={<MenuManagement />} />
          <Route path="/ordermanage" element={<OrderManagement />} />
          <Route path="/" element={<HomeAdmin />} />
          <Route path="/homeadmin" element={<HomeAdmin />} />
          <Route path="/admin/*" element={<Navigate to="/homeadmin" />} />
        </Routes>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f4f7fc",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#fff", // White sidebar
    color: "#333", // Dark text color
    padding: "20px 10px",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    height: "100vh",
    overflowY: "auto",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#FF6347", // Tomato color
    marginBottom: "30px",
    textAlign: "center",
  },
  nav: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginBottom: "20px",
  },
  navLink: {
    textDecoration: "none",
    color: "#555", // Dark text color for inactive
    fontSize: "18px",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  navLinkActive: {
    backgroundColor: "#FF6347", // Tomato color for active
    color: "#fff", // White text when active
    fontWeight: "bold",
  },
  icon: {
    marginRight: "15px",
    fontSize: "20px",
  },
  mainContent: {
    marginLeft: "250px",
    padding: "20px",
    flex: 1,
    backgroundColor: "#f4f7fc",
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  statCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    width: "23%",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  charts: {
    display: "flex",
    justifyContent: "space-between",
  },
  chart: {
    width: "48%",
  },
};

export default AdminDashboard;
