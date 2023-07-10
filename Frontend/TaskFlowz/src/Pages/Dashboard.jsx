import Profile from "../Components/Profile"
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
        <Profile/>

        </div>
    </div>
  )
}

export default Dashboard
