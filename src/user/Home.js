import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomeStyle.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import diningImage from '../image/dining1.jpg';
import OccasionImage from '../image/Occasion1.jpg'; 
import Order from "./Order";
import UserDashboard from './UserDashboard';
import BookTable from "./BookTable";
import EventBook from "./EventBook";

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
      {
        img: "https://demo-themewinter.com/deliciko/deliciko-red/wp-content/uploads/sites/2/2019/06/slider_image03.jpg",
        title: "Welcome to Our Restaurant",
        buttonText: "Explore Menu",
        themepara: "Indulge in a delightful dining experience. Explore our menu now!",
        path: "/user/order",
      },
      {
        img: "https://media.istockphoto.com/id/1428409996/photo/closeup-of-female-chef-in-restaurant-decorates-the-meal.jpg?s=612x612&w=0&k=20&c=WVNYWmlDaG1fEv5Be7hpBblsbPPFcZ62NcF9XaIJR6o=",
        title: "Fresh Ingredients, Tasty Meals",
        buttonText: "Order Now",
        themepara:"Savor delicious meals made with fresh ingredients. Order now!",
        path: "/user/order",
      },
      {
        img: "https://demo-themewinter.com/deliciko/deliciko-red/wp-content/uploads/sites/2/2019/06/slider_image03.jpg",
        title: "Relax and Enjoy Your Meal",
        buttonText: "Reserve a Table",
        themepara:"Unwind and savor your meal. Reserve your table today!",
        path: "/user/booktable",
      },
    ];
  
    const totalSlides = slides.length;
  
 
    const showSlide = (index) => {
      if (index >= totalSlides) {
        setCurrentIndex(0);
      } else if (index < 0) {
        setCurrentIndex(totalSlides - 1);
      } else {
        setCurrentIndex(index);
      }
    };
  
   
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 30000);
  
      return () => clearInterval(interval); 
    }, [totalSlides]);


    return (
    <>



<div className="slider-container">
      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide" key={index} style={{ opacity: index === currentIndex ? 1 : 0 }}>
            <img src={slide.img} alt={slide.title} />
            <div className="text" style={{ opacity: index === currentIndex ? 1 : 0 }}>
              <h1>{slide.title}</h1>
              <p>{slide.themepara}</p>
              <Link to= {slide.path} className="btn-primary" id="orderOnlineBtn">{slide.buttonText} </Link>
              
            </div>
          </div>
        ))}
      </div>

      
      <div className="dots-container">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => showSlide(index)}
          ></div>
        ))}
      </div>
    </div>


    <div className="feature-container">
      <div className="feature-box">
        <div className="iconsss">
          <i className="fas fa-utensils"></i>
        </div>
        <h3>Magical Atmosphere</h3>
        <p>Wonderful serenity has taken possession of my entire soul, like these sweet mornings.</p>
      </div>
      <div className="feature-box">
        <div className="iconsss">
          <i className="fas fa-concierge-bell"></i> 
        </div>
        <h3>Best Food Quality</h3>
        <p>Wonderful serenity has taken possession of my entire soul, like these sweet mornings.</p>
      </div>
      <div className="feature-box">
        <div className="iconsss">
          <i className="fas fa-dollar-sign"></i> 
        </div>
        <h3>Low Costing Food</h3>
        <p>Wonderful serenity has taken possession of my entire soul, like these sweet mornings.</p>
      </div>
    </div>



            <section className="Bistrofy-container">
                <main>
                    <h1 className="Bistrofy-header">
                        Inspired by the rich heritage of Indian cuisine, Bistrofy offers a vibrant, contemporary twist on beloved traditional flavors.
                    </h1>
                    <Link to="/user/booktable" className="Bistrofy-book-button" id="bookOnlineBtn">Reserve Your Seat</Link>
                    <img src={diningImage} alt="Dining Experience" className="Bistrofy-dining" />
                </main>
            </section>




 




            <div className="occasion-container">
            <div className="occasion-image-section">
                <img src={OccasionImage} alt="Food" />
            </div>
            <div className="occasion-text-section">
                <div className="occasion-icons">

                </div>
                <h2>Your Perfect Destination for Any Occasion</h2>
                <p className="occasion-description">
                From coordination to execution, our team is dedicated to ensuring every detail of your event goes off without a hitch.
                </p>

                <Link to="/user/eventbook" className="occasion-button">Private Events</Link>
                <div className="occasion-contact-info">
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <strong style={{ marginRight: '10px' }}>Address:</strong>
                        <p style={{ marginLeft: '86px' }}>
                             123 Kashi Vishwanath Road<br/> 
                             Varanasi, Uttar Pradesh, 221001
                            
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <strong style={{ marginRight: '10px' }}>Opening Hours:</strong>
                        <p style={{ marginLeft: '40px' }}>
                            Mon - Fri : 8am - 8pm<br />
                            Saturday : 9am - 7pm<br />
                            Sunday : 9am - 8pm
                        </p>
                    </div>
                </div>
            </div>
        </div>

  



<section className="testimonial-section" id="testimonial">
<div className="testimonial-header">
    <h2>What Our Diners Say About Us</h2>
    <div className="icons">
        <span className="icon">🏠</span>
        <span className="icon">🐟</span>
        <span className="icon">🐚</span>
    </div>
</div>
<div className="testimonials">
    <div className="testimonial">
        <p>"The atmosphere is perfect, and every dish is a masterpiece! I've never had such a memorable dining experience—highly recommend it!"</p>
        <p className="author">Aditi S.</p>
    </div>
    <div className="testimonial">
        <p>"From the warm staff to the outstanding flavors, this place is a hidden gem. I look forward to each visit!"</p>
        <p className="author">Vishesh Y.</p>
    </div>
    <div className="testimonial">
        <p>"Exceptional food and service! Every meal feels special, with attention to detail that makes this restaurant my top choice."</p>
        <p className="author">Kavya N.</p>
    </div>
</div>
</section>





</>
        
    );
};

export default HeroSection;
