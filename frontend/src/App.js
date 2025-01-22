import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from '../src/Pages/LoginPage.js'
import OwnerPortal from '../src/Pages/OwnerPortal.js'
import CustomerPortal from '../src/Pages/CustomerPortal.js'
import {UserContext} from '../src/UserContext.js'
import './App.css';

function App() {

  const {user} = useContext(UserContext);

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LoginPage />} />
      {/* Protected Routes */}
      <Route
                path="/customer"
                element={user?.role === 'customer' ? <CustomerPortal /> : <Navigate to="/" />}
            />
            <Route
                path="/owner"
                element={user?.role === 'owner' ? <OwnerPortal /> : <Navigate to="/" />}
            />
        </Routes>
  );
}

export default App;
