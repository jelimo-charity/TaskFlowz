import './topbar.css'
function Topbar() {
  return (
    <div className='topbar'>
        <input type="text" placeholder="Search..." className="topbarInput"/>
        <div className="profile">
            <h3>Profile</h3>
        </div>
    </div>
  )
}

export default Topbar
