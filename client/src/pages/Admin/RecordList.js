import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { Table,Button } from "antd";

const RecordList = () => {
    const [data, setData] = useState([]);
const ColumnData = [];
const columns = [
{
    title: 'Name',
    dataIndex: 'Type',
    key: 'Type',

},
{
title: 'Blood Group',
dataIndex: 'BloodGroup',
key: 'BloodGroup',
},
{
title: 'Phone',
dataIndex: 'Phone',
key: 'Phone',
},
{
    title: 'Date',
    dataIndex: 'Date',
    key: 'Date',
  },
{
title: 'Action',
dataIndex: 'Action',
key: 'Action',
}
]
    const getRecordList = async () => {
        try {
            const { data } = await API.get("/inventory/get-inventory");
           // console.log(data);
          data.inventory.map(
                                                  
                (record) => {
                  ColumnData.push({
                  key: record._id,
                  Type: record.Name,
                  BloodGroup: record.bloodGroup,
                  Phone: record.phone,
                  Date: moment(record.createdAt).format("DD/MM/YYYY hh:mm A"),
                  Action: <Button
                      className="bg-red-500 text-white"
                      onClick={() => handelDelete(record._id)}>Delete</Button>
                })
             }                                  
          )
                setData(ColumnData);
               
          
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getRecordList();
    }, []);
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
    return (
        <Layout>
           <Table 
            className="w-[90vw] bg-white  overflow-scroll"
           columns={columns} dataSource={data}  />
        </Layout>

    )
}

export default RecordList