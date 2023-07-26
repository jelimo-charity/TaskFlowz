import Profile from "../Components/Profile"
import TaskForm from "../Components/Taskform"
// import Tasks from "../Components/Tasks"
import Topbar from "../Components/Topbar"
import Navbar from "../components/Navbar"
import Tasks from "../Components/Tasks"
import Notification from '../Components/Notification'
import { useContext } from "react"
import { Context } from "../Context/taskContext/Context"
import './dashboard.css'
function Dashboard() {
  const {ui} = useContext(Context)
  return (
    <div>
        <div className="top">
          <Navbar/>
          <Topbar className="topbar"/>
        </div>
        <div className="bodyContent">
            {
              ui === 'profile' ? (
                <div className="wrapper">
                  <Profile/>
                </div>
              ): ui === 'addTask' ? (
                <div className="wrapper">
                  {/* <h2>Add Task </h2> */}
                  <TaskForm/>
                </div>
              ): ui === 'tasks' ? (
                <div className="wrapper">
                  {/* <h2>Tasks</h2> */}
                  <Tasks/>
                </div>
              ):  ui === 'notifications' ? (
                <div className="wrapper">
                  <Notification/>
                </div>
              ): null


            }

        </div>
    </div>
  )
}

export default Dashboard
