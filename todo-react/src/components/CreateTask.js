import React, {Component} from 'react';
import Service from "../Service/Service";
import { Redirect } from 'react-router-dom';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCompleted = this.onChangeCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            description: '',
            completed: false,
            redirect:false,
            isAdmin:false
        }
    }
    componentWillMount(){
        if(sessionStorage.getItem('user'))
        {
            const data =JSON.parse(sessionStorage.getItem('user'));
            this.setState({ redirect:true});
            this.setState({ isAdmin:data.isAdmin});
        }
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeCompleted(e) {
        this.setState({
            completed: this.state.completed
        });
    }

    onSubmit= (e)=>{
        const newTask={
            title:this.state.title,
            description:this.state.description,
            completed:this.state.completed,
        }
        console.log(newTask);
        Service.CreateTask(newTask)
        .then(res => {
            console.log(res.data);
            this.setState({message : res.data.task});
            alert(this.state.message)
            // this.props.history.push('/tasklist');
            if(this.state.isAdmin){
                // return (<Redirect to={'/adminview'}/>)
                this.props.history.push('/adminview');
            }
            else{
            //   return (<Redirect to={'/userview'}/>)
            this.props.history.push('/userview');
            }
        })
            e.preventDefault();
    }

    render() {
        if(this.state.Redirect){
            return (<Redirect to={'/'}/>)
        }
        
        return (
            <div>
                <h3>Create Task</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <lable>Title: </lable>
                        <input  type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                />
                    </div>
                    <div className="form-group">
                        <lable>Description: </lable>
                        <input  type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Create Task" className="btn btn-primary" />
                        </div>
                </form>
            </div>
        )
    }
}

