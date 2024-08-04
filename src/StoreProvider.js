import React from 'react';
import TaskStore from './stores/TaskStore'; // Ensure this path is correct

export  const StoreContext = React.createContext(null);

const StoreProvider = ({ children }) => {
  const taskStore = new TaskStore('http://localhost:5000/api'); // Replace with your actual API base URL

  return (
    <StoreContext.Provider value={{ taskStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
 