import { LogOut } from "lucide-react";
import logo from "././../../assets/img/Logo.png";
import { useState } from "react";
import LogoutModal from "../LogoutModal";
import Navbar from "./NavBar";
import { Slant as Hamburger } from "hamburger-react";
import UserInfo from "./UserInfo";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full 
          md:w-[260px] w-full flex flex-col justify-between transition-transform duration-300 z-40
           
          md:translate-x-0`}
      >
        <div className="flex h-[100px] p-3 items-center justify-between md:hidden">
          <div className="flex items-center w-full justify-between">
            <p className="flex rounded-xl w-30 text-white text-2xl font-semibold">
              <img src={logo} alt="" />
            </p>
          </div>
          <button
            className="rounded-full p-1 bg-green-100"
            onClick={() => toggleSidebar()}
          >
            <Hamburger
              size={30}
              toggled={isSidebarOpen}
              toggle={toggleSidebar}
            />
          </button>
        </div>
        <div className="py-8 px-6 w-full h-full flex flex-col">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
              onClick={toggleSidebar}
            />
          )}

          <div
            className={`flex flex-col h-full bg-white fixed top-0 left-0  
          w-[260px] justify-between transition-transform duration-300 z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 py-8 px-6`}
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
        </div>
      </aside>
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
