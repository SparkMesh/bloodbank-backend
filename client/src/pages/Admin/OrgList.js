import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { Table,Button } from "antd";
const OrgList = () => {
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
  title: 'Email',
  dataIndex: 'Email',
  key: 'Email',
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
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      console.log(data);
      if (data?.success) {
        setData(data?.orgData);
        data.orgData.map(
        
          (record) => {

            ColumnData.push({
            key: record._id,
            Name: record.organisationName,
            Email: record.email,
            Phone: record.phone,
            Date: moment(record.createdAt).format("DD/MM/YYYY hh:mm A"),
            Action: <Button
            className="bg-red-500 text-white"
            onClick={() => handelDelete(record._id)}>Delete</Button>
          })
          }
          )
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
        "Are You SUre Want To Delete This Organisation",
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
      <Table className="w-[90vw] bg-white mx-5  overflow-scroll" columns={columns} dataSource={ColumnData} />
    </Layout>
  );
};

export default OrgList;
