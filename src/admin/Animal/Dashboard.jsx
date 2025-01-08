import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import ProductAdd from "../components/ProductAdd";
import Banner from "../components/Banner";
import ProductTable from "../components/ProductTable";
// import ProductManagement from "../components/ProductManagement";
import CardData from "../components/CardData";

const Dashboard = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [isOpen, setIsOpen] = useState(false); // Sidebar toggles for mobile
  const [activeMenu, setActiveMenu] = useState("home");

  const handleSelectMenu = (menu) => {
    setActiveMenu(menu);
    setIsOpen(false); // Close the sidebar on mobile after selecting a menu
  };

  return (
    <>
      <div
        className={`flex h-screen overflow-hidden ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Sidebar */}
        <Sidebar
          isOpen={isOpen}
          onSelectMenu={handleSelectMenu}
          activeMenu={activeMenu}
        />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Nav
            onToggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            onToggleSidebar={() => setIsOpen(!isOpen)} // Toggle sidebar for mobile
          />

          {/* Dynamic Content */}
          <main className="flex-1 mt-6 p-4 md:p-6 overflow-y-auto">
            {/* Main Content Area */}
            <div className="flex-1">
              {activeMenu === "home" && (
                <div>
                  <Banner />
                  <CardData />
                  <ProductTable />
                </div>
              )}

              {activeMenu === "product" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Product Dashboard</h2>
                  <ProductAdd />
                  {/* <ProductManagement /> */}
                </div>
              )}

              {activeMenu === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Order Management</h2>
                  <ProductTable />
                </div>
              )}

              {activeMenu === "logout" && (
                <div className="text-center">{onLogout()}</div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
