import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Layout as lout } from "antd";
const Layout = ({ children }) => {
const { menuCollapsed } = useSelector((state) => state.auth)
const [width,setWidth] = React.useState( menuCollapsed == 0?'full':'screen');


  return (
    
      <lout  className="flex flex-row w-screen h-screen overflow-y-hidden">
        
        <Sidebar />
      
      <lout className={`w-screen overflow-y-scroll`}>
      <Header />
        <lout.Content
        className={` overflow-x-scroll  min-h-screen flex flex-col justify-start items-center p-2   bg-[#F5F5F5]`}
        >{children}</lout.Content>
      </lout></lout>
    
  );
};

export default Layout;
