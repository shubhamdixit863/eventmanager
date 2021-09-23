import DataTable from 'react-data-table-component';
import SortIcon from "@material-ui/icons/ArrowDownward";
import React,{useState,useEffect} from "react";
import Adminvolunteermodal from "./Adminvolunteermodel";

import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Loader from "react-loader-spinner";
import moment from "moment";
import _ from "lodash";
import {

  Link,
  useParams
} from "react-router-dom";

//import axios from 'axios';
import axios from '../../interceptors'; // importing axios from customAxios








export default function Adminvolunteer() {


  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [loader,setLoader]=useState(false);
  const [deleted,setDeleted]=useState(false)
  const [validation,setValidation]=useState(false)

  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState('10:00');
  const [showModal, setShowModal] = React.useState(false);
  const [editedData,setEditData]=useState({})
  const [isEdit,setisEdit]=useState(false);
  const [shiftpositionData,setEventsData]=useState([]);
 
  let { shiftId } = useParams();


  const initalState={
 
    firstName:"",
    lastName:"",
    address1:"",
    address2:"",
    town:"",
    county:"",
    email:"",
    mobile:"",
    postcode:"",
   
   }

   const [shiftposition,setShiftPosition]=useState(initalState)

  const [apiData,setapiData]=useState([])

  const handleChange=(event)=>{
    if(!isEdit)
    {
      setShiftPosition({...shiftposition,[event.target.name]:event.target.value})

    }

    else{
      setEditData({...editedData,[event.target.name]:event.target.value})
    }
  }

  // columns 

const columns = [
   
  
    {
      id: 1,
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
      wrap:true
    },

    {
      id: 2,
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
      reorder: true,
      wrap:true
    },
   
    {
      id: 3,
      name: "LastName",
      selector: (row) => row.lastName,
      sortable: true,
      reorder: true,
      wrap:true
    },
    {
      id: 4,
      name: "Address1",
      selector: (row) => row.address1,
      sortable: true,
      reorder: true,
      wrap:true
    },

    {
      id: 5,
      name: "Address2",
      selector: (row) => row.address2,
      sortable: true,
      reorder: true,
      wrap:true
    },

    {
      id: 6,
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      reorder: true,
      wrap:true
    },
   
    {
      id: 7,
      name: "County",
      selector: (row) => row.county,
      sortable: true,
      reorder: true,
      wrap:true
    },
   
      
    {
      id: 8,
      name: "Postcode",
      selector: (row) => row.postcode,
      sortable: true,
      reorder: true,
      wrap:true
    },
      
    {
      id: 9,
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
      reorder: true,
      wrap:true
    },

    {
      id: 10,
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      reorder: true,
      wrap:true
    },

    
  
   
   
   
    {
      id:11,
      name:"Edit",
      cell:(row, index, column, id) => <PencilIcon onClick={()=>editData(row, index, column, id)} style={{cursor:"pointer"}} className="h-5 w-5 text-blue-500"/>,
      sortable: true,
      right: true,
      reorder: true
     
      
    },
    {
      id:12,
      name:"Delete",
      cell:(row, index, column, id) => <TrashIcon onClick={()=>deleteData(row, index, column, id)} style={{cursor:"pointer"}} className="h-5 w-5 text-blue-500"/>,
      sortable: true,
      right: true,
      reorder: true
     
      
    }
  
 
   
  ];




  const editData=(...data)=>{
    console.log(data);
    setEditData(data[0])
    setisEdit(true)
    
    setShowModal(true);


  }



  const deleteData=(...data)=>{
    setLoader(true);

    axios.delete(`${process.env.REACT_APP_URL}/volunteer/${data[0].id}`).then(data=>{
      NotificationManager.success('SuccessFully Deleted', 'Success');

      setDeleted(!deleted);

    }).catch(err=>{
      console.log(err);
    })


  }

useEffect(() => {

  getData();
 
 
}, [deleted])


function getData()
{


 
    setLoader(true)
    axios.get(`volunteer`).then(data=>{
      setLoader(false);
  
   setapiData(data["data"]);
    }).catch(err=>{
      console.log(err);
      setLoader(false);
  
    })
  



}



  const createNewRecord=()=>{

    
    setLoader(true)
    console.log(shiftposition);

    //shiftposition.shiftId=shiftId;
    const shiftPosition2=Object.assign({},shiftposition)
    delete shiftPosition2.address2;
    delete shiftPosition2.county;
    const check=Object.values(shiftPosition2).some(ele=>ele.length ===0);
    

 if (check) {NotificationManager.error('Please Fill The Required Fields','Error') ;setLoader(false);setValidation(true);return}

    axios.post(`${process.env.REACT_APP_URL}/volunteer`,shiftposition).then(data=>{
      console.log(data);
      NotificationManager.success('SuccessFully created', 'Success');
      setShowModal(false)
      setDeleted(!deleted);



    }).catch(err=>{
      console.log(err);
      setIsOpen(false);

    })

  }

  const editRecord=()=>{
    
    setLoader(true)
    

    if(!editedData.shiftId) editedData.shiftId=shiftId;

    
    axios.put(`${process.env.REACT_APP_URL}/volunteer`,editedData).then(data=>{
      console.log(data);
      NotificationManager.success('SuccessFully Edited', 'Success');
      setShowModal(false)
      setDeleted(!deleted);


    }).catch(err=>{
      console.log(err);
      setIsOpen(false);

    })

  }


  function closeModal() {
    setIsOpen(false);
  }


    return (
        <section class="container mx-auto p-6 font-mono">
          

        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">

        
          
<button onClick={() => setShowModal(true)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Create New
</button>

     
<DataTable
title={"Volunteer List"}
columns={columns}
data={apiData}
defaultSortFieldId={1}
sortIcon={<SortIcon />}
pagination

className="w-full"
/>

<Loader
        style={{position:"absolute" ,zIndex:"1000",marginTop:"100px" ,marginLeft:"550px"}}
        type="Bars"
        color="#00BFFF"
        height={100}
        width={100}
        visible={loader}
      />

    </div>
    </div>

  <Adminvolunteermodal  validation={validation}  isEdit={isEdit} editRecord={editRecord} data={editedData} handleChange={handleChange}  createNewRecord={createNewRecord} setShowModal={setShowModal} showModal={showModal}/>
    </section>

     
    );
    }