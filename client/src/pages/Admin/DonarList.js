import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { Button, Table } from "antd";
const DonarList = () => {
  const [data, setData] = useState([]);
  //find donar records
  const ColumnData = [];
  const columns = [
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',

  },
  {
  title: 'Phone',
  dataIndex: 'Phone',
  key: 'Phone',
  },
  {
    title: 'District',
    dataIndex: 'District',
    key: 'District',
  },
  {
    title: 'Address',
    dataIndex: 'Address',
    key: 'Address',
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
  ]
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
        console.log(data);
      if (data?.success) {
        data.donarData.map(
          (record) => {
            ColumnData.push({
            key: record._id,
            Name: record.name,
            Phone: record.phone,
            District: record.district,
            Address: record.address,
            TimeDate: moment(record.createdAt).format("DD/MM/YYYY hh:mm A"),
            Action: <Button
            className="bg-red-500 text-white"
            onClick={() => handelDelete(record._id)}>Delete</Button>

          })
        })
        setData(ColumnData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  //DELETE FUNCTION
  const handelDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You Sure Want To Delete This Donor",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Table
       className="w-[90vw] bg-white mx-5  overflow-scroll"
      columns={columns} dataSource={data} />
    </Layout>
  );
};

export default DonarList;
