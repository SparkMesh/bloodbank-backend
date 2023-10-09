import React, { useState, useEffect,useRef } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie = ({bloodGroupData}) => {

    const ref = useRef(null);
  const data = 
  [
    {
      type: 'O+',
      value: bloodGroupData ? bloodGroupData[0].totalEntry: 0,
    },
    {
      type: 'O-',
      value: bloodGroupData ? bloodGroupData[1]?.totalEntry : 0,
    },
    {
      type: 'A+',
      value: bloodGroupData ? bloodGroupData[2]?.totalEntry : 0,
    },
    {
      type: 'A-',
      value: bloodGroupData ? bloodGroupData[3]?.totalEntry : 0,
    },
    {
      type: 'B+',
      value: bloodGroupData ? bloodGroupData[4]?.totalEntry : 0,
    },
    {
      type: 'B-',
      value: bloodGroupData ? bloodGroupData[5]?.totalEntry : 0,
    },
    {
      type: 'AB+',
      value: bloodGroupData ? bloodGroupData[6]?.totalEntry : 0,
    },
    {
      type: 'AB-',
      value: bloodGroupData ? bloodGroupData[7]?.totalEntry : 0,
    }
  ];
  console.log(data.length)
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Blood\nStat',
      },
    },
  };
 
   
  
  return <Pie 
  height={300}
  className='bg-white rounded-lg   shadow-lg shadow-gray-300'
  ref={ref} {...config} />;
};

export default DemoPie;
