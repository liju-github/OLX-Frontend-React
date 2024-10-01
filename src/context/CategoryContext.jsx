import React, { createContext, useState } from 'react';
const CategoryContext = createContext();
export const CategoryProvider = ({ children }) => {

  const [categories] = useState([
    'Cars', 'Properties', 'Mobiles', 'Jobs', 'Bikes', 
    'Electronics',' Appliances', 
    'Furniture', 'Fashion', 'Books' ,'Sports'
  ]);

  return (
    <CategoryContext.Provider value={{  categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
