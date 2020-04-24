import React, { Component } from 'react'
import axios from 'axios'
import Service from "../Service/Service";
import { Redirect } from 'react-router-dom';

class UserList extends Component {
    constructor(props)
    {
    super(props)
        this.state={
            UserDetails:[]
        };
    }

    onChangeisActive(e){
        console.log(e.target.value)
        const id={
            _id:e.target.value
        }
        Service.updateUser(id)
        .then(response =>{
            console.log(response.data);
            alert(response.data.user)
        }) 
        .catch(error=>{
            console.log(error);
        })
    }
    componentWillMount()
    {
        if(sessionStorage.getItem('user'))
        {
            const data =JSON.parse(sessionStorage.getItem('user'));
        if(data.isAdmin)
        {
            this.setState({ redirect:true});
            this.setState({ isAdmin:true});
        }
        }
     Service.getUsers()
        .then(response =>{
            console.log(response.data);
            this.setState({UserDetails: response.data})
        }) 
        .catch(error=>{
            console.log(error);
        })
    }
    renderUserData = () => {
        return this.state.UserDetails.map((user, index) => {
            const { _id,fname,lname,gender,birthdate,email,isActive,isAdmin} = user //destructuring

            if(!isAdmin)
            {
                return (
                    <tr key={_id}>
                         <td>{fname}</td>
                         <td>{lname}</td>
                         <td>{gender}</td>
                         <td>{birthdate}</td>
                         <td>{email}</td>
                         <td><input type="radio" name={_id}  value={_id} defaultChecked={isActive} onChange={this.onChangeisActive}/></td>
                         <td><input type="radio" name={_id}  value={_id} defaultChecked={!isActive} onChange={this.onChangeisActive} /></td>
                    </tr>
                )
            }            
        });
}


    render(){
        if(!this.state.Redirect && !this.state.isAdmin){
            return (<Redirect to={'/'}/>)
        }
    return(
        <div>
            <div><h3>User List</h3></div>
            <p>Welcome Admin</p>
            

            <table className="table table-striped" style={{marginTop:20}}>
            <div>
                    <form>
                        <center>
                            <table class="table table-striped ">
                                <tr>
                                    <th>First name</th>
                                    <th>Last Name</th>
                                    <th>Gender</th>
                                    <th>Birthdate</th>
                                    <th>Email Id</th>
                                    <th>isActive</th>
                                    <th>!isActive</th>
                                </tr>
                                {this.renderUserData()}
                            </table>
                        </center>
                    </form>
                </div>
            </table>
        </div>
    )
    }
}
export default UserList