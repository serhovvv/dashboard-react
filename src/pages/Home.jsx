import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <main className="flex w-full h-screen md:flex-row gap-4 flex-col">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex items-end md:ml-[260px] md:mt-0 mt-[80px]">
        <Outlet />
      </div>
    </main>
  );
};

export default Home;
