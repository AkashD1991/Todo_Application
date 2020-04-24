import axios from 'axios';


class Service {

    async RegisterUser(newUser) {
       const data =  await axios.post('http://localhost:4000/users/signup', newUser)
       return data;
            // .then(res =>{
            //     console.log('response')
            //     console.log(res.data.error.details[0]);
            //     alert(res.data.error.details[0].message)
            //     return res
            // }).catch(err =>{
            //     console.log('error')
            //     console.log(err);
            //     return err
            // })

        // return data;
    }

    async LoginUser(user) {
        const data = await axios.post('http://localhost:4000/users/signin', user)
        console.log(data);
        return data;
    }

    async VerifyUser(user) {
        const data = await axios.post('http://localhost:4000/users/verify', user)
        return data;
    }

    async CreateTask(task) {
        const data = await axios.post('http://localhost:4000/tasks/createTask', task)
        return data;
    }

    async getUsers() {
        const data = await axios.get('http://localhost:4000/users/getusers')
        return data;
    }

    async getTasks() {
        const data = await axios.get('http://localhost:4000/tasks/gettasks')
        return data;
    }
    async updateUser(id) {
        const data = await axios.post('http://localhost:4000/users/updateUser', id)
        return data;
    }

    async updateTask(task) {
        const data = await axios.post('http://localhost:4000/tasks/updateTask', task)
        return data;
    }

}

export default new Service();