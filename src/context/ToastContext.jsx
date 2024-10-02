import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const checkAndShowToasts = () => {
    const toastMessages = [
      { key: 'loginSuccess', message: 'Login successful!' },
      { key: 'signupSuccess', message: 'Signup successful!' },
      { key: 'productAddSuccess', message: 'Product added successfully!' },
      { key: 'profileImageUploadSuccess', message: 'Profile image uploaded successfully!' },
      { key: 'logoutSuccess', message: 'Logout successful!' },
    ];

    toastMessages.forEach(({ key, message }) => {
      const toastKey = localStorage.getItem(key);
      if (toastKey) {
        console.log("toast found invokgin rn",key)
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          console.log("removing ",key)
          localStorage.removeItem(key);
        }, 200);
      }
    });
  };

  return (
    <ToastContext.Provider value={{ checkAndShowToasts }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
