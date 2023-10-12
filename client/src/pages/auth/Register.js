import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { Button,ConfigProvider, Space } from "antd";
import {  ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <div 
        className="flex justify-center items-center w-screen h-screen"
        >
        <Spinner /></div>
      ) : (
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
        className="bg-red-600"
        >
        <div  style={{
          boxShadow: "0px -5px 40px -10px rgba(0,0,0,0.75)",
          
        }}
        className="flex   w-[98vw]  flex-col -mb-2 pb-2 h-[100vh] gap-8 justify-center items-center bg-green-200 rounded-l-[75px] !rounded-b-none  ml-[2%]">
         
         <div
          
         className="overflow-y-scroll overflow-hidden rounded-r-none   shadow-md shadow-gray-400 w-[300px] h-[60%] rounded-xl">
         <Form
         
          style={'rounded-r-none'}
              formTitle={"Register"}
              submitBtn={"Register"}
              formType={"register"}
            /></div>
            
        <div className="flex flex-row justify-content-between">
       
         
            <div>
              Already A User, Please
              
              <Link
               // className="font-semibold border-2 p-1 px-2 focus:opacity-75 focus:bg-blue-200 transition-all border-blue-200 rounded-lg ml-2"
                to="/login"
              ><Button
              
              
              className="mx-2 bg-white "
             // className="font-semibold border-2 p-1 focus:opacity-75 focus:bg-blue-200 transition-all border-blue-200 rounded-lg ml-2"
            >
                {" "}
                Login ! {" "}</Button>
              </Link>
            </div>
         
          
        </div>
          <Button
          onClick={() => window.location.replace("https://quickdonorbd.org/")}
          className="bg-white "
          icon={<ArrowLeftOutlined />}
          >Home</Button>
        </div> </Space>
  </ConfigProvider>
      )}
    </>
  );
};

export default Register;
