import React, {Component} from 'react';
import axios from 'axios';
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
            completed:'',
            _id:'',
            isAdmin:false,
            redirect:false
        }
    }

    componentDidMount() {
        if(sessionStorage.getItem('user'))
        {
            const data =JSON.parse(sessionStorage.getItem('user'));
            this.setState({ redirect:true});
            this.setState({ isAdmin:data.isAdmin});
        }
        const { params } = this.props.match;
        const _id = params._id;
        this.setState({ _id:params._id})
            const task={
                _id:_id
            }
        axios.post('http://localhost:4000/tasks/getTasks', task)
            .then(response => {
                console.log('response')
                console.log(response.data)
                this.setState({
                    description: response.data.description,
                    title: response.data.title,
                    completed: response.data.completed
                })
            })
    }


    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeCompleted(e) {
        console.log(e.target.value)
            this.setState({
                completed: !this.state.completed
            });
        
    }

    onSubmit(e) {

            const oldTask = {
                _id:this.state._id,
                title: this.state.title,
                description: this.state.description,
                completed:this.state.completed
            };
        
        console.log('oldtask')
        console.log(oldTask)
         Service.updateTask(oldTask)
        .then(res => {
            alert(res.data.task)
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
                <h3>Update Todo</h3>
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
                    
                        <div className="form-check">
                            <input  type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeCompleted}
                                    checked={this.state.completed}
                                    value={this.state.completed}
                                    />
                            <lable className="form-check-lable" htmlFor="completedCheckbox">
                                Completed
                            </lable>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
