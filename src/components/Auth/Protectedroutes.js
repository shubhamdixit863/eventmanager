import React from 'react'

import {Route,Redirect} from 'react-router-dom';

import auth from './auth';

export default function Protectedroutes({component:Component,...rest}) {
    return (
       <Route
       {...rest}
       render={props=>{
           if(auth.isAuthenticated() && auth.checkRole(rest.expectedRole))
           {

            return <Component {...props} />
           }
else{
    return(
        <Redirect
        to={{
            pathname:"/login",
            state:{
                from:props.location
            }
    
        }}
        
        />

    )

  
   
}


        
       }}
       
       
       
       
       />
    )
}