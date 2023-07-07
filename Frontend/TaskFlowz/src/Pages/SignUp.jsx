import './signup.css'
import Navbar from "../components/Navbar"
import signupImg from "../assets/signUp-img.png"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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
    console.log(data)
    navigate('/')
  }



  const navigate = useNavigate();
  return (
    <div>
      <Navbar/>

    <div className="signupContainer">

      <div className="signupImg">
        <img id="signupImg" src={signupImg} alt="page-image" />
      </div>
      <div className="signupForm">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Enter username:</h3>
        <input type="text" { ...register('username') } />
        <p>{errors.username?.message}</p>
        <h3>Enter email:</h3>
        <input type="email" { ...register('email') } />
        <p>{errors.email?.message}</p>
        <h3>Enter password:</h3>
        <input type="password" { ...register('password') } /><br/>
        <p>{errors.password?.message}</p>
        <input id="signupBtn" type="submit" />
        </form>
  
      </div>
      
    </div>
  </div>
  )
}

export default SignUp
