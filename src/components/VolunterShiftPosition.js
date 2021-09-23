import DataTable from 'react-data-table-component';
import SortIcon from "@material-ui/icons/ArrowDownward";
import React,{useState,useEffect} from "react";

import Shiftpositionmodal from "./ShiftPositionModel";
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import {NotificationManager} from 'react-notifications';
import Loader from "react-loader-spinner";
import moment from "moment";
import _ from "lodash";
import {

  Link,
  useParams
} from "react-router-dom";

//import axios from 'axios';
import axios from '../interceptors'; // importing axios from customAxios








export default function Volunteershiftposition() {


  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [loader,setLoader]=useState(false);
  const [deleted,setDeleted]=useState(false)

  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState('10:00');
  const [showModal, setShowModal] = React.useState(false);
  const [editedData,setEditData]=useState({})
  const [isEdit,setisEdit]=useState(false);
  const [shiftpositionData,setEventsData]=useState([]);
  const [volunteers,setVolunteers]=useState([]);
  const assignedUsername=localStorage.getItem("volunteerUsername");
 
  let { shiftId } = useParams();


  const initalState={
 
    role:"",
    assigned:"",
   
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
      cell:(row, index, column, id) => <Link  style={{ color:"blue" ,textDecoration:"underline"}}to={{pathname:`/admin/shiftposition/${row.id}`}}>{row.id}</Link>,
      sortable: true,
      reorder: true,
      wrap:true
    },
  
    {
      id: 2,
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      reorder: true,
      wrap:true
    },
   
    {
      id: 3,
      name: "Assigned",
      selector: (row) => row.assigned,
      sortable: true,
      reorder: true,
      wrap:true
    },


    {
      id:4,
      name:"Assign",
      cell:(row, index, column, id) =>  (row.assignedUsername==null || row.assignedUsername=="") ? <button type="button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        
      onClick={()=>editData(row, index, column, id)}
      >
     
       Assign YourSelf
      </button>:row.assignedUsername==assignedUsername?<button type="button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        
        onClick={()=>removeData(row, index, column, id)}
        >
       
         Remove YourSelf
        </button>:"Already Taken",
      sortable: true,
      right: true,
      reorder: true
     
      
    },
    

   
   
 
 
  
 
   
  ];




  const editData=(...data)=>{
    const editedData=data[0];
    setLoader(true)
  
    editedData.assigned=localStorage.getItem("volunteerName");
    editedData.assignedUsername=localStorage.getItem("volunteerUsername");
    axios.put(`ShiftPosition`,editedData).then(data=>{
      console.log(data);
      NotificationManager.success('SuccessFully Assigned', 'Success',500);
      setDeleted(!deleted);


    }).catch(err=>{
      console.log(err);
    

    })


  }


  const removeData=(...data)=>{
    const editedData=data[0];
    setLoader(true)
  
    editedData.assigned="";
    editedData.assignedUsername="";
    axios.put(`ShiftPosition`,editedData).then(data=>{
      console.log(data);
      NotificationManager.success('SuccessFully Removed', 'Success',500);

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

  if(!shiftId)
  {


  }

  else{
    setLoader(true)
    axios.get(`ShiftPositionByShiftId/${shiftId}`).then(data=>{
      setLoader(false);
  
   setapiData(data["data"]);
    }).catch(err=>{
      console.log(err);
      setLoader(false);
  
    })
  }



}


  const createNewRecord=()=>{

    
    setLoader(true)

    shiftposition.shiftId=shiftId;
    //const check=Object.values(shiftposition).some(ele=>ele.length===0);


 //if (check) {NotificationManager.error('All Fields Are Required','Error') ;setLoader(false);return}

    axios.post(`ShiftPosition`,shiftposition).then(data=>{
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

    
    axios.put(`ShiftPosition`,editedData).then(data=>{
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
 
 Add 
</button>


     
<DataTable
title={"ShiftPosition List"}
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
    <Shiftpositionmodal  volunteers={volunteers}  isEdit={isEdit} editRecord={editRecord} data={editedData} handleChange={handleChange}  createNewRecord={createNewRecord} setShowModal={setShowModal} showModal={showModal}/>

    </section>

     
    );
    }