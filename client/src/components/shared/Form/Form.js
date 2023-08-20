import React, { useEffect, useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";
import { Card,Form as Fm,AutoComplete } from "antd";
const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});
const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [divison,setDivison] = useState("")
  const [district,setDistrict] = useState()

  const options = [
    { value: 'Rajshahi'},
    { value: 'Dhaka' },
    { value: 'Barisal' },
    { value: 'Khulna' },
    { value: 'Chittagong' },
    { value: 'Sylhet' },
    { value: 'Rangpur' },
    { value: 'Mymensingh' },

  ];
  const optionDist = [
     [{ value:"Barguna"} ,  { value:"Barisal"} ,        { value:"Bhola"},   { value: "Jhalokati"},  { value:"Patuakhali"}, { value:"Pirojpur"}],
    [{ value:"Bandarban"} ,{ value:"Brahmanbaria"} ,  { value: "Chandpur"}, { value:"Chittagong"},{ value: "Comilla"},   { value: "Cox's Bazar"},{ value:"Feni"},     { value:"Khagrachhari"},{ value:"Lakshmipur"},{ value: "Noakhali"}, { value:"Rangamati"}],
      [{ value:"Dhaka"} ,    { value:"Faridpur"} ,      { value: "Gazipur"}, { value: "Gopalganj"}, { value: "Kishoreganj"},{ value:"Madaripur"}, { value: "Manikganj"},{ value:"Munshiganj"},  { value:"Narayanganj"},{ value:"Narsingdi"},{ value:"Rajbari"},{ value:"Shariatpur"},{ value:"Tangail"}],
     [{ value:"Bagerhat"} , { value:"Chuadanga"} ,    { value:  "Jessore"}, { value: "Jhenaidah"}, { value: "Khulna"},    { value: "Kushtia"},    { value:"Magura"},  { value: "Meherpur"},   { value: "Narail"},   { value:  "Satkhira"}],
   [{ value:"Jamalpur"} , { value: "Mymensingh"} ,     { value:"Netrakona"},{ value:"Sherpur"}],
      [{ value:"Bogra"},    { value:"Chapainawabganj"},{ value:"Joypurhat"},{ value:"Naogaon"},    { value:"Natore"},     { value:"Pabna"},      { value:"Rajshahi"}, { value:"Sirajganj"}],
      [{ value:"Dinajpur"} , { value:"Gaibandha"} ,      { value:"Kurigram"}, { value:"Lalmonirhat"},{ value:"Nilphamari"}, { value:"Panchagarh"}, { value:"Rangpur"},  { value:"Thakurgaon"}],
       [{ value:"Habiganj"} , { value:"Moulvibazar"} ,   { value: "Sunamganj"},{ value:"Sylhet"}]
  ]
  
  
  const onSelect = (data) => {
    console.log(optionDist)
    
    setDivison(data)
   
    
   
  
    
   
    
  };
  useEffect(()=>{
    
    if(divison == "Rajshahi")
    {
      setDistrict(5)
    }
    else if(divison == "Barisal"){
setDistrict(0)
    }
    else if(divison == "Chittagong"){
      setDistrict(1)
          }
          else if(divison == "Dhaka"){
            setDistrict(2)
                }
                else if(divison == "Khulna"){
                  setDistrict(3)
                      }
                      else if(divison == "Mymensingh"){
                        setDistrict(4)
                            }
                            else if(divison == "Rangpur"){
                              setDistrict(6)
                                  }
                                  else if(divison == "Sylhet"){
                                    setDistrict(7)
                                        }
  },[divison])
 
  return (
    <Card>
      <form
      className="flex flex-col gap-4"
        onSubmit={(e) => {
          if (formType === "login")
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
              district
            );
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="flex flex-row">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="adminRadio" className="ml-2">
              Donar
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="ml-2">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="ml-2">
              Hospital
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="ml-2">
              Organisation
            </label>
          </div>
        </div>
        {/* switch statement */}
        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
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
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelText={"website"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div>
                  Division :  {"  "}
                   <AutoComplete
                   
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="Division"
      />
                  </div>
                  
                 {divison.length>0?<div>
                  District :  {"  "}
                   <AutoComplete
                   
        options={optionDist[district]}
        style={{ width: 200 }}
        onSelect={onSelect}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="District"
      />
                  </div>:<p>Select Division First!</p> } 
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not registerd yet ? Register
              <Link to="/register" className="font-semibold border-2 p-1 focus:opacity-75 focus:bg-blue-200 transition-all border-blue-200 rounded-lg ml-2"> Here !</Link>
            </p>
          ) : (
            <p>
              Already A User, Please
              <Link className="font-semibold border-2 p-1 px-2 focus:opacity-75 focus:bg-blue-200 transition-all border-blue-200 rounded-lg ml-2" to="/login"> Login !</Link>
            </p>
          )}
          <button className="font-semibold border-2 p-1 mt-2 px-2 focus:opacity-75 focus:bg-blue-200 transition-all border-blue-200 rounded-lg " type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Form;
