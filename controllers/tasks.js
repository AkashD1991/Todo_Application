const Task = require('../models/task');

module.exports = {

    createTask: async(req, res, next) => {
        const { title, description, completed } = req.value.body;
        console.log(req.value.body);

        const newTask = new Task({ title, description, completed });
        await newTask.save();
        res.json({ task: 'Task created succesfully' });

    },

    getTasks: async(req, res, next) => {
        const tasks = await Task.find({})
        // console.log(tasks);
        res.status(200).json(tasks)
    },

    getTask: async(req, res, next) => {
        const { _id } = req.body;
        console.log(_id)
        const task = await Task.findById({ _id });
        console.log(task)
        res.status(200).json(task)
    },

    updateTask: async(req, res, next) => {
        const { _id, title, description, completed } = req.body
        console.log(req.body);

        await Task.update({ _id }, {
            $set: {
                title: title,
                description: description,
                completed: completed
            }
        })
        res.json({ task: 'sucessfully Updated' });

    }
}