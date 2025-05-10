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

const sidebarConfig = [
  {
    category: "Inicio",
    links: [
      { to: "/dashboard", label: "Menú Principal", icon: FiGrid },
    ],
  },
  {
    category: "Administración",
    links: [
      {
        label: "Empleados",
        icon: FiUsers,
        subMenuKey: "employees",
        subLinks: [
          { to: "/dashboard/employees", label: "Lista de empleados" },
          { to: "/dashboard/employees/create", label: "Crear empleado" },
        ],
      },
      { to: "/dashboard/settings", label: "Ajustes", icon: FiSettings },
    ],
  },
];

export function Sidebar() {
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
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
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
            className="w-64 h-full bg-[#1f1f1f] text-white p-4 transform transition-transform duration-200 ease-in-out"
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

      <div className="hidden md:block w-64 bg-[#1f1f1f] text-white border-r border-[#1f1f1f] h-screen sticky top-0">
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
  currentPath,
}: SidebarContentProps) {
  const isSubMenuActive = (subLinks: { to: string }[]) =>
    subLinks.some((subLink) => currentPath.startsWith(subLink.to));

  return (
    <>
      <div className="flex items-center justify-start py-4 px-4">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-[#891818] flex items-center justify-center">
            <img src="/img/logo/TurnoMasterWhite.svg" className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-white">TurnoMaster</span>
            <span className="text-xs text-slate-300">Panel de trabajo</span>
          </div>
        </Link>
      </div>

      <div className="p-4">
        {sidebarConfig.map((section) => (
          <div key={section.category} className="mb-6">
            <h3 className="text-xs font-medium text-slate-300 mb-2">
              {section.category}
            </h3>
            <ul className="space-y-1">
              {section.links.map((link) =>
                link.subMenuKey ? (
                  <li key={link.label}>
                    <button
                      className={`flex items-center justify-between w-full gap-2 px-3 py-2 rounded-md text-sm ${
                        isSubMenuActive(link.subLinks || [])
                          ? "bg-[#891818] text-white"
                          : "text-slate-200 hover:bg-[#891818]"
                      }`}
                      onClick={() => toggleSubMenu(link.subMenuKey!)}
                    >
                      <div className="flex items-center gap-2">
                        {link.icon && <link.icon className="h-4 w-4" />}
                        <span>{link.label}</span>
                      </div>
                      <FiChevronRight
                        className={`h-4 w-4 transition-transform ${
                          expandedItems[link.subMenuKey] ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {expandedItems[link.subMenuKey] && (
                      <ul className="mt-1 ml-6 space-y-1 border-l border-slate-600 pl-2">
                        {link.subLinks?.map((subLink) => (
                          <li key={subLink.to}>
                            <Link
                              to={subLink.to}
                              className={`flex items-center px-3 py-2 rounded-md text-sm ${
                                currentPath === subLink.to
                                  ? "text-white font-bold"
                                  : "text-slate-300 hover:text-white"
                              }`}
                            >
                              {subLink.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={link.to}>
                    {link.to && (
                      <Link
                        to={link.to}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                          currentPath === link.to
                            ? "bg-[#891818] text-white"
                            : "text-slate-200 hover:bg-[#891818]"
                        }`}
                      >
                        {link.icon && <link.icon className="h-4 w-4" />}
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}