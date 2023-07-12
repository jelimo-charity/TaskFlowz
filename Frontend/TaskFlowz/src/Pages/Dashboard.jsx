// import Profile from "../Components/Profile"
import TaskForm from "../Components/Taskform"
// import Tasks from "../Components/Tasks"
import Topbar from "../Components/Topbar"
import Navbar from "../components/Navbar"
import './dashboard.css'
function Dashboard() {
  return (
    <div>
        <div className="top">
          <Navbar/>
          <Topbar className="topbar"/>
        </div>
        <div className="bodyContent">
        {/* <Profile/> */}
        <TaskForm/>
        {/* <Tasks/> */}

        </div>
    </div>
  )
}

export default Dashboard
