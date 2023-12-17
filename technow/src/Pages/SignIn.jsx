import React, { useState } from 'react';
import './Sign.css';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye icons
import 'react-toastify/dist/ReactToastify.css';

const SignInSignUpComponent = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('');
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const history = useNavigate();

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const showToast = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const validatePass = (password) => {
    // Add your password validation logic here
    // Example: Check if the password has at least 2 capital characters, 3 lowercase characters,
    // 1 special character, and 2 numbers
    let passPattern =
      /^(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){3})(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>/?])(?=(?:.*\d){2})[A-Za-z\d!@#$%^&*()_+[\]{}|;:'",.<>/?]{8,}$/;
    return passPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validatePass(password)) {
        showToast('Password did not meet the criteria!');
        return;
      }

      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Email', email);
      formData.append('Password', password);
      formData.append('Role', role);
      formData.append('Picture', file);

      const response = await axios.post('http://localhost:5000/user/create', formData);

      const newUser = response.data.user;

      showToast('Sign up successful!');

      // Reset form data
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
      setFile(null);

      // Redirect to the sign-in page after successful sign-up
      history('/signin');
    } catch (error) {
      console.error('Error signing up:', error);
      showToast('Error signing up. Please try again.');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        Email: email,
        Password: password,
      });

      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem('token', token);

      showToast('Sign in successful!');

      // Redirect to the home page after successful sign-in
      history('/');
    } catch (error) {
      console.error('Error signing in:', error);
      showToast('Error signing in. Please try again.');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
        <form onSubmit={isSignUp ? handleSubmit : handleSignIn}>
          <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
          {isSignUp && (
            <>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="file" name="Picture" onChange={(e) => setFile(e.target.files[0])} />
              
            </>
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="password-eye" onClick={handleTogglePassword}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

          {!isSignUp && (
            <Link to="#" className="forgot-password">
              Forget Your Password?
            </Link>
          )}
          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className={`toggle-panel ${isSignUp ? 'toggle-right' : 'toggle-left'}`}>
            <h1>{isSignUp ? 'Welcome, Friend!' : 'Welcome Back!'}</h1>
            <p>Enter your personal details to use all site features</p>
          </div>
          <div className={`toggle-panel ${isSignUp ? 'toggle-left' : 'toggle-right'}`}>
            <h1>{isSignUp ? 'Welcome Back!' : 'Welcome, Friend!'}</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" onClick={toggleForm}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignInSignUpComponent;
