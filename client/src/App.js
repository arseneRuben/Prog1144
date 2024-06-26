import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PodCastPage from './pages/PodCastPage';
import ProgramPage from './pages/ProgramPage';

import CreateProgramPage from './pages/ProgramPageCreate';
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

        </Routes>
      </Router>
    </div>
  );
}

export default App;
