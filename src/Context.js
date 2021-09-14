import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const { Provider } = AppContext;

export const AppProvider = (props) => {

  const [message, setMessage] = useState({
    loggedIn:false,
    role:""
  });

return(

   <Provider value={[message, setMessage]}>

      {props.children}

   </Provider>

 );

}