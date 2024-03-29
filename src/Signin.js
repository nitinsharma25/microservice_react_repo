import React, { useState } from 'react';
import Signup from './Signup'; // Import the SignupPage component
import './Signin.css'; // Import CSS file for styling
import Home from './Home';

const Signin = () => {
  //alert("in sign in")
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showSignup, setShowSignup] = useState(false); // State to toggle the visibility of the SignupPage
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  

  const handleSubmit = (e) => {
    var emailData=formData.email;
    e.preventDefault();
   fetch('http://localhost:8081/api/customer/getByEmail/'+emailData)
      .then(response => response.json())
    .then(data =>{
     if (formData.email === data.email && formData.password === data.password) {
      setIsLoggedIn(true)
     } else {
      alert('Invalid credentials');
    }
    });
    
  };


  const toggleSignup = () => {
    setShowSignup(!showSignup); // Toggle the visibility of the SignupPage
  };

  if (isLoggedIn) {
    return (
      <Home/>
    );
  }

  return (
    <>
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn">Sign In</button>
      </form>
      <p>Don't have an account? <button onClick={toggleSignup}>Sign Up</button></p>
      {showSignup && <Signup onClose={toggleSignup} />}
    </div>
    </>
  );
};

export default Signin;
