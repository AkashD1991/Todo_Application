import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Route} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import About from './components/About';
import Verify from './components/Verify';
import AdminView from './components/AdminView';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import UserView from './components/UserView';
import UserList from './components/UserList';
import EditTask from './components/EditTask';
import Graph from './components/Graph';


ReactDOM.render( 
<Router>
<App>
    <Route exact path="/" component={Home}/>
    <Route exact path="/signin" component={SignIn}/>
    <Route exact path="/signup" component={SignUp}/>
    <Route exact path="/about" component={About}/>
    <Route  path="/verify" component={Verify}/>
    <Route  path="/adminview" component={AdminView}/>
    <Route  path="/tasklist" component={TaskList}/>
    <Route path="/createtask" component={CreateTask}/>
    <Route path="/userview" component={UserView}/>
    <Route path="/userlist" component={UserList}/>
    <Route path="/edittask/:_id" component={EditTask}/>
    <Route path="/graph" component={Graph}/>
</App>
</Router>
, document.querySelector('#root'));

serviceWorker.unregister();