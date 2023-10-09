import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "./../../components/shared/Spinner";
import {  ArrowLeftOutlined } from "@ant-design/icons";
import { Button,ConfigProvider, Space } from "antd";
const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
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
        
        >
          <div
          className="bg-red-600 h-full w-screen flex justify-center items-center"
          >
        <div
        style={{
          boxShadow: "0px -5px 40px -10px rgba(0,0,0,0.75)",
        }}
        className="flex relative w-[98vw]  flex-col h-screen gap-8 justify-center items-center bg-green-200 rounded-l-[75px] !rounded-b-none  ml-[2%]">
         
          
            <Form
            style={'shadow-md shadow-gray-400'}
              formTitle={"Login Page"}
              submitBtn={"Login"}
              formType={"login"}
             
            />
            <Button
          onClick={() => window.location.replace("https://quickdonorbd.org/")}
          className="bg-white "
          icon={<ArrowLeftOutlined />}
          >Home</Button>
        </div></div>
       
        </Space>
  </ConfigProvider>
      )}
    </>
  );
};

export default Login;