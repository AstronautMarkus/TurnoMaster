import React, { ReactNode } from "react";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Navbar } from "./Components/Navbar/Navbar";
import useTrialChecker from "../../hooks/auth/useTrialChecker";
import DemoAccountNotifier from "./Components/DemoAccountNotifier/DemoAccountNotifier";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const useTrial = useTrialChecker();

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-b from-gray-100 to-gray-300">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        {useTrial === true && (
          <div className="fixed bottom-4 right-4 z-50">
            <DemoAccountNotifier />
          </div>
        )}
      </div>
    </div>
  );
}
export default DashboardLayout;