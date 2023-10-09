import React, { useEffect, useState, useRef } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";
import {
  Card,
  Form as Fm,
  AutoComplete,
  Calendar,
  Button,
  Spin,
  Modal,
  Input,
  ConfigProvider, Space, theme ,Radio 
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { auth, app } from "../../../firebase.js";

import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

import dayjs from "dayjs";


const FormComponent = ({ formType, submitBtn, formTitle,style }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("+880");
  const [divison, setDivison] = useState("");
  const [district, setDistrict] = useState();
  const [thana, setThana] = useState("");
  const [gender, setGender] = useState("m");
  const [occupation, setOccupation] = useState("");
  const [weight, setWeight] = useState("");
  const [dateofbirth, setDateofbirth] = useState(() => dayjs(Date.now()));
  const [verificationId, setVerificationId] = useState(null);
 const [loading,setLoading]=useState(false)
 const [loading2,setLoading2]=useState(false)
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  function initilizeCaptcha () {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,'recap', {
     
        app: app,
        size: 'invisible', // adjust as needed
        callback: () => {
         
        
        }
      })
      
    } catch (error) {
      console.log(error)
      
    }
   
    ;}
  useEffect(() => {
    initilizeCaptcha();
  }, []);

  // Initialize Firebase

  // Initialize Firebase Authentication and get a reference to the service

  const handleVerifyCode = async () => {
    await confirmationResult
      .confirm(verificationCode)
      .then((userCredential) => {
        setIsVerified(true)
        setLoading2(false)
        setOpen(false);
        const user = userCredential.user;
       // console.log("User signed in:", user);
      })
      .catch((error) => {
        console.error("Error verifying code:", error);
        setLoading2(false)
      });
  };
 
 
 
  const sendCode = async () => {
    setLoading(true)
    await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    )
      .then((res) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).

        // ...

        setConfirmationResult(res);
       // console.log(JSON.stringify(res));
        
//         Modal.info({
         
//          closable:true,
//           title: "Verify Your Phone Number",
//           okButtonProps: { style: { display: "none" }},
         
// footer:null,
//           content: (
//             <div>
//               <p>
//                 A verification code has been sent to your phone number. Please
//                 verify your phone number to continue.
                
//               </p>
//               <Input 
//               value={verificationCode}
//               onChange={(e)=>setVerificationCode(e)}

