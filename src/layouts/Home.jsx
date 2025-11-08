import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Menu from "../components/TopBar/TopBar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <main className="flex w-full h-screen lg:flex-row flex-col">
      {/* top bar for adaptive */}
      <div className="mb-[80px]">
        <Menu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className=" flex-1 flex items-end lg:ml-[260px] lg:mt-0 ">
        <Outlet />
      </div>
    </main>
  );
};

export default Home;
