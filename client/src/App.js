import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Voting from "./Components/Voting/Voting";
import Votes from "./Components/Votes/Votes";

function App() {
  return (  
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/voting" element={<Voting/>}/>
      <Route path="/v" element={<Votes/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
