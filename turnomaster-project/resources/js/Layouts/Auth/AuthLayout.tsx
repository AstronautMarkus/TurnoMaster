import type React from "react";
import Background from "./Components/Background/Background";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Background />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

