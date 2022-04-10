import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Right from "../../assets/sounds/positiveee.mp3"
import Wrong from "../../assets/sounds/wrongans.mp3"
import Card  from '../Card';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "../../styles/components/Timer.css";
import Home from '../Home';
import  Leadboard  from '../Leadborad';
import {Spin} from 'antd';
import RockPS from '../rockPaperS/RockPS';
import ClickGame from '../clickgame/Clickgame';

const axios = require('axios');


export default function Play2(props) {

	const [_remainingTime, _setRemainingTime] = useState(30);

	const [clockKey, setClockKey] = useState(0);


	const renderTime = ({ remainingTime }) => {
	  _setRemainingTime(remainingTime);
	  if (remainingTime === 0) {
	    return( 
	    <div className="timer">Too late...</div>);
	  }

	  return (
	    <div className="timer">
	      <div className="text">Remaining</div>
	      <div className="value">{remainingTime}</div>
	      <div className="text">seconds</div>
	    </div>
	  );
	};


	const buildOptions = (answerOptions, iscorrect) => {
		return answerOptions.map(question => (
			{
				answerText: question,
				isCorrect: iscorrect
			}
		))
	}
	const buildQuestions = (questions) => {
		const questionArray = [];
		questions.map(question => {
			questionArray.push(
				{
					questionText: question.question,
					answerOptions: shuffleArray([...buildOptions([...question.incorrect_answers], false), ...buildOptions([question.correct_answer], true)]),
					category: question.category
				}   
			)
		})
		setQuestions(questionArray.slice(0,15))
        
	}

	const onBackHome = () => {
		props.onBackHome(score, props.userName);
	}
	
	useEffect(() => {
		async function fetchMyAPI() {
		  let response = await axios.get('https://opentdb.com/api.php?amount=100#');
          console.log(response.data)
		  buildQuestions(response.data.results)          
		}
	
		fetchMyAPI()
	  }, [])

	const [questions, setQuestions] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [disableButton, setDisableButton] = useState(false);
	const [clickedAnswer, setClickedAnswer] = useState(null);
    const [hints, setHints] = useState(5);
    const [playRps, setPlayRps] = useState(false);
    const [playClick, setPlayClick] = useState(false);

	const calculateScoreOfAnswer = () => {
		let points = 0;
		if (_remainingTime >= 25) {
			points = 3;
		} else if (_remainingTime >= 20 && _remainingTime < 25) {
			points = 2;
		} else {
			points = 1;
		}
		return score + points;
	}

	const handleAnswerOptionClick = (isCorrect, text) => {
		setDisableButton(true);
		setClickedAnswer(text);
		if (isCorrect) {
			setScore(calculateScoreOfAnswer());
            document.getElementById('correct-sound').play();
		}else{
            document.getElementById('wrong-sound').play(); 
            
        }
	};
	const handleNextOnClick = () => {
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			if (nextQuestion === 5) {
				setPlayRps(true);
				setCurrentQuestion(nextQuestion);
			} else if (nextQuestion === 3 || nextQuestion === 6) {
				setPlayClick(true);
				setCurrentQuestion(nextQuestion);
			} else {
				setCurrentQuestion(nextQuestion);
			}
		} else {
			setShowScore(true);
		}
		setDisableButton(false);
		setClockKey(clockKey+1);
	}

    const handlePervOnClick = () => {
        const pervQuestion = currentQuestion - 1;
        setDisableButton(true);
        setCurrentQuestion(pervQuestion)
    }

	function shuffleArray(array) {
		let i = array.length - 1;
		for (; i > 0; i--) {
		  const j = Math.floor(Math.random() * (i + 1));
		  const temp = array[i];
		  array[i] = array[j];
		  array[j] = temp;
		}
		return array;
	}

    const handleHintClick = () => {
		if (hints > 0) {
			console.log('got here');
			var removeCounter = 2;

			for (let i = 0; i < questions[currentQuestion].answerOptions.length; i++) {
				const answerOption = questions[currentQuestion].answerOptions[i];
				console.log(`checking answerOption ${JSON.stringify(answerOption)}`);
				if (removeCounter > 0 && !answerOption.isCorrect) {
					console.log(`removing question`)
					removeCounter--;
					// to remove
					questions[currentQuestion].answerOptions.splice(i, 1);
				}
			}
			setQuestions(questions);
		}
        setHints(hints-1);
    }

	const parseFromHtmlString = str => {
		return str
			.replace(/&quot;/gi, '\"')
			.replace(/&#039;/gi, '\'')
			.replace(/&rsquo;/gi, '\'')
			.replace(/&lsquo;/gi, '\'');
	}

	console.log(`checking hints is ${hints}`);
	const hintButtonClasses = hints > 0 ? 'btn btn-warning' : 'btn btn-warning btn-disabled'; 

	console.log(`class is ${hintButtonClasses}`);
	return (
		<div>
			{
				!playRps && !playClick && _remainingTime > 0 &&
				<div id ="play2">

				<Fragment>
					<audio id="correct-sound" src={Right}></audio>
					<audio id="wrong-sound" src={Wrong}></audio>
					
				</Fragment>
				{questions &&  _remainingTime > 0 ?(
				<div className='play'>
				<Card userName={props.title}/>
					{showScore ? (
						<div className='score-section-summary'>
							You scored {score} points
							<button onClick={onBackHome} className='nav-item'>                        
								Home
							</button>
						</div>
						
					) : (
						<>
						<div className='lifeline-container'>
						<p>
						<span className="fp-prev"></span><span className='lifeline'><button onClick={handleHintClick}></button></span>
						
						</p>
						
						<div className="App">
						<button className={hintButtonClasses} onClick={handleHintClick}>Get Hint ({hints})</button>  

					<div className="timer-wrapper">
						<CountdownCircleTimer
          				key={clockKey}
						isPlaying 
						duration={30}
						colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
						colorsTime={[30, 15, 10, 0]}
						onComplete={() => ({ shouldRepeat: true, delay: 1 })}
						>
							{renderTime}
						</CountdownCircleTimer>
					</div>
		
					</div>

						
					</div>
					<div className='username-section'>
						Welcome {props.userName}
					</div>
							<div className='question-section'>
								<div className='question-count'>
									<span>Question {currentQuestion + 1}</span>/{questions.length}
								</div>
								<div className='category'>
									Category
									<span className='category-name'>{questions[currentQuestion].category}</span>
								</div>
								
								<div className='question-text'>{parseFromHtmlString(questions[currentQuestion].questionText)}</div>
								<div className='score-section'>
									Score: {score} points
								</div>
							</div>
							<div className='answer-section'>
								{questions[currentQuestion].answerOptions.map((answerOption) => (
									<button className={!disableButton ? 'button-enable' : clickedAnswer && answerOption.isCorrect ? 'button-disable correct' : clickedAnswer && clickedAnswer === answerOption.answerText && !answerOption.isCorrect ? 'button-disable incorrect' : 'button-disable' } disabled={disableButton} onClick={() => handleAnswerOptionClick(answerOption.isCorrect, answerOption.answerText)}>{parseFromHtmlString(answerOption.answerText)}</button>
								))}
								<div className='next-section'>
								
								<button className={disableButton ? 'button-enable btn-next' : 'button-disable btn-next' } disabled={!disableButton} onClick={() => handleNextOnClick()}>Next</button>  
						</div>

							</div>
							
							<div className='button-container'>
							<button className="leadborad-btn btn btn-danger rounded" onClick={props.onBackHome}>Back Home</button>

									
							
								

					</div>
						</>
					)}
				</div>
				) 
				: null}
				</div>
			}
			{
				!!playRps && !playClick && _remainingTime > 0 &&
				<div id="rps">
					<RockPS setPlayRps={setPlayRps} setScore={setScore} score={score} />
				</div>
			}
			{
				!!playClick && !playRps && _remainingTime > 0 &&
				<div id="click-game">
					<ClickGame setPlayClick={setPlayClick} setScore={setScore} score={score} />
				</div>
			}
			{
				_remainingTime <= 0 &&
				<div>
					<h1>Game Over...</h1>
					<div className='score-section-summary'>
						You scored {score} points
						<button onClick={onBackHome} className='play_button'>                        
							Home
						</button>
					</div>
				</div>
			}
		</div>
	);
}

