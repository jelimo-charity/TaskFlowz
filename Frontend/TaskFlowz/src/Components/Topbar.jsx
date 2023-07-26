import './topbar.css'
import { FaUser } from 'react-icons/fa'
import { MdNoteAdd } from 'react-icons/md'
import { FaTasks } from 'react-icons/fa'
import { IoNotifications } from 'react-icons/io5'
import { Context } from '../Context/taskContext/Context'
import { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
function Topbar() {
  const {dispatch} = useContext(Context);
  const handleProfile = () =>{
    dispatch({type:"PROFILE", payload: "profile"})
  }
  const handleaddTask = () =>{
    dispatch({type:"ADD", payload: "addTask"})
  }
  const handleTasks = () =>{
    dispatch({type:"TASKS", payload: "tasks"})
  };
  const handleNotification = () => {
    dispatch({type:"NOTIFICATION", payload: "notifications"})
  }
  
  return (
  <div>

 <div className='topbar'>
  
    <h2 className='linkItem' onClick={handleProfile}> <FaUser/>Profile</h2>
    <h2 className="linkItem" onClick={handleaddTask}> <MdNoteAdd/>Add New Task</h2>
    <h2 className='linkItem' onClick={handleTasks}> <FaTasks/> My Tasks</h2>
    <h2 className='linkItem' onClick={handleNotification}> <IoNotifications/> Notifications</h2>
 </div>
 </div>

  )
}

export default Topbar
