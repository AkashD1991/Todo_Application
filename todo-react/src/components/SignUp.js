import React, { Component } from 'react';
import Service from "../Service/Service";

export default class About extends Component {
    constructor(props){
        super(props)
        
        this.onChangeFirstName=this.onChangeFirstName.bind(this)
        this.onChangeLastName=this.onChangeLastName.bind(this)
        this.onChangeEmail=this.onChangeEmail.bind(this)
        this.onChangeGender=this.onChangeGender.bind(this)
        this.onChangeBirthdate=this.onChangeBirthdate.bind(this)
        this.onChangePassword=this.onChangePassword.bind(this)
        this.onChangeConfirmPassword=this.onChangeConfirmPassword.bind(this)
        this.onSubmit=this.onSubmit.bind(this)

        this.state = {
            fname:'',
            lname :'',
            email : '',
            gender:'',
            birthdate:'',
            password :'',
            cpassword :'',
            isAdmin:false,
	        isActive:false,
            code:Math.floor(Math.random()*100)+1+''+Math.floor(Math.random()*100)+1,
        }
    
    }
    onChangeFirstName(e){
        this.setState({
            fname:e.target.value
        })
    }

    onChangeLastName(e){
        this.setState({
            lname:e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    onChangeGender(e){
        this.setState({
            gender:e.target.value
        })
    }

    onChangeBirthdate(e){
        this.setState({
            birthdate:e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }
    
    onChangeConfirmPassword(e){
        this.setState({
            cpassword:e.target.value
        })
    }

    onSubmit= (e)=>{
        const newUser={
            fname:this.state.fname,
            lname:this.state.lname,
            email:this.state.email,
            gender:this.state.gender,
            birthdate:this.state.birthdate,
            password:this.state.password,
            cpassword:this.state.cpassword,
            isActive:this.state.isActive,
            isAdmin:this.state.isAdmin,
            code:this.state.code
        }
        console.log(newUser);
       const data= Service.RegisterUser(newUser)
       .then(res => {
           if(res.data.user)
           {
               alert(res.data.user)
               this.props.history.push('/verify');
           }
           else{
            alert(res.data.error)
           }
       })
        // .then(res => {
        //     console.log(res.data.user);
        //     alert(res.data.user)
        //     alert(res.data.user)
        //     console.log(res.data.status)
        //     this.props.history.push('/verify');
        // }).catch(error =>{
        //     console.log(error)
        //     alert(error.data.result.error)
        // })
            e.preventDefault();
    }
    render() {
 return (
         <div className = "container" >
         <div className = "col" >
          <form onSubmit = { this.onSubmit} >
          <label>Enter Your First Name :</label>
                <input type="text" className="form-control"
                                value={this.state.fname} 
                                onChange={this.onChangeFirstName}/><br></br>
            <label>Enter Your Last Name :</label>
                <input type="text" className="form-control"
                                value={this.state.lname} 
                                onChange={this.onChangeLastName}/><br></br>

            <label>Enter Your Email Id :</label>
                <input type="email" className="form-control"
                                value={this.state.email} 
                                onChange={this.onChangeEmail}/><br></br>

        <label>Gender</label> 
             <div>
            <input   id = "male"
                     name = "gender"
                     type = "radio"
                     value = "Male"
                     onChange = { this.onChangeGender }
            /> 
            <lable> Male </lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            </div>
             <div>
            <input  id = "female"
                    name = "gender"
                    type = "radio"
                    value = "Female"
                     onChange = { this.onChangeGender }
            /> 
            <lable>Female</lable> 
            </div> <br/>
            <label>Enter Birthdate :</label>
                <input type="date" className="form-control"
                                value={this.state.birthdate} 
                                onChange={this.onChangeBirthdate}/><br></br>
                <label>Enter Password :</label>
                <input type="password" className="form-control"
                                value={this.state.password} 
                                onChange={this.onChangePassword}/><br></br>

                <label>Enter Confirm Password :</label>
                <input type="password" className="form-control"
                                value={this.state.cpassword} 
                                onChange={this.onChangeConfirmPassword}/><br></br>

                <button className = "btn btn-primary" type = "submit" > SignUp </button>
                </form> 
                </div>
                </div>
            )
        }
}