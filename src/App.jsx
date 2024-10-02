import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/UseAuth"; 
import { CategoryProvider } from "./context/CategoryContext";
import ProductProvider from "./context/ProductContext";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import Sell from "./pages/Sell/Sell";
import ProfilePage from "./pages/Profile/Profile";
import { ToastProvider } from "./context/ToastContext";

// Private Route wrapper for authenticated routes
const PrivateRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth(); 

  if (loading) return <div>Loading...</div>; // Handle loading state if needed

  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Public Route wrapper for routes accessible to non-authenticated users
const PublicRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth(); 

  if (loading) return <div>Loading...</div>; // Handle loading state if needed

  return isAuthenticated ? <Navigate to="/" /> : element;
};

// Main App component
const App = () => {
  return (
    <AuthProvider> 
      <ToastProvider>
        <CategoryProvider>
          <ProductProvider>
            <Router>
              <div className="App">
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
                  <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />

                  {/* Private routes */}
                  <Route path="/" element={<PrivateRoute element={<Home />} />} />
                  <Route path="/sell" element={<PrivateRoute element={<Sell />} />} />
                  <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
                </Routes>
                <ToastContainer /> {/* Ensure this is included */}
              </div>
            </Router>
          </ProductProvider>
        </CategoryProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
