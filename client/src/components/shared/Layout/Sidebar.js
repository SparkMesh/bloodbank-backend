import React from "react";
// import { userMenu } from "./Menus/userMenu";
import { useLocation, BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import "../../../styles/Layout.css";
import { Breadcrumb, Layout, Menu, theme,Button,ConfigProvider, Space, } from 'antd';
import { toggleMenuCollapsed } from "../../../redux/features/auth/authSlice";
import { ContainerFilled,BankFilled ,PieChartFilled,ArrowRightOutlined,ArrowLeftOutlined,DatabaseFilled,MedicineBoxFilled  } from '@ant-design/icons';
import {motion,AnimatePresence} from 'framer-motion';
const {  Sider } = Layout;


const Sidebar = () => {
  //GET USER STATE
  const { user,menuCollapsed } = useSelector((state) => state.auth);
  //console.log(menuCollapsed);
const dispatch = useDispatch();
  const location = useLocation();
  const items = [];
  const [showMenu,setShowMenu] = React.useState(false);
  
  if (user?.role === "admin"){
    items.push(
      {key: '1',
      label:"Admin"
    ,
    path:"/admin",
    icon: <BankFilled />,
    }
    )
    items.push(
      {key: '2',
      label:"Donor List"
    ,
    path:"/donar-list",
    icon: <PieChartFilled />,
    }
    )
    items.push(
      {key: '3',
      label:"Hospital List"
    ,
    path:"/hospital-list",
    icon: <PieChartFilled />,
    }
    )
    items.push(
      {key: '4',
      label:"Organisation List"
    ,
    path:"/org-list",
    icon: <PieChartFilled />,
    }
    )
    items.push(
      {key: '5',
      label:"Request List"
    ,
    path:"/request-list",
    icon: <PieChartFilled />,
      })


}

  if(user?.role === "organisation"){
    items.push(
      {key: '1',
      label: 
    
         'Inventory'
      
    
    
    ,
    
    icon: <DatabaseFilled />,
    path:'/',
    }
    )
    items.push(
      {key: '2',
      label: 
      'Hospital'
     ,
    
    
    icon: <MedicineBoxFilled />,
    path:'/hospital',
    }
    )
    items.push(
      {key: '3',
      label: 
        
        
          'Donor'
       
        
     
    
    
    ,
    icon: <PieChartFilled />,
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
  icon: <PieChartFilled />,
  }
  )
}
if(user?.role === "donar" ){
  items.push(
    {key: '1',
    label:"Dashboard"
  ,
  path:"/",
  icon: <PieChartFilled />,
  }
  )
  items.push(
    {key: '2',
    label:"My Donations",
    path:"/donation",
    icon: <ContainerFilled />,
    })
}
  if(user?.role === "donar" || user?.role === "hospital"){
    items.push(
      {key: '2',
      label: 
        
              "Orgnaisations"
            
    
    ,
    icon: <BankFilled />,
    path:'/orgnaisation',
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
   
  <ConfigProvider
  theme={{
    token: {
      // Seed Token
      colorPrimary: ' #dc2626',
      borderRadius: 10,

      // Alias Token
      
    },
  }}
>
  <Space
  direction="vertical"
  >
   <Layout hasSider>
        <Sider
      
     
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
      
          
         
      </Layout></Space>
  </ConfigProvider>
    
      
          
          

         
       
    // </motion.div>
    
  
   )} 
    </AnimatePresence> 
  );
};

export default Sidebar;
