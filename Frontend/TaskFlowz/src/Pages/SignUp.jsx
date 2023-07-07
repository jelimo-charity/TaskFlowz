import './signup.css'
import signupImg from "../assets/signUp-img.png"
import { useNavigate } from 'react-router-dom'
function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="signupContainer">
      <div className="signupImg">
        <img id="signupImg" src={signupImg} alt="page-image" />
      </div>
      <div className="signupForm">
        <h1>Sign Up</h1>
        <h3>Enter username:</h3>
        <input type="text" />
        <h3>Enter email:</h3>
        <input type="email" />
        <h3>Enter password:</h3>
        <input type="password" /><br/>
        <input id="signupBtn" type="submit" onClick = {() => navigate('/')}/>
      </div>
      
    </div>
  )
}

export default SignUp
