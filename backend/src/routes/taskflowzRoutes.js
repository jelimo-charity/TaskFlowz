
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/userControllers.js'
import { signup, login } from "../controllers/userAuth.js"
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/taskControllers.js'

const taskflowzRoutes = (app) =>{
    app.route('/users')
     .get(getUsers)
     .post(createUser)

    app.route('/users/:UserID')
     .get(getUser)
     .put(updateUser)
     .delete(deleteUser)

     app.route('/tasks')
     .get( getTasks)
     .post(createTask)

     app.route('/tasks/:taskId')
     .get(getTask)
     .delete(deleteTask)
     .put(updateTask)


    
//auth routes

app.route('/auth/signup')
.post(signup)


app.route('/auth/login')
.post(login)
}

export default taskflowzRoutes;
