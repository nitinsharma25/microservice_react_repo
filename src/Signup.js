import React, { useState } from 'react';
import './Signup.css';

const Signup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic (e.g., validate form data, call API)
    console.log(formData); // For demonstration
    const response =  fetch('http://localhost:8081/api/customer/create', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  //  const result =  response.json();
   // alert(result)
    onClose(); // Close the popup
  };

  return (
    <div className="signup-popup">
      <div className="signup-content">
        <span className="close" onClick={onClose}>×</span>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Firstname:</label>
            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Lastname:</label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;