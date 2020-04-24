import React, { Component } from 'react'
import TaskList from './TaskList'
import { Redirect } from 'react-router-dom';

export class UserView extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            redirect:false,
            isAdmin:false
        }
        this.CreateTask=this.CreateTask.bind(this);
    }
    CreateTask(e)
    {
        this.props.history.push('/createtask');
    }
    componentWillMount(){
        if(sessionStorage.getItem('user'))
        {
            const data =JSON.parse(sessionStorage.getItem('user'));
        if(data.isAdmin === false)
        {
            this.setState({ redirect:true});
        }
        }
    }
    render() {
        if(this.state.redirect ===false){
            alert('Hello false')
            return (<Redirect to={'/'}/>)
        }
        if(this.state.isAdmin === true){
            alert('Hello true')
            return (<Redirect to={'/'}/>)
        }
        return (
            <div>
                <TaskList/>
                <button type="submit" className="btn btn-info" onClick={this.CreateTask}>Create Task</button>
            </div>
        )
    }
}

export default UserView
