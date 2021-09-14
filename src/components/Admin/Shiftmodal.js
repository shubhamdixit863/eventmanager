import React from "react";
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import constants from '../../constants/constants';
import moment  from "moment";


export default function Modal({isEdit,eventsData,data,handleChange,editRecord,setStartDate,startDate,setStartTime,startTime,setEndDate,endDate,setEndTime,endTime,createNewRecord,setShowModal,showModal}) {
  return (
    <>
     
      {showModal ? (
        <>
        <div
            className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-xl " style={{width:"600px"}}>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    {isEdit? <h3 className="text-3xl font-semibold">

Edit Shift                  </h3>: <h3 className="text-3xl font-semibold">

New Shift                  </h3>}
                 
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto" style={{
      maxHeight: 'calc(100vh - 210px)',
      overflowY: 'auto'
     }}>



                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="Location">

                Events
                </label>
                
                <select  value={data.type}  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  name="eventId" onChange={handleChange} >

                  {
                    eventsData.map(ele=>(
                      <option value={ele.event_id}>{ele.title}</option>
                     

                    ))
                  }

</select>
          </div>
    
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="Description">
                Description

                </label>
            <input value={data.description}  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  name="description" onChange={handleChange}  type="text" placeholder="Description"/>
          </div>

       

       

          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="Location">

Start Date
</label>
          <DatePicker
          format={"yyyy-MM-dd"}
        onChange={setStartDate}
        value={isEdit?new Date(data.startDate):startDate}
      />
          </div>

          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="Location">

Start Time
</label>
<TimePicker
        onChange={setStartTime}
        value={isEdit?data.startTime:startTime}
      />
          </div>

          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="Location">

End Date
</label>
          <DatePicker
          format={"yyyy-MM-dd"}
        onChange={setEndDate}
        value={isEdit?new Date(data.endDate):endDate}
      />
          </div>

          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="Location">

End Time
</label>
<TimePicker
        onChange={setEndTime}
        value={isEdit?data.endTime:endTime}
      />
          </div>


    


         
        </p>
        
        </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {
                    isEdit?      <button onClick={editRecord} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Edit Shift   </button>:      <button onClick={createNewRecord} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Create Shift  </button>
                  }
            
          
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}