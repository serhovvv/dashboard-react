import React from "react";
import avatar from "./../../assets/SVG/avatar-svgrepo-com.svg";

const UserInfo = () => {
  return (
    <div className="flex items-center gap-x-3">
      <img src={avatar} className="h-[46px]" alt="" />
      <div>
        <p className="font-semibold">Bill Towler</p>
        <p className="text-[var(--text-primary)]">eve.holt@reqres.in</p>
      </div>
    </div>
  );
};

export default UserInfo;
