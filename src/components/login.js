import React, { Component } from 'react';
import { Redirect } from 'react-router'
import {Link} from 'react-router-dom'
import './App.css';
import axios from 'axios'

class Login extends Component {
  BASE_URL = "https://brain-bucket-api.herokuapp.com/v1/";
  state = {
    email : '',
    password: '',
    error: null,
    loggedIn: false
  }
  emailEnter(text) {
    this.setState({email: text.target.value});
  }

  passwordEnter(text) {
    this.setState({password: text.target.value});
  }

  submit(event){

    event.preventDefault()
    var payload = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post(`${this.BASE_URL}auth/login`, payload).then(data =>{
      if(data.data.success){
        window.localStorage.setItem('token', 'Bearer ' +  data.data.token);
        this.setState({...this.state, loggedIn : true})
        
      }else{
        this.setState({...this.state, error : data.data.message})
      }
    })
    
    
  }
  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to='/' />
    }
    return (
      <div className="App">
        <header className="App-header">
        <div className="header">
        <h1>BucketList App</h1>
        </div>
          <div className="login">
          <form id="login">
          <h3>Login</h3>
          <input className="form-control" name="email" placeholder="email@gmail.com" type= "text" onKeyUp={text => this.emailEnter(text)}/>
          <input className="form-control" name="password" placeholder="Password" type= "password" onKeyUp={text => this.passwordEnter(text)}/>
          <button onClick ={(event, action) => this.submit(event)} >Login</button>
          </form>
          </div>
          <div className="signup">
          <h3>Get Started by Signing up<Link to="/signup"> here</Link> </h3>
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
