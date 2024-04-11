import React from "react";
import { useLocation } from 'react-router-dom';

const Votes=()=>{
    const location = useLocation();
    const res=location.state
    console.log(res)
    // const selectedCandidate = location.state ? location.state.candidateNam : null;
  
return (
    <>
    <h1>Votes</h1>
    {/* {selectedCandidate && <p>Selected Candidate: {selectedCandidate}</p>} */}
    </>
)    

}

export default Votes;