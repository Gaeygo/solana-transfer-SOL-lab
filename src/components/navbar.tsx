import React, { FC } from "react";
import { CustomAvatar } from "./custom-avatar";
import UserInfo from "./user-info";

export const Navbar: FC = () => {
  return (
    <div className="w-full flex mt-4 pl-5">
      <div className="my-auto flex   ">
        <CustomAvatar />
        <div className="my-auto ml-5 ">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};
