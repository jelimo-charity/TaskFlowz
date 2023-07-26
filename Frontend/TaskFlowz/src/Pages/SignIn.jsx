import './signin.css'
import { useNavigate } from 'react-router-dom'
import signinImg from '../assets/signIn-img.png'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Navbar from '../components/Navbar'
import { useContext } from 'react'
import { Context } from '../context/userContext/Context'
import Axios from 'axios'
import Footer from '../Components/Footer'
function SignIn() {
  const { user, dispatch } = useContext(Context);
  console.log(user);
  const schema = yup.object().shape({
    Email: yup.string().email().required("Email is required"),
    Password: yup.string().required("Password is required")
  });

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  
  });
  // command to submit the form
  const onSubmit = (data) => {
    Axios.post('http://localhost:3000/auth/login', data)
    .then( ({data}) => {
      if(data.token){
        dispatch({type: 'LOGIN_SUCCESSFUL', payload: data})
          alert(" Login successful")
          // console.log(data)
        navigate('/dashboard')
      }
    })
    .catch((response)=>{
      alert(response);
      
      console.log(response);
    })
   
  }
  const navigate = useNavigate()
  return (
    <div>
      {/* <Navbar/> */}

    <div className='signinContainer'>
      <div className="col1">
      <div className="col2">
        <p id='head'>TaskFlowz!</p>
        {/* <p>The ultimate task management solution designed to revolutionize the way you handle your tasks.
          <br/> <span>Simplify and Streamline your task management with ease.</span>
        </p> */}
        <p>With TaskFlowz, you can effortlessly manage and prioritize your tasks,<br/> and stay on top of deadlines. Say goodbye to the chaos of scattered to-do
           lists and embrace a streamlined<br/> workflow that empowers you to achieve more. <br/>
           Experience the power of TaskFlowz and unlock your productivity potential today.</p>
        <h4>Have No Account? <button onClick = {() => navigate('/signup')} >Sign Up</button> </h4>
      </div>
      </div>
      
      <div className="col3">
        <div className="img">
          <img id="signinImg" src={signinImg} alt="page-image" />
        </div>
        <div className="frm">
          <form onSubmit={ handleSubmit(onSubmit)}>
            <h2>Sign In</h2>
            <label htmlFor="email">Enter Email:</label>
            <input type="email" { ...register("Email")}/>
            <p>{errors.Email?.message}</p>
            <label htmlFor="password">Enter Password:</label>
            <input type="password" { ...register("Password")}/><br/>
            <p>{errors.Password?.message}</p>
            <input id='signinbtn' type="submit" />
          </form>
        </div>
      </div>
      <div className="footer">
        <Footer/>
      </div>
    </div>

  </div>


  )
}

export default SignIn
