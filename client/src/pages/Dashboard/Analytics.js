import React, { useState, useEffect } from "react";

import API from "./../../services/API";
import moment from "moment";
import { Card, Col, Row } from 'antd';
import { motion } from "framer-motion";
import Layout from "../../components/shared/Layout/Layout";
const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#be123c",
    "#c2410c",
    "#b45309",
    "#4F709C",
    "#4d7c0f",
    "#a21caf",
    "#be185d",
    "#0e7490",
  ];
  //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //lifrecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
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
    <>
      
      <Layout
      
      >
      <div className="grid sm:grid-cols-4  items-center justify-center grid-cols-2 gap-4 m-4">
        {data?.map((record, i) => (
          <Card.Grid
          
            className="text-white max-w-[250px] hover:scale-110 transition-all font-thin p-4 shadow-lg shadow-gray-400 rounded-lg"
            key={i}
            style={{  backgroundColor: `${colors[i]}` }}
          >
            <div className="card-body">
            <p className="text-white font-bold  ">{record.bloodGroup}</p>
            <motion.div
            initial={{
              width:0
            }}
            animate={{
              width:"100%"
            }}
            transition={{
              duration:0.5
            }}
            className="w-full border-b-2 border-gray-300 rounded-full "
            />
              <p className="card-text">
                Total In : <b>{record.totalIn}</b> (ML)
              </p>
              <p className="card-text">
                Total Out : <b>{record.totalOut}</b> (ML)
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Total Available : <b>{record.availabeBlood}</b> (ML)
            </div>
          </Card.Grid>
        ))}
      </div>
      <div className="overflow-x-scroll flex flex-col justify-center items-start m-2 ">
        <h1 className="font-bold">Recent Blood Transactions :</h1>
        <table >
          <thead >
            <tr>
              <th className="border-r-[2px] pr-1.5" scope="col">Blood Group</th>
              <th className="border-r-[2px] pr-1.5" scope="col">Inventory Type</th>
              <th className="border-r-[2px] pr-1.5" scope="col">Quantity</th>
              <th className="border-r-[2px] pr-1.5" scope="col">Donar Email</th>
              <th className="border-r-[2px] pr-1.5" scope="col">TIme & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td className="border-r-[2px] pr-1.5">{record.bloodGroup}</td>
                <td className="border-r-[2px] pr-1.5">{record.inventoryType}</td>
                <td className="border-r-[2px] pr-1.5">{record.quantity} (ML)</td>
                <td className="border-r-[2px] pr-1.5">{record.email}</td>
                <td className="border-r-[2px] pr-1.5">{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Layout>
    </>
  );
};

export default Analytics;
