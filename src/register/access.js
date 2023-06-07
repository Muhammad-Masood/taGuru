import React, { useState } from 'react';
import './access.css';
import { Link as RouterLink } from "react-router-dom";
import Landing from "register/Landing";

// Custom PasswordForm component
const Access = () => {
  const [password, setPassword] = useState(""); // State to store the entered password

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update the password state when input value changes
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    // Perform password verification logic here (e.g., compare the entered password with the correct one)
    const correctPassword = "Welcome12345##";

    if (password === correctPassword) {
      // Redirect the user to the landing page after successful password verification
      // <Link variant="subtitle2" component={RouterLink} to="/signup"></Link>
     // authorized = true;
      window.location.href = "/landing";  //Replace "/landing" with the actual URL of your landing page


    } else {
      // Password is incorrect, display an error message or take appropriate action
      alert("Incorrect Password");
    }
  };

  return (
    <div className="password-page">
    <form onSubmit={handleFormSubmit} className="form-container">
      <label className="form-label">
        Password 
        <input type="password" value={password} onChange={handlePasswordChange} className="form-input" />
      </label>
      <br />
      <button type="submit" className="form-button">Submit</button>
    </form>
    </div>
  );
};

export default Access;