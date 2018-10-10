import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Navigation extends Component {

  state = {
    loggedIn: false
  }
  componentDidMount(){
      if(window.localStorage.getItem('token') !== null){
          this.setState({...this.state, loggedIn: true});
      }
  }
  render() {
      if(this.state.loggedIn){

          return (
              <div className="nav">
            <nav>
            
              <Link to="/logout" >
              Logout
              </Link>
              
            </nav>
            <div className="clear" />
            </div>
          );
      }else{
          return ('')
      }
  }
}

export default Navigation;
