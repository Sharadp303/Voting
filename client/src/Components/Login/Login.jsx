import React ,{useState} from "react";
import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";


const Login=()=>{

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [err,setErr]=useState("")

    const navigate=useNavigate()

    const handleLogin=async(event)=>{
        event.preventDefault();

        try{
            const response=await axios.post('http://localhost:5555/user/signin',{email,password},{withCredentials:true})
            console.log(response)
            navigate('/voting')
        }
        catch(err){
            console.log(err.response.data.message)
            setErr(err.response.data.message)
        }
        
    }



    return (
        <>
        <form onSubmit={handleLogin}>

        <div className="log">
            <h1>SignIN</h1>
         <div className="log-input">           
            <input type="email" required placeholder="Email-Id" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" required placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
         </div>

         {<p className='error-message'>{err}</p>}
         
         <div className="log-btn">
            <button className="lbtn" type="submit">Login</button>
            <Link to="/register">
            <button className="lbtn">Register</button>
            </Link>
         </div>
         
        </div>
        </form>

        </>
    )
}

export default Login;