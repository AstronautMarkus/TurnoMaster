import React, { ReactNode } from "react";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Navbar } from "./Components/Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-b from-gray-100 to-gray-300">
      <Sidebar  />
      <div className="flex flex-col flex-1 w-full">
        <Navbar  />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
export default DashboardLayout;