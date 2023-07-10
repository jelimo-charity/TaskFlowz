import userImg from '../assets/userImg.jpg'
import './profile.css'
function Profile() {
  return (
    <div className="profile">
        <h2> My Profile </h2>
        <div className="profileDetails">
          
            <div className="imgProfile">
                <img src={ userImg } alt="user image" />
            </div>
            <div className="userDetails">
                <h4>Username: Charity</h4>
                <h4>Email: charity@gmail.com</h4>
                <h4></h4>
            </div>
        </div>
      
    </div>
  )
}

export default Profile
