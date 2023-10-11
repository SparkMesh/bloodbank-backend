import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/shared/Spinner";
import Layout from "../../components/shared/Layout/Layout";
import Modal from "../../components/shared/modal/Modal";
import ReqDroDown from "../../components/ReqDroDown";
import API from "../../services/API";
import moment from "moment";
import { Button,Grid,Table,ConfigProvider, Space,Modal as BloodReqModal, Input,Dropdown,AutoComplete } from "antd";

import DemoPie from "../../components/DemoPie";
import DemoArea from "../../components/DemoArea";
import DemoLiquid from "../../components/DemoLiquid";
import Calendar from "../../components/Calendar";
import Slider from "../../components/Slider";
import BarChart from "../../components/BarChart"


const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
 const [bloodReqOpen, setBloodReqOpen] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [ColumnData, setColumnData] = useState([]);
  const [isModal, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [divison, setDivison] = useState("");
  const [district, setDistrict] = useState();
  const [formDistrict, setFormDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [age, setAge] = useState("");
 const [weight, setWeight] = useState("");
  const [reason, setReason] = useState("");
  const [gender, setGender] = useState("");
  const [ReqBloodGroup, setReqBloodGroup] = useState("");
  const [quantity, setQuantity] = useState("");
const [ReqSubmitLoading, setReqSubmitLoading] = useState(false);
const [TotalEntry, setTotalEntry] = useState(0);
const [TotalEntryEachMonth, setTotalEntryEachMonth] = useState(null);
  const onSelect = (data) => {
    //console.log(optionDist);

    setDivison(data);
  };
  useEffect(() => {
    if (divison == "Rajshahi") {
      setDistrict(5);
    } else if (divison == "Barisal") {
      setDistrict(0);
    } else if (divison == "Chittagong") {
      setDistrict(1);
    } else if (divison == "Dhaka") {
      setDistrict(2);
    } else if (divison == "Khulna") {
      setDistrict(3);
    } else if (divison == "Mymensingh") {
      setDistrict(4);
    } else if (divison == "Rangpur") {
      setDistrict(6);
    } else if (divison == "Sylhet") {
      setDistrict(7);
    }
  }, [divison]);
  const options = [
    { value: "Rajshahi" },
    { value: "Dhaka" },
    { value: "Barisal" },
    { value: "Khulna" },
    { value: "Chittagong" },
    { value: "Sylhet" },
    { value: "Rangpur" },
    { value: "Mymensingh" },
  ];
  const optionDist = [
    [
      { value: "Barguna" },
      { value: "Barisal" },
      { value: "Bhola" },
      { value: "Jhalokati" },
      { value: "Patuakhali" },
      { value: "Pirojpur" },
    ],
    [
      { value: "Bandarban" },
      { value: "Brahmanbaria" },
      { value: "Chandpur" },
      { value: "Chittagong" },
      { value: "Comilla" },
      { value: "Cox's Bazar" },
      { value: "Feni" },
      { value: "Khagrachhari" },
      { value: "Lakshmipur" },
      { value: "Noakhali" },
      { value: "Rangamati" },
    ],
    [
      { value: "Dhaka" },
      { value: "Faridpur" },
      { value: "Gazipur" },
      { value: "Gopalganj" },
      { value: "Kishoreganj" },
      { value: "Madaripur" },
      { value: "Manikganj" },
      { value: "Munshiganj" },
      { value: "Narayanganj" },
      { value: "Narsingdi" },
      { value: "Rajbari" },
      { value: "Shariatpur" },
      { value: "Tangail" },
    ],
    [
      { value: "Bagerhat" },
      { value: "Chuadanga" },
      { value: "Jessore" },
      { value: "Jhenaidah" },
      { value: "Khulna" },
      { value: "Kushtia" },
      { value: "Magura" },
      { value: "Meherpur" },
      { value: "Narail" },
      { value: "Satkhira" },
    ],
    [
      { value: "Jamalpur" },
      { value: "Mymensingh" },
      { value: "Netrakona" },
      { value: "Sherpur" },
    ],
    [
      { value: "Bogra" },
      { value: "Chapainawabganj" },
      { value: "Joypurhat" },
      { value: "Naogaon" },
      { value: "Natore" },
      { value: "Pabna" },
      { value: "Rajshahi" },
      { value: "Sirajganj" },
    ],
    [
      { value: "Dinajpur" },
      { value: "Gaibandha" },
      { value: "Kurigram" },
      { value: "Lalmonirhat" },
      { value: "Nilphamari" },
      { value: "Panchagarh" },
      { value: "Rangpur" },
      { value: "Thakurgaon" },
    ],
    [
      { value: "Habiganj" },
      { value: "Moulvibazar" },
      { value: "Sunamganj" },
      { value: "Sylhet" },
    ],
  ];
  const items = [{
    key: '1',
    label: "O+",
  },
  {
    key: '2',
    label:"O-",
  },
  {
    key: '3',
    label:'A+',
  }
,
{
  key: '4',
  label:'A-',


},
{
  key: '5',
  label:'B+',

},
{
  key: '6',
  label:'B-',

},
{
  key: '7',
  label:'AB+',

},
{
  key: '8',
  label:'AB-',
},


]
  const [bloodGroup, setBloodGroup] = useState(items[0].label);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
   
  };
  
 
 
  //get function
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        setTotalEntry(data?.totalEntry);
        setTotalEntryEachMonth(data?.totalEntryEachMonth);
         console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(data.length==0){
    getBloodGroupData();}
  }, []);
  if(data.length==0){
    return <div
    className="w-screen h-screen flex justify-center items-center"
    ><Spinner/></div>
  }
  else
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
    <Layout
    

    >
      <div
      className="mt-[15px]"
      >
     
     
        <>
          <div className="flex flex-col justify-center items-center">
          <BloodReqModal
          open={bloodReqOpen}
          onCancel={()=>setBloodReqOpen(false)}
          okText={<p className=" text-white">Submit</p>}
          okButtonProps={{className:"  border-none hover:opacity-75 rounded-lg bg-red-600",type:"default",loading:ReqSubmitLoading}}
          title="Create New Blood Request"
          onOk={
           async ()=>{
              setReqSubmitLoading(true)
               await API.post("/blood-request/create-bloodRequest",{
                  user_id:user._id,
                  role:user.role,
                  bloodGroup:bloodGroup,
                  quantity:quantity,
                  divison:divison,
                  district:formDistrict,
                  thana:thana,

                  phone:phone,
                  address:address,
                  age:age,
                  weight:weight,
                  name:name,
                  reason:reason,
                  gender:gender, }
                )
                .then(()=>{
                  setReqSubmitLoading(false)
                  setQuantity("")
                  setDivison("")
                  setDistrict("")
                  setFormDistrict("")
                  setThana("")
                  setPhone("")
                  setAddress("")
                  setAge("")
                  setWeight("")
                  setName("")
                  setReason("")
                  setGender("")
                



                setBloodReqOpen(false)
                })
            }
          }
          >
 
 <div className="flex">
                Blood Group: &nbsp;
                <Dropdown
                
               
                menu={{items,
                  selectable: true,
                  //defaultSelectedKeys: ['1'],
                  onSelect: ({ item, key, keyPath, selectedKeys, domEvent  }) => {
                    
                    setBloodGroup(items[key-1].label)
                   
                  },

                }}
                
                //onChange={(e) => setBloodGroup(e.target.value)}
              >
               <Button>{bloodGroup}</Button>
              </Dropdown><p className="text-red-600 mx-2 font-bold"> * </p></div>
              <br/><p className="flex">
              Quantity (ml):  {"  "} <p className="text-red-600 mx-2 font-bold"> * </p></p>
              <Input
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}


              />
             
             <p className="flex">
             
            Name:  {"  "} <p className="text-red-600 mx-2 font-bold"> * </p></p>
             <Input
             placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
             
             />
             Age: {"  "}
              <Input
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              />
              Weight: {"  "}
              <Input
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              />
               <p className="flex">
             
               Reason: {"  "} <p className="text-red-600 mx-2 font-bold"> * </p></p>
              <Input
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              />
              <div className="pt-2">
              Gender: {"  "}
              
              <ReqDroDown setGender={setGender}/> </div>
            
              <p className="flex">
             
              Phone: {"  "} <p className="text-red-600 mx-2 font-bold"> * </p></p>
              <Input
              className="mb-2"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}

              />
             
              <p className="flex">
              Divison: {"  "} <p className="text-red-600 mx-2 font-bold"> * </p></p>
              <AutoComplete
                    className="w-[30%] mr-2"
                      options={options}
                      
                      onSelect={onSelect}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      placeholder="Division"
                    />
             
              <p className="flex">
             
              District: {"  "}<p className="text-red-600 mx-2 font-bold"> * </p></p>
              <AutoComplete
                        options={optionDist[district]}
                       className="w-[30%]"
                      //  onSelect={onSelect}
                      onSelect={(e) => {
                        console.log(e);
                        setFormDistrict(e);

                      }}
                        filterOption={(inputValue, option) =>
                          option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        placeholder="District"
                      /><br></br>
                      
                  
                   <p className="flex">
             
                   Thana: {"  "} <p className="text-red-600 mx-2 font-bold"> * </p></p>
              <Input
              placeholder="Thana"
              value={thana}
              onChange={(e) => setThana(e.target.value)}

              />
              
              <p className="flex">
             
              Address: {"  "} <p className="text-red-600 mx-2 font-bold"> * </p></p>
              <Input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}

              />

             

          </BloodReqModal>
          


          <div className="w-full flex mt-2 justify-center">
            <Button
            
              className="right-0 m-2 bg-white"
              onClick={() =>{setIsModalOpen(true)
              
              }}

            >
            
              Add Donor
            </Button>
            <Button
              className="right-0 m-2 bg-white"
              onClick={()=>{
               
setBloodReqOpen(true)
              
               
              }
            }
              >
              Add Blood Request
            </Button>
            </div>
            <div className="grid w-[80vw] h-90 mb-20 grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 items-center gap-8 m-2">
            <Slider/>
            <DemoPie bloodGroupData={data} />
         <DemoArea totalEntry={TotalEntry}/>
         <BarChart totalEntryEachMonth={TotalEntryEachMonth}/>
         <Calendar/>
        
        
            </div>
          

            <Modal isModal={isModal} showModal={showModal} handleOk={handleOk} handleCancel={handleCancel} />
          </div>
        </>
     
      </div>
    </Layout></Space>
  </ConfigProvider>
  );
};

export default HomePage;
