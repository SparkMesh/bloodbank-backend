import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";
import { Table } from "antd";

const OrganisationPage = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const ColumnData = []
  const columns = [
    {
      title: 'Name',
      dataIndex: 'BloodGroup',
      key: 'BloodGroup',
    },
    {
      title: 'Phone',
      dataIndex: 'InventoryType',
      key: 'InventoryType',
    },
    {
      title: 'Email',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },
    
    {
      title: "District",
      dataIndex: "District",
      key: "District",

    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: 'Time & Date',
      dataIndex: 'TimeDate',
      key: 'TimeDate',
    }
  ];
  //find org records
  const getOrg = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-orgnaisation");
        //   console.log(data);
        if (data?.success) {
        
          data.inventory.map(
 
            (record) => {
              ColumnData.push({
              key: record._id,
              BloodGroup: record.organisationName,
              InventoryType: record.phone,
              Quantity: record.email,
              
              District: record.division,
              Address: record.address,
              TimeDate: moment(record.createdAt).format("DD/MM/YYYY hh:mm A")
            })
          }
          
          )
          setData(ColumnData);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-orgnaisation-for-hospital"
        );
        //   console.log(data);
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, []);

  return (
    <Layout>
      <Table 
            className="w-[90vw] bg-white mb-5  overflow-scroll"
            // pagination={
            //   {
            //     defaultCurrent:1, 
            //     total:50,
            //     showSizeChanger:true,
            //     showQuickJumper:true,

            //   }
            // }
            
            bordered columns={columns} dataSource={data} />
    </Layout>
  );
};

export default OrganisationPage;
