import type React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">

      <div className="absolute inset-0 opacity-30">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 600"
          fill="none"
        >
          <circle cx="400" cy="300" r="300" fill="url(#gradient)" />
          <defs>
            <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-full px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

