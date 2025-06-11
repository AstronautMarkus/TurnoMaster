import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { UserNav } from "./UserNav/UserNav";

export function Navbar(){
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen);
    window.dispatchEvent(new CustomEvent("toggle-sidebar"));
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b dashboard-background text-white px-4 sm:px-6">
      <div className="ml-auto flex items-center gap-2">
        <UserNav />
        <button
          onClick={toggleSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
        >
          <FiMenu className="h-6 w-6" />
          <span className="sr-only"></span>
        </button>
      </div>
    </header>
  );
}