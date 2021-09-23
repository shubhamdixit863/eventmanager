import React,{useState,useContext} from 'react'
//import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import {AppContext} from "../Context"
import axios from './../interceptors'; // importing axios from customAxios
import auth from './Auth/auth';




function Login() {

  


  const [state,setState]=useState({
    username:"",
    password:""
  })
  let history = useHistory();
  const [message, setMessage] = useContext(AppContext);



  const [loader,setLoader]=useState(false);

  const handleChange=(event)=>{
    setState({...state,[event.target.name]:event.target.value})
  
  
  }
  const Login=()=>{
    setLoader(true);

    // process.env.REACT_APP_URL


    // axios.post //axios.get // axios.put //axios.delete
  
    axios.post(`/login`,{...state,role:"user"}).then(data=>{  // Axios Response

      setLoader(false);
      if(data["data"].success)
      {
        localStorage.setItem("token",data["data"].token);
        localStorage.setItem("role",data["data"].role)
        localStorage.setItem("volunteerName",data["data"].volunteerName)
        localStorage.setItem("volunteerUsername",data["data"].volunteerUsername)
        NotificationManager.success('Login Success' , 'Success',1000);
        if(data["data"].role=="admin")
        {
          history.push("/admin/event");
        }
        else{
          history.push("/event");
        }
      
        setMessage({...message,loggedIn:true,role:data["data"].role});

  
      }
  
      else{
        NotificationManager.error('Wrong username Or Password', 'Failed', 3000);
  
      }
    }).catch(err=>{
      console.log("Errorr--------")
      setLoader(false);

      console.log(err);
    })
  
  }
  


    return (
      <>

<Loader
        style={{position:"absolute" ,marginTop:"120px" ,marginLeft:"620px"}}
        type="Bars"
        color="#00BFFF"
        height={100}
        width={100}
        visible={loader}
      />

<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">





  <div className="max-w-md w-full space-y-8">
    <div>
      <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
    
    </div>
    <form className="mt-8 space-y-6" action="#" >
      <input type="hidden" name="remember" value="true"/>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" className="sr-only">Username</label>
          <input id="email-address"   name="username" onChange={handleChange} type="email" autocomplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
        </div>
        <div>
          <label for="password" className="sr-only">Password</label>
          <input id="password" name="password" onChange={handleChange} type="password" autocomplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
        </div>
      </div>

    

      <div>
        <button type="button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        
        onClick={Login}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
</>

    )
}

export default Login
