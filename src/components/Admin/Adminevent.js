import DataTable from 'react-data-table-component';
import SortIcon from "@material-ui/icons/ArrowDownward";
import Modal from 'react-modal';
import React,{useState,useEffect} from "react";
import Eventmodal from "./Eventmodal";

import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Loader from "react-loader-spinner";
import moment from "moment";
import _ from "lodash";


//import axios from 'axios';
import axios from '../../interceptors'; // importing axios from customAxios








export default function Adminevent() {


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

  const initalState={
    title:"",
    description:"",
    location:"",
    type:"",
    startDate:"",
    startTime:"",
    endDate:"",
    endTime:"",
    requiredOwner:""



  }

  const [movies,setMovies]=useState([])
  const [events,setEvents]=useState(initalState)


  // columns 

  const setStartDateData=(event)=>{

    if(isEdit)
    {
setEditData({...editedData,startDate:moment(event).format("YYYY-MM-DD")})
    }
    else{
      setStartDate(event)

    }
   
  }

  const setEndDateData=(event)=>{

    if(isEdit)
    {
setEditData({...editedData,endDate:moment(event).format("YYYY-MM-DD")})
    }
    else{
      setEndDate(event)

    }
   
  }


  const setStartTimeData=(event)=>{

    if(isEdit)
    {
setEditData({...editedData,startTime:event})
    }
    else{
      setStartTime(event)

    }
   
  }

  const setEndTimeData=(event)=>{


    if(isEdit)
    {
setEditData({...editedData,endTime:event})
    }
    else{
      setEndTime(event)

    }
   
  }

  const columns = [
    {
      id: 1,
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      reorder: true,
      wrap:true
   
    },
    {
      id: 2,
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      reorder: true,
      wrap:true
    },
    {
      id: 3,
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
      right: true,
      reorder: true
    },
    {
      id: 4,
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      right: true,
      reorder: true
    },{
      id: 5,
      name: "Start Date And Time",
      selector: (row) => `${moment(row.startDate).format("YYYY-MM-DD")} ${row.startTime}`,
      sortable: true,
      right: true,
      reorder: true,
      wrap:true
    },
    {
      id: 6,
      name: "End Date And Time",
      selector: (row) => `${moment(row.endDate).format("YYYY-MM-DD")} ${row.endTime}`,
      sortable: true,
      right: true,
      reorder: true,
      wrap:true
    },
   
    {
      id: 7,
      name: "Volunteer",
      selector: (row) => row.volunteerCount,
    
      sortable: true,
      right: true,
      reorder: true
    },
    {
      id:8,
      name:"Edit",
      cell:(row, index, column, id) => <PencilIcon onClick={()=>editData(row, index, column, id)} style={{cursor:"pointer"}} className="h-5 w-5 text-blue-500"/>,
      sortable: true,
      right: true,
      reorder: true
     
      
    },
    {
      id:9,
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

    axios.delete(`${process.env.REACT_APP_URL}/event/${data[0].event_id}`).then(data=>{
      NotificationManager.success('SuccessFully Deleted', 'Success');

      setDeleted(!deleted);

    }).catch(err=>{
      console.log(err);
    })


  }

useEffect(() => {

  getData()
 
}, [deleted])


function getData()
{
  setLoader(true)
  axios.get(`${process.env.REACT_APP_URL}/event`).then(data=>{
    setLoader(false);

 setMovies(data["data"]);
  }).catch(err=>{
    console.log(err);
    setLoader(false);

  })

}


  const createNewRecord=()=>{

    
    setLoader(true)
    events.startDate=moment(startDate).format("YYYY-MM-DD");
    events.startTime=startTime;
    events.endDate=moment(endDate).format("YYYY-MM-DD");
    events.endTime=endTime;
   
const check=Object.values(events).some(ele=>ele.length===0);

 if (check) {NotificationManager.error('All Fields Are Required','Error') ;setLoader(false);return}

    axios.post(`${process.env.REACT_APP_URL}/event`,events).then(data=>{
      console.log(data);
      NotificationManager.success('SuccessFully created', 'Success');
      setShowModal(false)
      setDeleted(!deleted);
      setEvents(initalState);


    }).catch(err=>{
      console.log(err);
      setIsOpen(false);

    })

  }

  const editRecord=()=>{
    
    setLoader(true)
    
    editedData.startDate=moment(editedData.startDate).format("YYYY-MM-DD");
    
    editedData.endDate=moment(editedData.endDate).format("YYYY-MM-DD");
    
    axios.put(`${process.env.REACT_APP_URL}/event`,editedData).then(data=>{
      console.log(data);
      NotificationManager.success('SuccessFully created', 'Success');
      setShowModal(false)
      setDeleted(!deleted);


    }).catch(err=>{
      console.log(err);
      setIsOpen(false);

    })

  }

  const handleChange=(event)=>{

    if(isEdit)
    {
      setEditData({...editedData,[event.target.name]:event.target.value})

    }
    else{
      setEvents({...events,[event.target.name]:event.target.value})

    }

  }

  function closeModal() {
    setIsOpen(false);
  }


    return (
        <section class="container mx-auto p-6 font-mono">
          <NotificationContainer/>

        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">

        
          
<button onClick={() => setShowModal(true)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Create New
</button>

     
<DataTable
title={"Event List"}
columns={columns}
data={movies}
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

  <Eventmodal  isEdit={isEdit} editRecord={editRecord} data={editedData} handleChange={handleChange} setStartDate={setStartDateData} startDate={startDate} setStartTime={setStartTimeData} startTime={startTime} setEndDate={setEndDateData} endDate={endDate} setEndTime={setEndTimeData} endTime={endTime} createNewRecord={createNewRecord} setShowModal={setShowModal} showModal={showModal}/>
    </section>

     
    );
    }