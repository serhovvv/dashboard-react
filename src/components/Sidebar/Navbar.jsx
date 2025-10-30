import React from "react";

import logo from "././../../assets/img/Logo.png";
import { NavLink } from "react-router-dom";
import { ChartColumnDecreasing, CheckCheck, ShoppingCart } from "lucide-react";
const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `p-2 flex gap-x-2 rounded-lg hover:bg-green-50 text-[var(--text-primary)] ${
      isActive
        ? "bg-green-50 font-semibold hover:bg-green-50 text-green-600"
        : ""
    }`;
  return (
    <nav className="">
      <div className="flex items-center w-full justify-between">
        <p className="flex rounded-xl w-30 text-white text-2xl font-semibold">
          <img src={logo} alt="" />
        </p>
      </div>
      <div className="flex flex-col py-16 gap-2 ">
        <NavLink className={linkClass} to="/dashboard">
          <ChartColumnDecreasing size={"24px"} />
          Dashboard
        </NavLink>
        <NavLink className={linkClass} to="/products">
          <ShoppingCart size={"24px"} />
          Products
        </NavLink>
        <NavLink className={linkClass} to="/ourtasks">
          <CheckCheck size={"24px"} />
          Our Tasks
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
