import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Header extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            redirect:false
        }
        this.signout=this.signout.bind(this);
    }
    // componentDidUpdate(){
    //     alert('component update')
    //     if(sessionStorage.getItem('user'))
    //     {
    //         const data =JSON.parse(sessionStorage.getItem('user'));
    //         this.setState({ redirect:true});
    //     }
    // }
    signout()
    {
        sessionStorage.setItem('user','');
        sessionStorage.clear();
        this.setState({redirect:false})
    }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Todo Application</Link>
          <div className="colllapse navbar-collapse">
          
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <Link className="nav-link" to="/about">About</Link>
                  </li>
              </ul>
              {!this.state.redirect ?
              <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item">
                      <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/signin">Sign In</Link>
                  </li></ul>:<div></div>}
                  {this.state.redirect?
                  <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item">
                      <Link className="nav-link" to={this.signout}>Sign Out</Link>
                  </li></ul> :<div></div>}
          </div>
      </nav>
    )
  }
}
