import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function HomeAdmin() {
    const [activePage, setActivePage] = useState("dashboard");

    // Refs to canvas elements for charts
    const pieChartRef = useRef(null);
    const lineChartRef = useRef(null);
  

useEffect(() => {
    if (activePage === "dashboard") {
      renderCharts();
    }
  }, [activePage]);

  const renderCharts = () => {
    if (pieChartRef.current && lineChartRef.current) {
      if (pieChartRef.current.chart) pieChartRef.current.chart.destroy();
      if (lineChartRef.current.chart) lineChartRef.current.chart.destroy();

      // Pie Chart
      pieChartRef.current.chart = new Chart(pieChartRef.current, {
        type: "pie",
        data: {
          labels: ["Total Order", "Customer Growth", "Total Revenue"],
          datasets: [
            {
              data: [81, 22, 62],
              backgroundColor: ["#FF6347", "#36A2EB", "#FFCE56"], // Tomato color
            },
          ],
        },
      });

      // Line Chart
      lineChartRef.current.chart = new Chart(lineChartRef.current, {
        type: "line",
        data: {
          labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ],
          datasets: [
            {
              label: "2020 Revenue",
              data: [5000, 10000, 7500, 20000, 15000, 25000, 30000, 22000, 27000, 24000, 29000, 31000],
              borderColor: "#FF6347", // Tomato color
              fill: false,
            },
            {
              label: "2021 Revenue",
              data: [6000, 11000, 8500, 22000, 17000, 26000, 31000, 23000, 28000, 26000, 32000, 34000],
              borderColor: "#36A2EB",
              fill: false,
            },
          ],
        },
      });
    }
  };



  return (
    <div>
        <div>
            <div style={styles.stats}>
              <div style={styles.statCard}>
                <h3>Total Orders</h3>
                <h3>75</h3>
              </div>
              <div style={styles.statCard}>
                <h3>Total Delivered</h3>
                <h3>357</h3>
              </div>
              <div style={styles.statCard}>
                <h3>Total Canceled</h3>
                <h3>65</h3>
              </div>
              <div style={styles.statCard}>
                <h3>Total Revenue</h3>
                <h3>$128</h3>
              </div>
            </div>

            <div style={styles.charts}>
              <div style={styles.chart}>
                <canvas ref={pieChartRef}></canvas>
              </div>
              <div style={styles.chart}>
                <canvas ref={lineChartRef}></canvas>
              </div>
            </div>
          </div>
    </div>
  )
}

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

export default HomeAdmin
