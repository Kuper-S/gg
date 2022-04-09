import React , {Component,Fragment}from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';
import vid from '../../assets/videos/spaceship.mp4'


function Quiz(props) {
  return (
   <Fragment>
    <Helmet>
    <title>Quiz Instruction - Quiz App</title>        
    </Helmet>
    <div className='instructions-container'>
        <video src={vid} autoPlay={true} loop muted />
        <h1>How to Play The Quizi Game</h1>
        
        <ul className='browser-defult' id="main-list">
            <li>This game has a time limit of 10 minutes.</li>
            <li>Answer the questions as fast as you can! </li>
            <li>Each game consists 15 questions. </li>
            <li>Most questions have 4 or 2 answers to choose from.</li>
            <li>Timer starts as soon as the game load</li>
            <li>Feel free to quit the game at any time,In that case your score will be revealed</li>

            <li>Each game has 2 lifelines to use : 
                <ul className='sublist'>
                    <li>One-time option to divide the answers to 50-50  ➗.</li>
                    <li>5 Hints 💡</li>
                </ul>
            

            <h2>So? Would you like to try ?</h2>
            </li>
            <div className='links-play-home'>
            <button onClick={props.onBackHome} className="btn btn-warning rounded yes-no" type="button">
                No.. not yet
            </button>
            <button onClick={props.onPlayClick} className="btn btn-warning rounded yes-no" type="button">
                Hell Yeah! lets GO!
            </button>
            </div>
        
        </ul>
    </div>



   </Fragment>
  );
}

export default Quiz