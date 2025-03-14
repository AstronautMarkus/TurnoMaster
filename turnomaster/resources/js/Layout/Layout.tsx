import React, { ReactNode, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Layout.css";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import RightSidebar from "../components/RightSidebar/RightSidebar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(false);

  const toggleRightSidebar = () => {
    if (isRightSidebarOpen) {
      setIsRightSidebarOpen(false);
      setIsRightSidebarVisible(false);
    } else {
      setIsRightSidebarVisible(true);
      setIsRightSidebarOpen(true);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1 w-100" style={{ overflow: 'hidden' }}>
        <Sidebar />
        <div className="d-flex flex-column flex-grow-1 w-100">
          <Navbar toggleRightSidebar={toggleRightSidebar} />
          <main className="flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="container rounded bg-white mt-4 mb-4" style={{ width: '100%', maxWidth: '1200px' }}>
              <div>
                {children}
              </div>
            </div>
          </main>
          {isRightSidebarVisible && (
            <RightSidebar isOpen={isRightSidebarOpen} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Layout;