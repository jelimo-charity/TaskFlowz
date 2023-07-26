import './App.css'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Dashboard from './Pages/Dashboard'
import Taskboard from './Pages/Taskboard'
// import Navbar from './Components/Navbar'
import {  Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
 return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path='/' element = { <SignIn/> } />
        <Route path='/signup' element = { <SignUp/> } />
        <Route path='/dashboard' element = { <Dashboard/> } />
        <Route path='/taskboard/:id' element = { <Taskboard/> } /> 
        {/* <Route path='/notifications/:id' element = { <Notification/> } />  */}



      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
