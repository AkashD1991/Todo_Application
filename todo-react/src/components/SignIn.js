import React, { Component } from 'react';
import Service from "../Service/Service";
import { Redirect } from 'react-router-dom';

export default class SignIn extends Component {

  constructor(props){
    super(props)
    this.onChangeEmail=this.onChangeEmail.bind(this)
    this.onChangePassword=this.onChangePassword.bind(this)
    this.state={
      email : '',
      password :'',
      data:{},
    }
  }

  onChangeEmail(e){
    this.setState({
        email:e.target.value
    })
}

onChangePassword(e){
  this.setState({
      password:e.target.value
  })
}

onSubmit= (e)=>{
  const user={
    email:this.state.email,
    password:this.state.password,
}
 Service.LoginUser(user)
.then(res => {
    // alert(res.data.user)
    // console.log(res.data.user)
    if(res.data.errorEmail)
    {
      alert(res.data.errorEmail);
     return this.props.history.push('/signin');
    
    }else if(res.data.errorPassword){
      alert(res.data.errorPassword);
      return this.props.history.push('/signin');
    }
    else{
      this.setState({ data : res.data.user})
      const userData={
        isAdmin:this.state.data.isAdmin,
        Token:res.data.Token
      }
      sessionStorage.setItem('user',JSON.stringify(userData));
      if(this.state.data.isAdmin){
        
        alert(`Welcome Admin ${this.state.data.fname}`)
          this.props.history.push('/adminview');
         }
      else{
          alert(`Welcome User ${this.state.data.fname}`)
          this.props.history.push('/userview');
         }
    }
})
    e.preventDefault();
}

  render() {

    // if(this.state.Redirect && this.state.data.isAdmin){
    //     return (<Redirect to={'/adminview'}/>)
    // }
    // if(this.state.Redirect && !this.state.data.isAdmin){
    //   return (<Redirect to={'/userview'}/>)
    // }
    return (
      <div className = "container" >
            
      <div className = "col" >
       <form onSubmit = { this.onSubmit} >
       <label>Enter Your Email :</label>
             <input type="text" className="form-control"
                             value={this.state.email} 
                             onChange={this.onChangeEmail}/><br></br>
         <label>Enter Your Password :</label>
             <input type="password" className="form-control"
                             value={this.state.password} 
                             onChange={this.onChangePassword}/><br></br>
                             <button className = "btn btn-primary" type = "submit" > Sign In </button>
                </form> 
                </div>
                </div>
    )
  }
}
