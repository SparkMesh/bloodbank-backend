import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";

import API from "../services/API";
import moment from "moment";
import { Button,Grid,Table,ConfigProvider, Space } from "antd";

import DemoPie from "../components/DemoPie";
import DemoArea from "../components/DemoArea";
import DemoLiquid from "../components/DemoLiquid";
import Calendar from "../components/Calendar";
import Slider from "../components/Slider";
import BarChart from "../components/BarChart"
const chartData = [
  {
    type: 'a',
    value: 27,
  },
  {
    type: 'a',
    value: 25,
  },
  {
    type: 'a',
    value: 18,
  },
  {
    type: 'a',
    value: 15,
  },
  {
    type: 'a',
    value: 10,
  },
  {
    type: 'a',
    value: 5,
  },
];
const config = {
  appendPadding: 10,
  chartData,
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
      content: 'AntV\nG2Plot',
    },
  },
};
const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [ColumnData, setColumnData] = useState([]);
  const [isModal, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
   
  };
  
  const columns = [
    {
      title: 'Blood Group',
      dataIndex: 'BloodGroup',
      key: 'BloodGroup',
    },
    {
      title: 'Inventory Type',
      dataIndex: 'InventoryType',
      key: 'InventoryType',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },
    {
      title: 'Donor Email',
      dataIndex: 'DonarEmail',
      key: 'DonarEmail',
    },
    {
      title: 'Time & Date',
      dataIndex: 'TimeDate',
      key: 'TimeDate',
    }
  ];
  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        data.inventory.map(

          (record) => {
            ColumnData.push({
            key: record._id,
            BloodGroup: record.bloodGroup,
            InventoryType: record.inventoryType,
            Quantity: record.quantity,
            DonarEmail: record.email,
            TimeDate: moment(record.createdAt).format("DD/MM/YYYY hh:mm A")
          })
        }
        
        )
         console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();

  }, []);
  return (
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
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
          
          <div className="w-full flex mt-2 justify-center">
            <Button
              className="right-0 m-2 bg-white"
              onClick={() =>{setIsModalOpen(true)
              
              }}

            >
            
              Add Inventory
            </Button>
            </div>
            <div className="grid w-[80vw] h-90 mb-20 grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 items-center gap-8 m-2">
            <Slider/>
            <DemoPie />
         <DemoArea/>
         <Calendar/>
        
         <BarChart/>
            </div>
            <Table 
            className="w-[90vw] bg-white rounded-lg overflow-scroll"
            pagination={
              {
                defaultCurrent:1, 
                total:50,
                showSizeChanger:true,
                showQuickJumper:true,

              }
            }
            
            bordered columns={columns} dataSource={ColumnData} />

            <Modal isModal={isModal} showModal={showModal} handleOk={handleOk} handleCancel={handleCancel} />
          </div>
        </>
      )}
    </Layout></Space>
  </ConfigProvider>
  );
};

export default HomePage;
