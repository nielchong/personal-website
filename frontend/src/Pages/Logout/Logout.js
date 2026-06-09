import React from 'react';
import Layout from '../../Components/Layout';
import './Logout.css';

const Logout = () => {
  return (
    <Layout>
      <div className="logout-container">
        <h2>You have successfully logged out.</h2>
      </div>
    </Layout>
  );
};

export default Logout;