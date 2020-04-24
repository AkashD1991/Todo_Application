const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
})

//Create Model
const Task = mongoose.model('task', taskSchema)


//Export the model
module.exports = Task;