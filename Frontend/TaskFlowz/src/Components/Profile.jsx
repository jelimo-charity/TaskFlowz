import userImg from '../assets/userImg.jpg'
import './profile.css'
import { useContext } from 'react'
import { Context } from '../context/userContext/Context'
function Profile() {
  const {user} = useContext(Context)
  // console.log(user)
  return (
    <div className="profile">
        <h2> My Profile </h2>
        <div className="profileDetails">
          
            <div className="imgProfile">
                <img src={ userImg } alt="user image" />
            </div>
            <div className="userDetails">
                <h4>Username: {user.Username}</h4>
                <h4>Email: {user.Email}</h4>
                <h4></h4>
            </div>
        </div>
      
    </div>
  )
}

export default Profile
