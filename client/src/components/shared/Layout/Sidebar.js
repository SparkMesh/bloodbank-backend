import React from "react";
// import { userMenu } from "./Menus/userMenu";
import { useLocation, BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import "../../../styles/Layout.css";
import { Breadcrumb, Layout, Menu, theme,Button } from 'antd';
import { toggleMenuCollapsed } from "../../../redux/features/auth/authSlice";
import { PieChartOutlined,ArrowRightOutlined,ArrowLeftOutlined,DatabaseOutlined,MedicineBoxOutlined  } from '@ant-design/icons';
import {motion,AnimatePresence} from 'framer-motion';
const { Content, Footer, Sider } = Layout;


const Sidebar = () => {
  //GET USER STATE
  const { user,menuCollapsed } = useSelector((state) => state.auth);
  console.log(menuCollapsed);
const dispatch = useDispatch();
  const location = useLocation();
  const items = [];
  const [showMenu,setShowMenu] = React.useState(false);
  
  if (user?.role === "admin"){
items.push(
  {
    key: '1',
    label: (
      user?.role === "admin" && (
        <>
          <div
            className={`menu-item ${
              location.pathname === "/donar-list" && "active"
            }`}
          >
            <i className="fa-solid fa-warehouse"></i>
            <Link to="/donar-list">Donar List</Link>
          </div>
          
        </>
      )
    ),
    icon: <PieChartOutlined />,
  }
)
items.push(
  {
    key: '2',
    label: (
      user?.role === "admin" && (
        <>
          
          <div
            className={`menu-item ${
              location.pathname === "/hospital-list" && "active"
            }`}
          >
            <i className="fa-solid fa-hand-holding-medical"></i>
            <Link to="/hospital-list">Hospital List</Link>
          </div>
          
        </>
      )
    ),
    icon: <PieChartOutlined />,
  }
)
items.push(
  {
    key: '3',
    label: (
      user?.role === "admin" && (
        <>
          
          <div
            className={`menu-item ${
              location.pathname === "/org-list" && "active"
            }`}
          >
            <i className="fa-solid fa-hospital"></i>
            <Link to="/org-list">Organisation List</Link>
          </div>
        </>
      )
    ),
    icon: <PieChartOutlined />,
  }
)

}

  if(user?.role === "organisation"){
    items.push(
      {key: '1',
      label: 
    
         'Inventory'
      
    
    
    ,
    
    icon: <DatabaseOutlined />,
    path:'/',
    }
    )
    items.push(
      {key: '2',
      label: 
      'Hospital'
     ,
    
    
    icon: <MedicineBoxOutlined />,
    path:'/hospital',
    }
    )
    items.push(
      {key: '3',
      label: 
        
        
          'Donor'
       
        
     
    
    
    ,
    icon: <PieChartOutlined />,
    path:'/donar',
    }
    )
  }

if (user?.role === "hospital"){
  items.push(
    {key: '1',
    label: (
      user?.role === "hospital" && (
        <div
          className={`menu-item ${
            location.pathname === "/consumer" && "active"
          }`}
        >
          <i className="fa-sharp fa-solid fa-building-ngo"></i>
          <Link to="/consumer">Consumer</Link>
        </div>
      )
  )
  ,
  icon: <PieChartOutlined />,
  }
  )
}
  if(user?.role === "donar" || user?.role === "hospital"){
    items.push(
      {key: '2',
      label: (
        <div
              className={`menu-item ${
                location.pathname === "/orgnaisation" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"></i>
              <Link to="/orgnaisation">Orgnaisation</Link>
            </div>
    )
    ,
    icon: <PieChartOutlined />,
    }
    )
  } 
if(user?.role === "donar" ){
  items.push(
    {key: '1',
    label: (
      <div
      className={`menu-item ${
        location.pathname === "/donation" && "active"
      }`}
    >
      <i className="fa-sharp fa-solid fa-building-ngo"></i>
      <Link to="/donation">Donation</Link>
    </div>
  )
  ,
  icon: <PieChartOutlined />,
  }
  )
}


  
  
  return (<AnimatePresence> 

 { (menuCollapsed == 0 || menuCollapsed == 1) && (


  //    <motion.div
  //   initial={{x:"-100px"}}
  //   animate={{x:0}}
  //  // exit={{x:"-100px"}}
  //   transition={{duration:0.1}}
    
  //   > 
   <Layout hasSider>
        <Sider
      
      theme="dark"
      className="flex relative  flex-col justify-between h-screen rounded-r-lg shadow-md shadow-gray-600 "
      collapsible trigger={null} collapsed={ menuCollapsed == 1 ? false : true}
      //  onCollapse={(value) => {
      // console.log(value)
      // dispatch(toggleMenuCollapsed())}}
      
      >
        <img 
        className="w-11 h-11 m-auto"
        src="/logo192.png"  />
        <Menu 
        theme="dark" mode="inline"
        defaultSelectedKeys={['/']}
        selectedKeys={[location.pathname]}
        >
            {items.map((route, index) => (
              <Menu.Item key={route.path} 
              icon={route.icon}
              >
                <Link to={route.path}>{route.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
       <div
       className="absolute h-[50px] w-full bottom-0"
       >
        <div
        onClick={() => dispatch(toggleMenuCollapsed())}
        className="flex transition-all active:scale-75 active:opacity-70 justify-center items-center w-8 h-8 text-white bg-red-700  m-auto rounded-full cursor-pointer"
        >
        {
          !menuCollapsed ? (
            <ArrowRightOutlined />
            ):(
<ArrowLeftOutlined />
          )
        }
        </div>
        </div>
      </Sider>
      
          
         
      </Layout>
    
      
          
          

         
       
    // </motion.div>
    
  
   )} 
    </AnimatePresence> 
  );
};

export default Sidebar;
