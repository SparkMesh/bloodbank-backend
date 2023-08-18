import React, { useState, useEffect,useRef } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie = () => {
    const ref = useRef(null);
  const data = [
    {
      type: 'O+',
      value: 27,
    },
    {
      type: 'O-',
      value: 25,
    },
    {
      type: 'A+',
      value: 18,
    },
    {
      type: 'A-',
      value: 15,
    },
    {
      type: 'B+',
      value: 10,
    },
    {
      type: 'B-',
      value: 5,
    },
  ];
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
