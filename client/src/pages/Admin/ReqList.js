import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const ReqList = () => {
    const [data, setData] = useState([]);

    const getReqList = async () => {
        try {
            const { data } = await API.get("/blood-request/get-bloodRequest");
           // console.log(data);
          
                setData(data.data);
                console.log(data);
          
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getReqList();
    }, []);
    const handelDelete = async (id) => {
        try {
          let answer = window.prompt(
            "Are You Sure Want To Delete This Request",
            "Sure"
          );
          if (!answer) return;
          const { data } = await API.delete(`/blood-request/delete-bloodRequest/${id}`);
          alert(data?.message);
          window.location.reload();
        } catch (error) {
          console.log(error);
          window.location.reload();
        }
      };
    return (
        <Layout>
            <div className="min-h-screen w-screen border-2 border-red-600">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Blood Group</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((record) => (

                        <tr key={record._id}>
                            <td>{record.name}</td>
                            <td>{record.bloodGroup}</td>
                            <td>{record.phone}</td>
                            <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                            <td>
                                <button

                                    className="btn btn-danger"
                                    onClick={() => {
                                        
                                        handelDelete(record._id)
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                    }
                    
                </tbody>
            </table>
            </div>
        </Layout>

    )
}

export default ReqList