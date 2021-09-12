import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "./DashBoard";
import Home from "./routes/home/Home";

import Crm from "./routes/crm/Crm";
import EditTask from "./routes/crm/EditTask";
import EditContact from "./routes/crm/EditContact";
import ViewContact from "./routes/crm/ViewContact";
import AddTaskUser from "./routes/crm/AddTaskUser";
import Profile from  "./routes/profile/Profile"; 
import AddMember from  "./routes/add_member/AddMember"; 

import EditQuote from "./routes/crm/EditQuote";
import ViewQuote from "./routes/crm/ViewQuote";






const App = () => {
  return (
    <AuthProvider>
      <Router>

        
        <div className="App">
           <PrivateRoute exact path="/DashBoard" component={DashBoard} />
           <PrivateRoute exact path="/Crm" component={Crm} />
            <PrivateRoute exact path="/Crm/:crm_tab" component={Crm} />

           <PrivateRoute exact path="/add_task" component={EditTask} />
           <PrivateRoute exact path="/edit_task/:task_id" component={EditTask} />
           <PrivateRoute exact path="/add_task_user/:contact_id" component={AddTaskUser} />



           <PrivateRoute exact path="/add_contact" component={EditContact} />
           <PrivateRoute exact path="/edit_contact/:contact_id" component={EditContact} />
           <PrivateRoute exact path="/view_contact/:contact_id" component={ViewContact} />


           <PrivateRoute exact path="/add_quote" component={EditQuote} />
           <PrivateRoute exact path="/edit_quote/:quote_id" component={EditQuote} />
            <PrivateRoute exact path="/view_quote/:quote_id" component={ViewQuote} />
           
            <PrivateRoute exact path = "/profile" component={Profile} />
             <PrivateRoute exact path = "/members" component={AddMember} />

           <PrivateRoute exact path = "/" component={DashBoard} />



            <Route exact path="/" component={Login} />          
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />


        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
