import React, { Component } from 'react'
import Service from "../Service/Service";
import { Redirect } from 'react-router-dom';

class TaskList extends Component {
    constructor(props)
    {
    super(props)
    this.editCurrentTask=this.editCurrentTask.bind(this);
        this.state={
            UserTaskDetails:[],
            redirect:false
        };
    }

    editCurrentTask(e)
    {
          const  _id=e.target.value
        console.log('id',_id)
         this.props.history.push(`/edittask/${e.target.value}`);
    }

    componentWillMount()
    {
    
        if(sessionStorage.getItem('user'))
        {
            const data =JSON.parse(sessionStorage.getItem('user'));
            this.setState({ redirect:true});
        }
        const data= Service.getTasks()
        .then(response =>{
                this.setState({UserTaskDetails: response.data})
            }) 
            .catch(error=>{
                console.log(error);
            })
    }
    renderTaskData = () => {
        return this.state.UserTaskDetails.map((task, index) => {
            const { _id,title, description,completed } = task //destructuring


            return (
                <tr key={_id}>
                    <td>{title}</td>
                    <td>{description}</td>
                    <td><input type="checkbox"  value={_id} defaultChecked={completed} disabled/></td>
                    <td><button type="button" className="btn btn-info" value={_id} onClick={this.editCurrentTask}>Edit</button></td>
                </tr>
            )
        });
}

    render(){
        if(this.state.redirect === false){
            return (<Redirect to={'/'}/>)
        }
    return(
        <div>
            <h3>Task List</h3>
            <table className="table table-striped" style={{marginTop:20}}>
            <div>
                    <form>
                        <center>
                            <table class="table table-striped ">
                                <tr>
                                    <th>Title</th>
                                    <th>Discription</th>
                                    <th>Completed</th>
                                    <th>Edit</th>
                                </tr>
                                {this.renderTaskData()}
                            </table>
                        </center>
                    </form>
                </div>
            </table>
        </div>
    )
    }
}
export default TaskList