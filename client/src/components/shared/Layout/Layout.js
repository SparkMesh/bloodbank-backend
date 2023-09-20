import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Layout as lout,Button, ConfigProvider, Input, Space, theme } from "antd";
const Layout = ({ children }) => {
const { menuCollapsed } = useSelector((state) => state.auth)
const [width,setWidth] = React.useState( menuCollapsed == 0?'full':'screen');


  return (
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: ' #dc2626',
       

        // Alias Token
        
      },
    }}
  >
    <Space
    direction="vertical"
    >
      <lout  className="flex flex-row w-screen h-screen overflow-hidden">
        
      <Sidebar />
      
      <lout className={`w-screen overflow-y-scroll`}>
      <Header />
     
        <lout.Content
        className={` overflow-scroll  min-h-screen flex flex-col justify-start items-center  bg-[#F5F5F5]`}
        >
          
          {children}
          
        
          </lout.Content>
      </lout></lout> 
        </Space>
  </ConfigProvider>
    
  );
};


export default Layout;
