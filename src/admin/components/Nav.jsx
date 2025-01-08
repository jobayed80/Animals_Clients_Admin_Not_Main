import React from "react";

const Nav = ({ onToggleSidebar, onToggleDarkMode, darkMode }) => {



  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <button
        className="md:hidden bg-gray-800 text-white p-2 rounded"
        onClick={onToggleSidebar}
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg> */}
      </button>

      <div className="text-lg font-semibold">Admin Dashboard</div>
      <div>
        <button onClick={onToggleDarkMode} className="p-2 rounded-lg text-white hover:bg-gray-700">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

    </nav>
  );
};

export default Nav;
