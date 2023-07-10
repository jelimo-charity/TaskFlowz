import './topbar.css'
import { FaUser } from 'react-icons/fa'
import { MdNoteAdd } from 'react-icons/md'
import { FaTasks } from 'react-icons/fa'
import { IoNotifications } from 'react-icons/io5'
function Topbar() {
  return (
  
 <div className='topbar'>
    <input type="text" placeholder="Search..." className="topbarInput" />
    <h2 className='linkItem'> <FaUser/>Profile</h2>
    <h2 className="linkItem"> <MdNoteAdd/>Add New Task</h2>
    <h2 className='linkItem'> <FaTasks/> My Tasks</h2>
    <h2 className='linkItem'> <IoNotifications/> Messages</h2>
    
 </div>

  )
}

export default Topbar
