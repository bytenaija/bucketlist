import React, { Component } from 'react';
import { Redirect } from 'react-router'
import {Link} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import Navigation from './navigation'

class Login extends Component {

    img = 'data:image/jpeg;base64,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'
    BASE_URL = "https://brain-bucket-api.herokuapp.com/v1/";
    state = {
      email : '',
      password: '',
      error: null,
      loggedIn: false,
      bucketlist : []
    }
    componentWillMount(){
       
        if(window.localStorage.getItem('token') === null){
            this.setState({...this.state, loggedIn : false})
        }else{
            this.setState({...this.state, loggedIn : true}) 
        }
    }

    componentDidMount(){
      
        if(this.state.loggedIn){
            axios.get(`${this.BASE_URL}bucketlists/`,  { headers: { Authorization: `${window.localStorage.getItem('token')}` } })
            .then(data =>{
                console.log(data)
                if(data.data.success){
                  console.log(data.data)
                  this.setState({...this.state, bucketlist : data.data.bucketlist})
                  
                }
            })
        }
       
    }
 
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to='/login' />
    }
    return ( 
      <div className="Bucketslist">
      <Navigation />
        <header className="Bucket-header">
        <div className="header">
        <h1>BucketList App</h1>
        </div>

        <div className="buckets">
        <div className="bucket-list">
        {
          this.state.bucketlist.map(
            (bucket, index) => 
          <div className="bucket" key={bucket._id.toString()}>
          
          <Link to={{ pathname: '/bucketlists/' + bucket._id }}>
          
          <img src={this.img} alt="Bucket"/> 
          <li>{bucket.name}</li>
          </Link>
          </div>

          )
        }
        </div>
        </div>
        </header>

        <footer>
          &copy; Everistus Olumese
        </footer>
      </div>
    );
  }
}

export default Login;
