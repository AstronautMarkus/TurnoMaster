import React, { useState, MouseEvent } from "react";
import { FiBell, FiSearch, FiMenu } from "react-icons/fi";
import { UserNav } from "./UserNav/UserNav";

export function Navbar(){
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen);
    window.dispatchEvent(new CustomEvent("toggle-sidebar"));
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-slate-800 text-white px-4 sm:px-6">
      <div className="md:hidden">
        <button
          onClick={toggleSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-slate-700"
        >
          <FiMenu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </button>
      </div>

      <div className="flex-1">
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-slate-700 text-white border border-slate-600 rounded-md h-10 pl-8 pr-4 placeholder:text-slate-400 md:w-[300px] lg:w-[400px]"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          className="relative inline-flex items-center justify-center rounded-md border border-slate-600 bg-slate-700 p-2 text-white hover:bg-slate-600 hover:text-white"
        >
          <FiBell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] text-white">
            3
          </span>
        </button>
        <UserNav />
      </div>
    </header>
  );
}