import React, { useEffect,useState } from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom'
import './Voting.css'
import axios from 'axios';

const Voting = ()=>{
    const [data,setData]=useState([])
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [mesg,setMesg]=useState("")
    const [cookies,removeCookie]=useCookies([])

    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            console.log(selectedCandidate)
            const response=await axios.get(`http://localhost:5555/can/${selectedCandidate}`,{withCredentials:true})
            console.log(response)
            setMesg(response.data)
        }
        catch(err){
            console.log(err)
        }

    }

    const isUserAdmin=()=>{
        if(cookies.adminRole===true){
            return true;
        }
        return false
    }

    const Logout = () => {
        removeCookie("token");
        removeCookie("adminRole")
        navigate("/");
      };
    
    useEffect(()=>{
        const getCandidates=async()=>{
            try{
                const response=await axios.get('http://localhost:5555/can',{withCredentials:true})
                console.log(response)
                setData(response.data)
                console.log(cookies)
            }
            catch(err){
                console.log(err)
            } 
        } 
        getCandidates();
    },[cookies])
    
    return (
        <>
        <div className='v-container'>

        {!isUserAdmin()?(
            <form onSubmit={handleSubmit}>
            {data?.map((item)=>{
                return (
                    <>
                    <div className='v-c' key={item._id}>
                        <div>
                        <input type="radio" name='hello' value={item._id} onChange={(e)=>setSelectedCandidate(e.target.value)}/>
                        <label>{item.candidateName}</label>
                        </div>
                    </div>
                    </>
                )
                })}
            <button className='v-submit' type='submit'>Vote</button>
        </form>

        ):(
            <div>
          {data?.map((item) => (
            <div className='v-c' key={item._id}>
              <p>{item.candidateName}: {item.votes.length} votes</p>
            </div>
          ))}
        </div>
        )}
        
        
        
            <div className='v-msg'>{mesg}</div>
            <button className="v-logout" onClick={Logout}>LOGOUT</button>
        </div>
        </>
    );

}
export default Voting;