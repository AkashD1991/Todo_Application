import React, { Component } from 'react'
import TaskList from './TaskList'
import { Redirect } from 'react-router-dom';


export class AdminView extends Component {
    constructor(props)
    {
    super(props)
    this.state={
        redirect:false,
        isAdmin:false
    }
    this.UserTask=this.UserTask.bind(this);
    this.CreateTask=this.CreateTask.bind(this);
    }

    UserTask(e)
    {
        this.props.history.push('/userlist');
    }
    CreateTask(e)
    {
        this.props.history.push('/createtask');
    }

    componentWillMount(){

        if(sessionStorage.getItem('user'))
        {
            const data =JSON.parse(sessionStorage.getItem('user'));
        if(data.isAdmin)
        {
            this.setState({ redirect:true});
            this.setState({ isAdmin:true});
        }
        }
    }

    render() {

        if(!this.state.Redirect && !this.state.isAdmin){
                alert('hello')
            return (<Redirect to={'/'}/>)
        }
        return (
            <div>
                <button type="submit" className="btn btn-success" onClick={this.UserTask}>User List</button>
                <button type="submit" className="btn btn-info" onClick={this.CreateTask}>Create Task</button>
                <TaskList/>                
            </div>
        )
    }
}

export default AdminView
