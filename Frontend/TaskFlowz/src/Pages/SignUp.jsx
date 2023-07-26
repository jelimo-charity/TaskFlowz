import './signup.css'
import Navbar from "../components/Navbar"
import signupImg from "../assets/signUp-img.png"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Footer from '../Components/Footer'

function SignUp() {
  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    axios.post('http://localhost:3000/auth/signup', data)
    // console.log(data)
    .then((response)=>{
      response.data.message && alert(response.data.message)
      console.log(data)
      navigate('/')
    }).catch((response)=>{
      // console.log(response)
      alert(response)
    })
   
  }



  const navigate = useNavigate();
  return (
    <div>
      <Navbar/>

    <div className="signupContainer">

      <div className="signupImg">
        <img id="signupImg" src={signupImg} alt="page-image" />
      </div>
      <div id="signupForm">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>Enter username:</label><br/>
        <input type="text" { ...register('username') } />
        <p>{errors.username?.message}</p>
        <label>Enter email:</label><br/>
        <input type="email" { ...register('email') } />
        <p>{errors.email?.message}</p>
        <label>Enter password:</label><br/>
        <input type="password" { ...register('password') } /><br/>
        <p>{errors.password?.message}</p>
        <input id="signupBtn" type="submit" />
        </form>
      </div>
   
      
    </div>
    <div className="footer">
        <Footer/>
      </div>
  </div>
  )
}

export default SignUp
