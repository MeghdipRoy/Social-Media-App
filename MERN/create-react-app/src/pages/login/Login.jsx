import { Link, useNavigate } from "react-router-dom"
import "./login.scss"
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";


const Login = () => {

    const [inputs, setInputs] = useState({
        username : "",
        password: "",
        
      })
    
      const [err, setErr] = useState(null)

      const navigate = useNavigate()
    
      const handleChange = (e) =>{
        setInputs((prev) =>({...prev, [e.target.name]: e.target.value }))
      }
    
    const {login} = useContext(AuthContext);
    const handleLogin = async(e)=>{
        e.preventDefault()
        try{
        await login(inputs);
        navigate("/")
        }catch(err){
            setErr(err.response?.data)
        }
    }

  return (
    <div className="login">
        <div className="card">
            <div className="left">
        <h1>Mandy Universe</h1>
        <p>
        WellCome To The Universe of Mandy 😊.
        Connect with friends and the world around you on MandyUniverse.
        Share your moments, stay updated, and connect with your community.
        Join your friends and see what's happening in the world.
        </p>
        <span>Don't you have an account?</span>
    <Link to='/register'>
    <button>Register</button>
    </Link>
            </div>
            <div className="right">
        <h1>Login</h1>
        <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            {err && err}
            <button onClick={handleLogin}>Login</button>
        </form>
            </div>
        </div>
    </div>
  )
}

export default Login