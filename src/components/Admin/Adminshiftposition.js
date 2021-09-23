import DataTable from 'react-data-table-component';
import SortIcon from "@material-ui/icons/ArrowDownward";
import React,{useState,useEffect} from "react";
import Shiftpositionmodal from "./Shiftpositionmodal";

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








export default function Adminshiftposition() {


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
 
  let { shiftId } = useParams();


  const initalState={
 
    role:"",
    assigned:"",
    assignedUsername:""
   
   }

   const [shiftposition,setShiftPosition]=useState(initalState)

  const [apiData,setapiData]=useState([])

  const handleChange=(event)=>{
    if(!isEdit)
    {
      if(event.target.name=="assigned")
      {
        setShiftPosition({...shiftposition,[event.target.name]:event.target.selectedOptions[0].text,assignedUsername:event.target.value})
      }
      else{
        setShiftPosition({...shiftposition,[event.target.name]:event.target.value})

      }

    }

    else{
      if(event.target.name=="assigned")
      {
        setEditData({...editedData,[event.target.name]:event.target.selectedOptions[0].text

          ,assignedUsername:event.target.value})

      }

      else{
        setEditData({...editedData,[event.target.name]:event.target.value})

      }


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
      id:6,
      name:"Edit",
      cell:(row, index, column, id) => <PencilIcon onClick={()=>editData(row, index, column, id)} style={{cursor:"pointer"}} className="h-5 w-5 text-blue-500"/>,
      sortable: true,
      right: true,
      reorder: true
     
      
    },
    {
      id:7,
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

    axios.delete(`${process.env.REACT_APP_URL}/ShiftPosition/${data[0].id}`).then(data=>{
      NotificationManager.success('SuccessFully Deleted', 'Success',500);

      setDeleted(!deleted);

    }).catch(err=>{
      console.log(err);
    })


  }

useEffect(() => {

  getData();
  getVolunteers();
 
 
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


function getVolunteers()
{
  
  axios.get(`volunteer`).then(data=>{
 

 setVolunteers(data["data"]);
  }).catch(err=>{
    console.log(err);
  

  })

}

  const createNewRecord=()=>{

    
    setLoader(true)

    shiftposition.shiftId=shiftId;
    //const check=Object.values(shiftposition).some(ele=>ele.length===0);


 //if (check) {NotificationManager.error('All Fields Are Required','Error') ;setLoader(false);return}

    axios.post(`ShiftPosition`,shiftposition).then(data=>{
      console.log(data);
      NotificationManager.success('SuccessFully created', 'Success',500);
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
      NotificationManager.success('SuccessFully Edited', 'Success',500);
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