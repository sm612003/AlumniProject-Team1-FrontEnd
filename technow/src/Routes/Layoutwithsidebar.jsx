import React from "react";
import Sidebar from "../Layouts/sideBar/SideBar";
import { useState } from "react";

function LayoutWithHeaderSidebar({ children }) {
  return (
    <div >
      <Sidebar/>
      <div >
        <div>{children}</div>
      </div>
    </div>
    
  );
}

export default LayoutWithHeaderSidebar;