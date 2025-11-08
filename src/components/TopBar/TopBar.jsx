import React from "react";
import logo from "././../../assets/img/Logo.png";
import { Slant as Hamburger } from "hamburger-react";
const TopBar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="flex fixed top-0 left-0 z-40 h-[80px] w-full bg-white p-3 items-center justify-between lg:hidden">
      <div className="flex items-center w-full justify-between">
        <p className="flex rounded-xl w-30 text-white text-2xl font-semibold">
          <img src={logo} alt="Logo" />
        </p>
      </div>
      <button
        className="rounded-full p-1 bg-green-100"
        onClick={() => toggleSidebar()}
      >
        <Hamburger size={30} toggled={isSidebarOpen} toggle={toggleSidebar} />
      </button>
    </div>
  );
};

export default TopBar;
