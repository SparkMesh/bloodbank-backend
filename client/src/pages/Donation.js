import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { useSelector } from "react-redux";
import { Table,Button } from "antd";
const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const ColumnData = [];
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
      title: 'Last Donated (month)',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },
    {
      title: 'Donor Phone',
      dataIndex: 'DonarEmail',
      key: 'DonarEmail',
    },
    {
      title: 'Time & Date',
      dataIndex: 'TimeDate',
      key: 'TimeDate',
    },
    {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',
    }
  ];
  const postObject =
  user.role === "donar" ?
  {
   
    filters: {
      inventoryType: "in",
      donar: user?._id,
     
    }
  } : {

    filters: {
      inventoryType: "in",
      organisation: user?._id,
     
    }
  }

  //find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", postObject);
      if (data?.success) {
        // setData(data?.inventory);\
         console.log(data.inventory);
        data.inventory.map(
 
           (record) => {
             ColumnData.push({
             key: record._id,
             BloodGroup: record.bloodGroup,
             InventoryType: record.inventoryType,
             Quantity: record.lastDonateMonth,
             DonarEmail: record.phone,
             TimeDate: moment(record.createdAt).format("DD/MM/YYYY hh:mm A"),
             Action: <Button
             className="bg-red-500 text-white"
             onClick={() => handelDelete(record._id)}>Delete</Button>
           })
         }
         
         )
         setData(ColumnData);
        
       }
    } catch (error) {
      console.log(error);
    }
  };
  const handelDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You Sure Want To Delete This Request",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/inventory/delete-inventory/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  };
  useEffect(() => {
    getDonars();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
      <Table 
            className="w-[90vw] bg-white   overflow-scroll"
            // pagination={
            //   {
            //     defaultCurrent:1, 
            //     total:50,
            //     showSizeChanger:true,
            //     showQuickJumper:true,

            //   }
            // }
            
            bordered columns={columns} dataSource={data} />
      </div>
    </Layout>
  );
};

export default Donation;
