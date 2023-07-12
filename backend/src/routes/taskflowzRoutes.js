
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/userControllers.js'
import { signup, login } from "../controllers/userAuth.js"

const taskflowzRoutes = (app) =>{
    app.route('/users')
     .get(getUsers)
     .post(createUser)

    app.route('/users/:UserID')
     .get(getUser)
     .put(updateUser)
     .delete(deleteUser)


    
//auth routes

app.route('/auth/signup')
.post(signup)


app.route('/auth/login')
.post(login)
}

export default taskflowzRoutes;
