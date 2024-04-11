import React,{useState} from "react";
import './Register.css';
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"

const Register=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [userName,setUserName]=useState("")
    const [phone,setPhone]=useState("")
    const [err,setErr]=useState("")
    const navigate=useNavigate()

    const handleRegister=async(event)=>{
        event.preventDefault();

        try{
            const response=await axios.post('http://localhost:5555/user/signup',{email,password,phone,userName},{withCredentials:true})
            console.log(response)
            navigate('/')
        }
        catch(err){
            setErr(err.response.data.message)
        }
        
    }


    return (
        <>
        {<p className='error-message'>{err}</p>}
        <form onSubmit={handleRegister}>

        <div className="reg">
            <h1>SignUp</h1>
         <div className="reg-input">
            <input type="text" placeholder="Username" required value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            <input type="text" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type="email" placeholder="Email-Id" required value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="tel" placeholder="Phone No." required value={phone} onChange={(e)=>setPhone(e.target.value)} />
         </div>
         <div className="reg-btn">
            <button className="rbtn" type="submit">Register</button>
            <Link to="/">
            <button className="rbtn">Login</button>
            </Link>
         </div>
        </div>

        </form>
        

        </>
    )
}

export default Register;