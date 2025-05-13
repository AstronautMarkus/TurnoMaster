import type React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-500">
      <div className="absolute inset-0 bg-cover bg-center bg-[url('/img/backgrounds/kate-sade-2zZp12ChxhU-unsplash.jpg')] brightness-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

