import { getElementError } from '@testing-library/react';
import React , {Fragment, useState} from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Test from './Test';
import Play2 from './quiz-folder/Play2';
import Quiz from './quiz-folder/Quiz-instrctions';
import Leadboard from './Leadborad';


//TODO:
// 1. remove navbar from every page
// 2. create leadboard table
// 3. fix Home buttons
const Home = (props) => {
    const [playPage, setPlayPage] = useState(false);
    const [instructionPage, setInstructionPage] = useState(false);
    const [leaderboardPage, setLeaderboardPage] = useState(false);
    const [userName, setUserName] = useState('');
    const [leadBoardTable, setLeadBoardTable] = useState([]);

    console.log(`leaderboardPage ${leaderboardPage}`);

    const onInstructionClick = () => {
        setInstructionPage(true);
    }

    const onPlayClick = () => {
        setInstructionPage(false);
        setPlayPage(true);
    }

    const onLeadBoardClick = () => {
        setLeaderboardPage(true);
    }

    const onBackHome = (score=null, userName='') => {
        if(score && userName){
            setLeadBoardTable([...leadBoardTable,{
                name: userName,
                score: score
            }]);
        }
        setPlayPage(false);
        setInstructionPage(false);
        setLeaderboardPage(false);
    }

    if(playPage){
        return <Play2 
            userName={userName.title}
            onBackHome={onBackHome}
        />
    }

    if(instructionPage){
        return <Quiz 
          onPlayClick={onPlayClick}
          onBackHome={onBackHome}
        />
    }

    if(leaderboardPage){
        return <Leadboard 
            data={leadBoardTable}
            onBackHome={onBackHome}
        />
    }

    return(
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
            <Test setNames={setUserName} userName={props.title}/>
            
            </div>
            
            <p id='para-home'>Are you as good as you think? oK Let's check</p>
            
            </div>
            <div className='play-button-container'>
                <ul>
                    <button className='play_button' onClick={onInstructionClick}>Play</button>
                </ul>
            </div>
            
            <div className='auth-container'>
                <button id="login-button" onClick={onLeadBoardClick}>Leadboard</button>
            </div>
       </section>
       </div>
   </Fragment>
)};
   

export default Home;