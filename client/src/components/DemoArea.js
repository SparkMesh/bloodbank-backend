import React, { useState, useEffect,useRef } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';
import { ConfigProvider, Space } from 'antd';
const DemoArea = ({totalEntry}) => {
  const [data, setData] = useState([]);
  const date = new Date();
  const cuurentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  
  data.push({timePeriod: '1/2023', value: 0})
  data.push({timePeriod: `${cuurentMonth}/${currentYear}`, value: totalEntry})
  const ref = useRef(null);
 
  const config = {
    data,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
  };

  return  <ConfigProvider
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
  ><Area 
  height={300}
  className='bg-white p-2 rounded-lg shadow-lg shadow-gray-300'
  ref={ref} {...config} /> </Space>
  </ConfigProvider>;
};

export default DemoArea;
