import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route} from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/Fotter';
import Navbar from './components/Navbar';
import Quiz from './components/quiz-folder/Quiz-instrctions';
import Play2 from './components/quiz-folder/Play2';
import RockPS from './components/rockPaperS/RockPS';


function App() {
  
    return (
      <BrowserRouter>
      <Navbar/>
      
      <Footer/>
        <Routes> 
        <Route  path="/" exact element={<Home/>}/>
        <Route path="/play/instructions" exact element = {<Quiz/>}/>
        <Route path="/play/Quiz" exact element = {<Play2/>}/>
        <Route path="/rockps" exact element = {<RockPS/>}/>
        </Routes>
        
      </BrowserRouter>
      
    );
    
}

export default App;