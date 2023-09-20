import React, { useEffect } from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector,useDispatch  } from "react-redux";
import { toggleMenuCollapsed } from "../../../redux/features/auth/authSlice";
import 
 { useState } from 'react';
 import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Dropdown,Badge, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme,Button,Skeleton } from 'antd';

const { Content, Footer, Sider } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const { user,menuCollapsed } = useSelector((state) => state.auth);
 // console.log("user",user)
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(menuCollapsed);
 
  const colorBgContainer = "#dc2626" ;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
 
  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };
  const items = [
    getItem((<button className="" onClick={handleLogout}>
    Logout
  </button>), '3', <UserOutlined />)
   , getItem((location.pathname === "/" ||
    location.pathname === "/donar" ||
    location.pathname === "/hospital" ? (
     
        <Link to="/recentrecords" className="">
          Recent Records
        </Link>
      
    ) : (
      <>
      {user ? (<Link to={user.role === "admin"?"/admin":"/"} className="">
      Home
    </Link>):<Skeleton.Button/>}</>
        
      
    )), '2', <DesktopOutlined />),
  

    
  ];
  if(user?.role == "donar" ){
    items.push(getItem(<Link  to="/profile" >Profile</Link>, '1', <TeamOutlined />))
  }


  return (
    
      
    
      
        <Layout.Header
       className="sticky top-0 z-50"

          style={{
            padding: 0,
            background: '#dc2626',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            color: '#dc2626',
            width: '100%',
            height: '64px',
            boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
            zIndex: 100,
            backgroundColor: '#dc2626',


          }}

          //className="w-full border-2 border-red-600 "
        >
          <Menu >
          <div className="flex flex-row w-full  justify-between items-center ">
          <Button
            type="text"
            icon={collapsed>0 ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => 
              {
              dispatch(toggleMenuCollapsed())
            setCollapsed(menuCollapsed>0?0:1)
            }}
            style={{
              color: collapsed>0?'#b91c1c':'#292524',
              width: 64,
              height: 64,
            }}
          />
          <div className="flex flex-row justify-between  w-[100%] items-center gap-1 ">
            <div
            className="flex flex-row justify-center w-full  items-center gap-1 "
            > 
            {user?.role ?
            
             
            
              <div className="flex flex-row items-center "><UserOutlined/>
             <p className=" ml-2"><Badge.Ribbon 
    className="opacity-70 -mt-6 -mr-1 text-[12px]  rounded-full"
    text={user?.role} color="#be123c">  
    <p className="text-lg">
    {user?.name || user?.hospitalName || user?.organisationName}
    </p>
    </Badge.Ribbon></p></div>
             
  
            :
            <div className="  w-[130px] h-9 flex  justify-center  ">
            <Skeleton.Button
            
           className=" "
            loading={true}
            block={true}
            active /></div>
            
            }



           </div>
           
              
            <Dropdown 
            className="mr-3"
            menu={ {
              
              items
              
              
              } } placement="bottomRight" arrow>
      <Button>Profile</Button>
    </Dropdown>
            
            </div>
          
          
          
            
            
            
          </div></Menu>
          </Layout.Header>
          
        
       
      
   
  );
};

export default Header;
