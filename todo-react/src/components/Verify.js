import React, { Component } from 'react';
import Service from "../Service/Service";


export default class Verify extends Component {

  constructor(props){
    super(props)
    this.onChangeEmail=this.onChangeEmail.bind(this)
    this.onChangeCode=this.onChangeCode.bind(this)
    this.state={
      email : '',
      code :'',
      messgae:null
    }
  }

  onChangeEmail(e){
    this.setState({
        email:e.target.value
    })
}

onChangeCode(e){
  this.setState({
      code:e.target.value
  })
}

onSubmit= (e)=>{
    const user={
        email:this.state.email,
        code:this.state.code,
    }
    console.log(user);
    Service.VerifyUser(user)
    .then(res => {
    if(res.data.error){
      alert(res.data.error);
     return this.props.history.push('/verify');
    }else{
      alert(res.data.user);
      return this.props.history.push('/signin');
    }
    })
        e.preventDefault();
}

  render() {
    return (
      <div className = "container" >
            
      <div className = "col" >
       <form onSubmit = { this.onSubmit} >
       <label>Enter Your Email :</label>
             <input type="text" className="form-control"
                             value={this.state.email} 
                             onChange={this.onChangeEmail}/><br></br>
         <label>Enter Verification Code :</label>
             <input type="password" className="form-control"
                             value={this.state.code} 
                             onChange={this.onChangeCode}/><br></br>
                             <button className = "btn btn-primary" type = "submit" >Verify</button>
                </form> 
                </div>
                </div>
    )
  }
}
