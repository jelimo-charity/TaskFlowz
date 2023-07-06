import './signin.css'
import signinImg from '../assets/signIn-img.png'
function SignIn() {
  return (
    <div className='signinContainer'>
      <div className="col1">
      <img id="signinImg" src={signinImg} alt="page-image" />
      <form>
        <h2>Sign In</h2>
        <h4>Enter Email:</h4>
        <input type="email" />
        <h4>Enter Password</h4>
        <input type="password" /><br/>
        <input id='signinbtn' type="submit" />
      </form>
      </div>
      <div className="col2">
        <h2>Welcome to TaskFlowz!</h2>
        <p>The ultimate task management solution designed to revolutionize the way you handle your tasks.
          <br/> <span>With TaskFlowz, Simplify and Streamline your task management with ease.</span>
        </p>
        <p>With TaskFlowz, you can effortlessly manage and prioritize your tasks, collaborate with 
          team members,<br/> and stay on top of deadlines. Say goodbye to the chaos of scattered to-do
           lists and embrace a streamlined workflow that empowers you to achieve more. 
           Experience the power of TaskFlowz and unlock your productivity potential today.</p>
        <h4>Have No Account? <button>Sign Up</button> </h4>
      </div>
    </div>
  )
}

export default SignIn
