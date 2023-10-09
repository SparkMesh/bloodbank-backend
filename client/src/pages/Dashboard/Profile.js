import {Form , Button,ConfigProvider,Space,Input, AutoComplete,Calendar, Radio} from 'antd';
import React, { useCallback,useEffect,useState } from 'react';
import Layout from "./../../components/shared/Layout/Layout";
import dayjs from 'dayjs';
import API from '../../services/API';
import { useSelector } from 'react-redux';
const Profile = () => {
    const {user} = useSelector(state=>state.auth);
    const [divison, setDivison] = useState("");
    const [district, setDistrict] = useState(user?.district);
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth);
    const [dayjsofBirth, setDayjsofBirth] = useState('');
    const [name, setName] = useState(user?.name);
    const [organisationName, setOrganisationName] = useState(user?.organisationName);
    const [hospitalName, setHospitalName] = useState(user?.hospitalName);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState(user?.address);
    const [thana, setThana] = useState(user?.thana);
    const [weight, setWeight] = useState(user?.weight);
    const [gender,setGender] = useState(user?.gender);
   const [occupation, setOccupation] = useState(user?.occupation);
    const [divisons, setDivisons] = useState(user?.divison);
    const [loading, setLoading] = useState(false);


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
        { value: "Barisal" },
        { value: "Chittagong" },
        { value: "Dhaka" },
       
        { value: "Khulna" },
        { value: "Mymensingh" },
        { value: "Rajshahi" },
        { value: "Rangpur" },
        { value: "Sylhet" },
      
        
       
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
   
    return (
        <Layout><div className='min-h-screen mt-[80px]  m-6 flex flex-col justify-center items-center'>
            <Form>
                <Form.Item
                label='Name'
                name='name'
                
                >
                    <Input
                    defaultValue={user?.name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                label='Email'
                name='email'
               
                >
                    <Input
                    defaultValue={user?.email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                label='Phone'
                name='phone'

              
                >
                    <Input
                    defaultValue={user?.phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                label='Password'
                name='password'
               
                >
                    <Input
                    defaultValue={"********"}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                label='Address'
                name='address'
            
                >
                    <Input
                    defaultValue={user?.address}
                    onChange={(e)=>setAddress(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                label='Divison'
                name='divison'
             
                >
                   <AutoComplete
                    className="w-[30%]"
                      options={options}
                      
                      onSelect={onSelect}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      defaultValue={options[user?.district].value}
                    />
                </Form.Item>
                <Form.Item
                label='District'
                name='district'
              
                >
                     <AutoComplete
                    className="w-[30%]"
                      onSelect={(e) => setDivisons(e)}
                        options={optionDist[district]}
                        filterOption={(inputValue, option) =>
                            option.value

                                .toUpperCase()  
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        defaultValue={user?.divison}
                    />
                </Form.Item>
                <Form.Item
                label='Thana'
                name='thana'
                
               
                >
                    <Input
                    defaultValue={user?.thana}
                    onChange={(e)=>setThana(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                label='Occupation'
                name='occupation'
                >

                    <Input
                    defaultValue={user?.occupation}
                    onChange={(e)=>setOccupation(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                label='Weight'
                name='weight'
              
                >
                    <Input
                    defaultValue={user?.weight}
                    onChange={(e)=>setWeight(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                label='Gender'
                name='gender'
                
                >
                    <Radio.Group
                    defaultValue={user.gender}
                    onChange={(e)=>setGender(e.target.value)}
                    >
                        <Radio value={"m"}>Male</Radio>
                    <Radio value={"f"}>Female</Radio>
                    <Radio value={"o"}>Other</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                label='Date of birth'
                name='dateOfBirth'
               
                >
                    <Calendar
                    style={{ width: 282, height: 360 }}
                    fullscreen={false}
                    onChange={(e)=>setDayjsofBirth(dayjs(e.target.value))}
                    defaultValue={dayjs(dateOfBirth)}
                    value={dayjs(dateOfBirth)}

                    />
                </Form.Item>

                    



                
            </Form>
                    <Button
                    loading={loading}
                    onClick={async()=>{
                    setLoading(true);
                    try {
                    const {data} = await API.post('/auth/update-user',{
                      



                      name,
                      divison:divisons,
                        organisationName,
                        hospitalName,
                        email,
                        phone,
                        password,
                        address,
                        thana,
                        weight,
                        gender,
                        occupation,
                       
                        district,
                        dayjsofBirth
                    })
                  console.log(data)
                  } catch (error) {
                        console.log(error)
                    }
                    setLoading(false);
                    }}
                   className='bg-red-600'
                    type="primary">Update</Button></div>
        </Layout>
             
    );
}

export default Profile;