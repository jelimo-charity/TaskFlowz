import Sidenav from "../Components/Sidenav"
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
        <Sidenav/>
    </div>
  )
}

export default Dashboard