//               />
//               <button
//                 onClick={()=>{
//                   setLoading2(true)
//                   res.confirm(verificationCode)
//                   .then((userCredential) => {
//                   setLoading2(false)
//                   setIsVerified(true)
//                   }).error((error)=>{
//                     setLoading2(false)
//                     console.warn(error)
//                   })
//                 }}
//                 className="bg-red-600 mt-2 w-full  cursor-pointer text-white p-2 rounded-md hover:bg-gray-600 focus:bg-gray-800 transition-all flex flex-row justify-center items-center gap-2 ease-in-out focus:scale-90 "
//               > {loading2 && <Spin
//                 indicator={
//                   <LoadingOutlined
//                     className="text-white "
//                     style={{ fontSize: 18 }}
//                     spin
//                   />
//                 }
//               />}
//                 {" "}
//                 Verify
//               </button>
//             </div>
//           ),
//         });
        setLoading(false)
        setOpen(true);
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
        setLoading(false)
      });
  };

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
    <Space>
    <Card 
    className={` ${style} ` }
     
   
    >
      <Modal
      open={open}
       title= "Verify Your Phone Number"
       footer={null}
        closable={true}
        
       children={
          <div>
            <p>
              A verification code has been sent to your phone number. Please
              verify your phone number to continue. 
            </p>
            <Input
            onChange={(e)=>setVerificationCode(e.target.value)}
            />
            <button
              onClick={() => {
                setLoading2(true)
                handleVerifyCode();
              }}
              className="bg-red-600 mt-2 w-full  cursor-pointer text-white p-2 rounded-md hover:bg-gray-600 focus:bg-gray-800 transition-all flex flex-row justify-center items-center gap-2 ease-in-out focus:scale-90 "
            >{loading2 && <Spin
                              indicator={
                                <LoadingOutlined
                                  className="text-white "
                                  style={{ fontSize: 18 }}
                                  spin
                                />
                              }/>}
              {" "}
              Verify
            </button>
          </div>
        }

      />
      <Fm
       
       
       initialValues={{
         remember: true,
       }}
        className="flex flex-col justify-start w-[250px] h-full   "
        onSubmit={(e) => {
          console.log("submit");
          
            
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div  className="flex flex-row justify-between py-4">
          <Radio.Group
          defaultValue="donar"
          >
            <Radio
            
              
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
              autoFocus
            >Donor</Radio>
            
          
         
          
            <Radio 
             className="py-2"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            >Organisation</Radio>
            {formType === "admin-login" && (
              <Radio
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
              >Admin</Radio>
            )}
            </Radio.Group>
          
        </div>
        <div id='recap'></div>
        {/* switch statement */}
        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                  style={'absolute top-0 '}
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "admin-login": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                  style={'absolute top-0 '}
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      labelText={"Name"}
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText={"Organisation Name"}
                      labelFor={"fororganisationName"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                  style={'absolute top-0 '}
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                 
                  <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <div className="flex flex-row relative ">
                  <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    defaultValue={"+880"}
                    style={"rounded-r-none"}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Button
                   disabled={isVerified}
                   loading={loading}
                   type="primary"
                    htmlType="button"
                    size="middle"
                   className="bg-red-600 rounded-l-none absolute bottom-[24px] right-3"
                    onClick={() => {
                      sendCode();
                     // openModal();
                    }}
                   // className="bg-red-600 mb-2 cursor-pointer text-white px-4 py-2 rounded-lg focus:scale-90  focus:bg-gray-800 transition-all flex flex-row justify-center items-center gap-2 ease-in-out  "
                  >
                    {isVerified ? "Verified" : "Verify"}
                   
                  </Button>
                  <p
                  className="text-red-600 font-bold ml-6 "
                  >*</p>
                  </div>
                  Gender
                  <Radio.Group
                  className="my-4"
                    defaultValue={'m'}
                    onChange={(e)=>setGender(e.target.value)}
                    >
                        <Radio value={"m"}>Male</Radio>
                    <Radio value={"f"}>Female</Radio>
                    <Radio value={"o"}>Other</Radio>
                    </Radio.Group>
                  <InputType
                  style={'absolute top-0 '}
                    labelText={"Occupation"}
                    inputType={"text"}
                    name={"occupation"}
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                  <InputType
                    labelText={"Weight"}
                    inputType={"text"}
                    name={"weight"}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <div className="flex flex-row justify-between">
                  Date of Birth <div

                  className="border-2 rounded-lg px-2 cursor-pointer"
                  onClick={() => {
setShowCalendar(!showCalendar)
                  }}
                  >{dateofbirth.format("DD-MM-YYYY")}</div>
                  <p className="text-red-600 font-bold mx-2">*</p>
                  </div>
                {showCalendar ?  <div style={{ width: 282, height: 360 }} className="relative -ml-4  border-2 rounded-lg ">
                    <Calendar
                      fullscreen={false}
                      
                      className=" "
                      onSelect={(value) => setDateofbirth(dayjs(value))}
                      value={dateofbirth}
                      onPanelChange={(value, mode) => {
                        setDateofbirth(dayjs(value));
                      }}
                    />
                  </div>:null}
                  <div className=" flex flex-row items-center py-2">
                    <p className="mr-2">Division</p>
                    <AutoComplete
                    className="w-full"
                      options={options}
                      
                      onSelect={onSelect}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      placeholder="Division"
                    /><p className="text-red-600 font-bold mx-2">*</p>
                  </div>
                  {divison.length > 0 ? (<div>
                    <div className="flex flex-row items-center py-2">
                    <p className="mr-2"> District</p>
                      <AutoComplete
                        options={optionDist[district]}
                       className="w-full"
                        onSelect={onSelect}
                        filterOption={(inputValue, option) =>
                          option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        placeholder="District"
                      /><p className="text-red-600 font-bold mx-2">*</p>
                     
                    </div> <InputType
                        labelText={"Thana"}
                        labelFor={"forPhone"}
                        inputType={"text"}
                        name={"thana"}
                        value={thana}
                        onChange={(e) => setThana(e.target.value)}
                      /> </div>
                  ) : (
                    <p className="py-2">Select Division First!</p>
                  )}
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
        <Button
           // className="font-semibold border-2 p-1 my-2 px-2 focus:opacity-75 focus:bg-blue-200 transition-all border-blue-200 rounded-lg "
            type="primary"
            htmlType="submit"
           onClick={(e)=>{
            console.log("submit");
            if (formType === "login" || formType === "admin-login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              website,
              divison,
              district,
              thana,
              gender,
              occupation,
              weight,
              dateofbirth
            );

            
           }}
            className="bg-red-600 mb-2 cursor-pointer text-white px-4 py-2 rounded-lg focus:scale-90  focus:bg-gray-800 transition-all flex flex-row justify-center items-center gap-2 ease-in-out  "


          >
            {submitBtn}
          </Button>
          {formType === "login" ? (
            <p>
              Not registerd yet ?  <Link to="/register">
              <Button
              
              
                className="mx-2"
               // className="font-semibold border-2 p-1 focus:opacity-75 focus:bg-blue-200 transition-all border-blue-200 rounded-lg ml-2"
              >
               

                Register ! </Button></Link>
              
            </p>
          ) : (
            <p>
              
            </p>
          )}
          
        </div>
      </Fm>
    </Card>  </Space>
  </ConfigProvider>
  );
};

export default FormComponent;
