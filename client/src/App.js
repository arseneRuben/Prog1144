import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PodCastPage from './pages/PodCastPage';
import ProgramPage from './pages/ProgramPage';
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from 'bootstrap'
import Navbar from './components/Navbar';
import EventComposant from './components/EventComposant';
import CreateEvent from './components/CreateEvent';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <h1> Welcome to api rest project</h1>
      <Router>
        <Routes>
            <Route path='/podcasts' element={<PodCastPage/>}/>
            <Route path='/programs' element={<ProgramPage/>}/>
            <Route path='/events' element={<EventComposant/>}/>
            <Route path='/event/create' element={<CreateEvent/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
