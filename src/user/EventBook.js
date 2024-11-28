import React, { useState, useContext } from 'react';
import UserContext from '../UseContext';  // Assuming you have a UserContext to get the user ID
import axios from 'axios';
import './EventBookStyle.css';
import eventPic from '../image/Eventpic.jpg';

const EventPage = () => {
    const { user } = useContext(UserContext);  // Fetch user context
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        event_type: 'private',
        event_date: '',
        message: ''
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.user_id) {
            setIsSuccess(false);
            setMessage("User ID is missing or invalid.");
            return;
        }

        const data = {
            ...formData,
            user_id: user.user_id  // Include user_id from context
        };

        setIsLoading(true);

        try {
            console.log("Sending data:", data);  // Debugging line to check sent data

            const response = await axios.post("http://localhost/backend/bookTable.php", data);
            console.log("Response from backend:", response.data);  // Debugging line for response

            if (response.data.status === "success") {
                setIsSuccess(true);
                setMessage(response.data.message);
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    event_type: 'private',
                    event_date: '',
                    message: ''
                });
            } else {
                setIsSuccess(false);
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error("Error in submission:", error);  // Debugging line for errors
            setIsSuccess(false);
            setMessage("Oops! Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="booking-form-container">
            <div className="container booking-form" id="booking-form">
              

            <div className="additional-box right-details" style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#333' }}>Find Us</h3>
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
        <strong style={{ flex: '0 0 120px', fontSize: '16px', color: '#555' }}>Address:</strong>
        <p style={{ marginLeft: '20px', fontSize: '16px', color: '#333' }}>
            500 Terry Francine Street<br />San Francisco, CA 94158
        </p>
    </div>
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
        <strong style={{ flex: '0 0 120px', fontSize: '16px', color: '#555' }}>Opening Hours:</strong>
        <p style={{ marginLeft: '20px', fontSize: '16px', color: '#333' }}>
            Mon - Fri: 8am - 8pm<br />Saturday: 9am - 7pm<br />Sunday: 9am - 8pm
        </p>
    </div>
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
        <strong style={{ flex: '0 0 120px', fontSize: '16px', color: '#555' }}>Phone:</strong>
        <p style={{ marginLeft: '20px', fontSize: '16px', color: '#333' }}>935-456-7890</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
        <strong style={{ flex: '0 0 120px', fontSize: '16px', color: '#555' }}>Email:</strong>
        <p style={{ marginLeft: '20px', fontSize: '16px', color: '#333' }}>info@mysite.com</p>
    </div>
</div>

             
                <form id="form" onSubmit={handleSubmit} className="occasion-form">
                    <h2 className="form-title">Get in Touch</h2>
                    <div className="form-row">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name*"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name*"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-row">
                        <select
                            name="event_type"
                            value={formData.event_type}
                            onChange={handleInputChange}
                            required
                        >
<option value="private">Private Event</option>
<option value="corporate">Corporate Event</option>
<option value="wedding">Wedding</option>
<option value="birthday">Birthday Party</option>
<option value="conference">Conference</option>
<option value="seminar">Seminar</option>
<option value="webinar">Webinar</option>
<option value="workshop">Workshop</option>
<option value="festival">Festival</option>
<option value="fundraiser">Fundraiser</option>
<option value="sports">Sports Event</option>
<option value="concert">Concert</option>
<option value="exhibition">Exhibition</option>
<option value="networking">Networking Event</option>
<option value="trade-show">Trade Show</option>
<option value="holiday">Holiday Party</option>
<option value="community">Community Event</option>
<option value="training">Training Session</option>
<option value="product-launch">Product Launch</option>
<option value="charity">Charity Event</option>
<option value="award-ceremony">Award Ceremony</option>

                        </select>
                        <input
                            type="date"
                            name="event_date"
                            value={formData.event_date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <textarea
                        name="message"
                        placeholder="Write a message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>

                    {/* Success or Error Message */}
                    {isSuccess !== null && (
                        <div className={isSuccess ? "success-message" : "error-message"}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EventPage;
