import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { ConfigProvider, Space } from 'antd';
const DemoColumn = ({totalEntryEachMonth}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
   if(data.length === 0 && totalEntryEachMonth){
    totalEntryEachMonth.map((item)=>{
      item._id = `${item._id}/${currentYear}`
   })
    setData(totalEntryEachMonth)
   
   
   ;}
  }, []);
const date = new Date();
const currentYear = date.getFullYear();
 
  const config = {
    data,
    xField: `_id`,
    yField: 'count',
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    slider: {
      start: 0,
      end: 1,
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
  >
    <Column
  height={300}
  className='bg-white rounded-lg shadow-lg shadow-gray-300 p-2'
  {...config} /></Space>
  </ConfigProvider>;

};

export default DemoColumn
