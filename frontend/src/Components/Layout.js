import React from 'react';
import './Layout.css';
import TopBar from './TopBar';


function Layout({ children }) {
    return (
      <div className="layout">
        <TopBar />
        <div className="left-margin"></div>
        <div className="content">{children}</div>
        <div className="right-margin"></div>
      </div>
    );
  }
  
  export default Layout;