import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


import PodCastPage from './pages/PodCastPage';

///G1
import ProgramPage from './pages/ProgramPage';
import CreateProgramPage from './pages/ProgramPageCreate';
import EditProgramPage from './pages/ProgramPageEdit';

import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from 'bootstrap'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <h1> Welcome to api rest project</h1>
      <Router>
        <Routes>
            <Route path='/podcasts' element={<PodCastPage/>}/>


            <Route path='/programs' element={<ProgramPage/>}/>
            <Route path="/programs/create" element={<CreateProgramPage/>}/>
            <Route path="/programs/edit" element={<EditProgramPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
