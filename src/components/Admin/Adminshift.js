import DataTable from 'react-data-table-component';
import SortIcon from "@material-ui/icons/ArrowDownward";
import React,{useState,useEffect} from "react";
import Shiftmodal from "./Shiftmodal";

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








export default function Adminshift() {


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
  const [eventsData,setEventsData]=useState([]);
  let { eventId } = useParams();


  const initalState={
 
    description:"",
  
    startDate:"",
    startTime:"",
    endDate:"",
    endTime:"",
    eventId:""
   



  }

  const [apiData,setapiData]=useState([])
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
      name: "Id",
      cell:(row, index, column, id) => <Link  style={{ color:"blue" ,textDecoration:"underline"}}to={{pathname:`/admin/shiftposition/${row.id}`}}>{row.id}</Link>,
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
      name: "Event Name",
      selector: (row) => row.eventName,
      sortable: true,
      reorder: true,
      wrap:true
    },

   {
      id: 4,
      name: "Start Date And Time",
      selector: (row) => `${moment(row.startDate).format("DD/MM/YYYY")} ${row.startTime}`,
      sortable: true,
      right: true,
      reorder: true,
      wrap:true
    },
    {
      id: 5,
      name: "End Date And Time",
      selector: (row) => `${moment(row.endDate).format("DD/MM/YYYY")} ${row.endTime}`,
      sortable: true,
      right: true,
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

    axios.delete(`${process.env.REACT_APP_URL}/shift/${data[0].id}`).then(data=>{
      NotificationManager.success('SuccessFully Deleted', 'Success');

      setDeleted(!deleted);

    }).catch(err=>{
      console.log(err);
    })


  }

useEffect(() => {

  getData();
  getEvents()
 
}, [deleted])


function getData()
{

  if(!eventId)
  {

    setLoader(true)
    axios.get(`${process.env.REACT_APP_URL}/shift`).then(data=>{
      setLoader(false);
  
   setapiData(data["data"]);
    }).catch(err=>{
      console.log(err);
      setLoader(false);
  
    })
  }

  else{
    setLoader(true)
    axios.get(`${process.env.REACT_APP_URL}/shiftByEventID/${eventId}`).then(data=>{
      setLoader(false);
  
   setapiData(data["data"]);
    }).catch(err=>{
      console.log(err);
      setLoader(false);
  
    })
  }



}

function getEvents()
{
  
  if(!eventId)
  {
  setLoader(true)
  axios.get(`${process.env.REACT_APP_URL}/event`).then(data=>{
    setLoader(false);
    setEventsData(data["data"]);


  }).catch(err=>{
    console.log(err);
    setLoader(false);

  })

}

}


  const createNewRecord=()=>{

    
    setLoader(true)
    events.startDate=moment(startDate).format("YYYY-MM-DD");
    events.startTime=startTime;
    events.endDate=moment(endDate).format("YYYY-MM-DD");
    events.endTime=endTime;
    if(!events.eventId) events.eventId=eventId;
   debugger;
const check=Object.values(events).some(ele=>ele.length===0);

 if (check) {NotificationManager.error('All Fields Are Required','Error') ;setLoader(false);return}

    axios.post(`${process.env.REACT_APP_URL}/shift`,events).then(data=>{
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
    
    editedData.startDate=moment(editedData.startDate).format("DD/MM/YYYY");
    
    editedData.endDate=moment(editedData.endDate).format("DD/MM/YYYY");
    if(!editedData.eventId) editedData.eventId=eventId;

    
    axios.put(`${process.env.REACT_APP_URL}/shift`,editedData).then(data=>{
      console.log(data);
      NotificationManager.success('SuccessFully Edited', 'Success');
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
          

        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">

        
          
<button onClick={() => setShowModal(true)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Create New
</button>

     
<DataTable
title={apiData[0]?`${apiData[0].eventName} Shift List`:"Shift List"}
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

  <Shiftmodal  eventId={eventId} eventsData={eventsData}  isEdit={isEdit} editRecord={editRecord} data={editedData} handleChange={handleChange} setStartDate={setStartDateData} startDate={startDate} setStartTime={setStartTimeData} startTime={startTime} setEndDate={setEndDateData} endDate={endDate} setEndTime={setEndTimeData} endTime={endTime} createNewRecord={createNewRecord} setShowModal={setShowModal} showModal={showModal}/>
    </section>

     
    );
    }