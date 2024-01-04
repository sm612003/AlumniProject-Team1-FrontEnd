import React from "react";
import Sidebar from "../Layouts/sideBar/SideBar";
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