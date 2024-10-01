import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider,useAuth } from "./hooks/UseAuth"; 
import { CategoryProvider } from "./context/CategoryContext";
import { ProductsProvider } from "./context/ProductContext";

import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import Sell from "./pages/Sell/Sell";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated ? <Navigate to="/" /> : element;
};

// Main App component
const App = () => {
  return (
    <AuthProvider> 
      <CategoryProvider>
        <ProductsProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
                <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />
                <Route path="/" element={<PrivateRoute element={<Home />} />} />
                <Route path="/sell" element={<PrivateRoute element={<Sell />} />} />
              </Routes>
            </div>
          </Router>
        </ProductsProvider>
      </CategoryProvider>
    </AuthProvider>
  );
};

export default App;
