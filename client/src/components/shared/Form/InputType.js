import React, { useEffect } from "react";
import {Input,Form,ConfigProvider, Space  } from "antd";
const InputType = ({
  labelText,
  labelFor,
  inputType,
  value,
  onChange,
  name,
  style,
  defaultValue
}) => {
  const [isRequired,setIsRequired] = React.useState(true)
  useEffect(() => {
  if(labelText === "Phone" || labelText === "Occupation"){
    setIsRequired(false)
  }})
  return (
    <>
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
      <div className="flex flex-row relative ">
      <Form.Item
      className={  ` w-full  `}
      label={`${labelText}`}
      name={labelFor}
     
    >
      
  
        <Input
        defaultValue={defaultValue}
          type={inputType}
          className={`bg-gray-100 ${style} rounded-lg `}
          name={name}
          value={value}
          onChange={onChange}
        />  
        
        </Form.Item>{isRequired && <p className="text-red-600 mx-2 font-bold">*</p>}
      </div>
      </Space>
  </ConfigProvider>
    </>
  );
};

export default InputType;
