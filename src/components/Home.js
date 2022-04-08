import { getElementError } from '@testing-library/react';
import React , {Fragment} from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
// import Login  from '../components/Login';
// import User from '../components/User';
// import Sound from '../assets/sounds/buttonSound.mp3'
import Test from './Test';





const Home = (props) => (
    
   <Fragment>
   <Helmet><title>Quiz App _ Home</title></Helmet>
    <div id="home">
      <section>
      <div className="fa-3x first_div">
            <span className="fab fa-codepen fa-lg cube"/>
            </div>
            <div>
            <h1 class="animate-charcter">Quiz Game</h1>
            <div >
            <Test userName={props.title}/>
            
            </div>
            
            <p id='para-home'>Are you as good as you think? oK Let's check</p>
            
            </div>
            <div className='play-button-container'>
                <ul>
                    <span ><Link className='play_button' to="/play/instructions" >Play</Link></span>
                </ul>
            </div>
            
            <div className='auth-container'>
            
                <Link to= "/leadboard" className='auth-buttons' id="login-button">Leadboard</Link>
                <Link to= "/rockps" className='auth-buttons' id="register-button">Rock</Link>
            </div>
       </section>
       </div>
   </Fragment>
   
);
   

export default Home;