import logo from './logo.svg';
import './App.css';
import Header from './components/Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login';

import Signup from './components/Signup';
import Shiftlist from './components/Shiftlist';
import Adminevent from './components/Admin/Adminevent';
import Modal from './components/Admin/Eventmodal';

import Adminshift from './components/Admin/Adminshift';
import Adminshiftposition from './components/Admin/Adminshiftposition';
import Adminvolunteer from './components/Admin/Adminvolunteer';
import Protectedroutes from './components/Auth/Protectedroutes';


function App() {
  return (
    <div className="App">

      <Router>
      <Header/>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}



        <Switch>

        <Protectedroutes exact path="/" component={(props)=><Shiftlist {...props}/>}  expectedRole="user" />




          <Route  exact path="/login">
            <Login/>
          </Route>

          <Route  exact path="/modal">
            <Modal/>
          </Route>

          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Protectedroutes exact path="/shiftlist" component={(props)=><Shiftlist {...props}/>}  expectedRole="user" />


        

          <Protectedroutes exact path="/admin/event" component={(props)=><Adminevent {...props}/>}  expectedRole="admin" />
          <Protectedroutes exact path="/admin/shift/:eventId?" component={(props)=><Adminshift {...props}/>}  expectedRole="admin"/>

          <Protectedroutes exact path="/admin/shiftposition/:shiftId" component={(props)=><Adminshiftposition {...props}/>} expectedRole="admin" />

          <Protectedroutes exact path="/admin/volunteer" component={(props)=><Adminvolunteer {...props}/>} expectedRole="admin" />

</Switch>
     
    </Router>
      
    </div>
  );
}

export default App;
