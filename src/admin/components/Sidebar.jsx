import React, { useState } from "react";

const Sidebar = ({ isOpen, onSelectMenu, activeMenu }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Product", id: "product" },
    { label: "Orders", id: "orders" },
    { label: "Logout", id: "logout" },
  ];

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="md:flex">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-7 left-4 z-20 bg-gray-800 text-white p-2 rounded focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {isMobileOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0 z-10`}
      >
        <div className="p-4 text-lg font-semibold">Menu</div>
        <ul className="space-y-2 mt-[0.7rem]">
          {menuItems.map((menu) => (
            <li key={menu.id}>
              <button
                onClick={() => {
                  onSelectMenu(menu.id);
                  setIsMobileOpen(false); // Close sidebar on menu click (mobile)
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                  activeMenu === menu.id ? "bg-gray-700 text-blue-400" : ""
                }`}
              >
                {menu.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;
