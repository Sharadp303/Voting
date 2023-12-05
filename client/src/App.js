import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Voting from "./Components/Voting/Voting";

function App() {
  return (  
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/voting" element={<Voting/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
