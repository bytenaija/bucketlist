import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login';
import BucketList from './components/BucketList';
import Bucket from './components/Bucket';
import Logout from './components/logout';
import Signup from './components/signup';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route } from 'react-router-dom'

ReactDOM.render(
<HashRouter>
<div>
        <Route exact path="/" component={BucketList} />
        <Route name="bucketlist" exact strict path="/bucketlists/:id" component={Bucket} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/logout" component={Logout} />
      </div>
</HashRouter>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
