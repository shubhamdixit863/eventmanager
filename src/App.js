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

function App() {
  return (
    <div className="App">

      <Router>
      <Header/>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>


          <Route path="/signup">
            <Signup/>
          </Route>
         

          <Route path="/shiftlist">
            <Shiftlist/>
          </Route>
        </Switch>
     
    </Router>
      
    </div>
  );
}

export default App;
