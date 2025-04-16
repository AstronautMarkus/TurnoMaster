import React, { useEffect, useState } from "react";
import { FiChevronRight, FiGrid, FiSettings, FiUsers, FiClock, FiBarChart2 } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

interface ExpandedItems {
  [key: string]: boolean;
}

interface SidebarContentProps {
  expandedItems: ExpandedItems;
  toggleSubMenu: (key: string) => void;
  currentPath: string;
}

export function Sidebar(){
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});
  const location = useLocation();

  useEffect(() => {
    const handleToggle = (): void => setIsOpen(!isOpen);
    window.addEventListener("toggle-sidebar", handleToggle);
    
    const checkIfMobile = (): void => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("toggle-sidebar", handleToggle);
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleSubMenu = (key: string): void => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-64 h-full bg-slate-700 text-white p-4 transform transition-transform duration-200 ease-in-out"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <SidebarContent 
              expandedItems={expandedItems} 
              toggleSubMenu={toggleSubMenu}
              currentPath={location.pathname}
            />
          </div>
        </div>
      )}

      <div className="hidden md:block w-64 bg-slate-700 text-white border-r border-slate-600 h-screen sticky top-0">
        <SidebarContent 
          expandedItems={expandedItems} 
          toggleSubMenu={toggleSubMenu}
          currentPath={location.pathname}
        />
      </div>
    </>
  );
}

function SidebarContent({ 
  expandedItems, 
  toggleSubMenu, 
  currentPath 
}: SidebarContentProps){
  return (
    <>
      <div className="flex items-center justify-start py-4 px-4">
        <Link 
          to="/dashboard" 
          className="flex items-center gap-3" 
        >
          <img
            src="/img/logo/TurnoMaster.svg"
            alt="TurnoMaster Logo"
            className="h-8 w-auto"
          />
          <div className="flex flex-col">
            <span className="font-bold text-sm text-white">TurnoMaster</span>
            <span className="text-xs text-slate-300">Dashboard</span>
          </div>
        </Link>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-xs font-medium text-slate-300 mb-2">Inicio</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/dashboard" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${currentPath === "/dashboard" ? "bg-slate-600 text-white" : "text-slate-200 hover:bg-slate-600"}`}><FiGrid className="h-4 w-4" /><span>Panel inicio</span></Link>
            </li>
            <li>
              <Link to="/dashboard/schedule" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${currentPath === "/dashboard/schedule" ? "bg-slate-600 text-white" : "text-slate-200 hover:bg-slate-600"}`}><FiClock className="h-4 w-4" /><span>Horarios</span></Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs font-medium text-slate-300 mb-2">Management</h3>
          <ul className="space-y-1">
            <li>
              <button className={`flex items-center justify-between w-full gap-2 px-3 py-2 rounded-md text-sm ${currentPath.startsWith("/users") ? "bg-slate-600 text-white" : "text-slate-200 hover:bg-slate-600"}`} onClick={() => toggleSubMenu("users")}><div className="flex items-center gap-2"><FiUsers className="h-4 w-4" /><span>Users</span></div><FiChevronRight className={`h-4 w-4 transition-transform ${expandedItems.users ? "rotate-90" : ""}`} /></button>
              
              {expandedItems.users && (
                <ul className="mt-1 ml-6 space-y-1 border-l border-slate-600 pl-2">
                  <li>
                    <Link to="/users" className={`flex items-center px-3 py-2 rounded-md text-sm ${currentPath === "/users" ? "text-white" : "text-slate-300 hover:text-white"}`}>All Users</Link>
                  </li>
                  <li>
                    <Link to="/users/new" className={`flex items-center px-3 py-2 rounded-md text-sm ${currentPath === "/users/new" ? "text-white" : "text-slate-300 hover:text-white"}`}>Add User</Link>
                  </li>
                </ul>
              )}
            </li>
            
            <li>
              <Link to="/reports" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${currentPath === "/reports" ? "bg-slate-600 text-white" : "text-slate-200 hover:bg-slate-600"}`}><FiBarChart2 className="h-4 w-4" /><span>Reports</span></Link>
            </li>
            
            <li>
              <Link to="/dashboard/settings" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${currentPath === "/dashboard/settings" ? "bg-slate-600 text-white" : "text-slate-200 hover:bg-slate-600"}`}><FiSettings className="h-4 w-4" /><span>Ajustes</span></Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}