import React from 'react';
import { Redirect } from 'react-router'

class Logout extends React.Component {
    componentWillMount(){
        console.log('redirecting')
        delete window.localStorage.token

    }
    render() {
      return <Redirect to="/" />
    }
  }

export default Logout