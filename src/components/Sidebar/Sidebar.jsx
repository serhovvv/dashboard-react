import { LogOut } from "lucide-react";
import logo from "././../../assets/img/Logo.png";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import Navbar from "./NavBar";
import UserInfo from "./UserInfo";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full 
          lg:w-[260px] w-full flex flex-col justify-between transition-transform duration-300 z-40 
          md:translate-x-0
          ${!isSidebarOpen ? "pointer-events-none" : "pointer-events-auto"}
        `}
      >
        {/* backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* main panel */}
        <div
          className={`flex flex-col h-full py-8 px-6 bg-white fixed top-0 left-0  
          w-[260px] justify-between transition-transform duration-300 
          ${isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-full"} 
          lg:translate-x-0 lg:pointer-events-auto`}
        >
          <Navbar />

          <div>
            <div className="mb-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex text-[var(--text-primary)] hover:text-black gap-x-2 cursor-pointer"
              >
                <LogOut />
                Log out
              </button>
            </div>
            <UserInfo />
          </div>
        </div>
      </aside>

      {/* modal */}
      <div>
        <LogoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

export default Sidebar;
