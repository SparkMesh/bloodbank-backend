import React, { useState, useEffect,useRef } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';
import { ConfigProvider, Space } from 'antd';
const DemoArea = () => {
  const [data, setData] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
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
