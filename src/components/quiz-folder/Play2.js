import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Right from "../../assets/sounds/positiveee.mp3"
import Wrong from "../../assets/sounds/wrongans.mp3"
import Card  from '../Card';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "../../styles/components/Timer.css";
import Home from '../Home';
import  Leadboard  from '../Leadborad';
const axios = require('axios');


export default function Play2(props) {

	const [_remainingTime, _setRemainingTime] = useState(30);


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
		setQuestions(questionArray)
        
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
    const [hints, setHints] = useState(false);

	const handleAnswerOptionClick = (isCorrect, text) => {
		setDisableButton(true);
		setClickedAnswer(text);
		if (isCorrect) {
			setScore(score + 1);
            document.getElementById('correct-sound').play();
		}else{
            document.getElementById('wrong-sound').play(); 
            
        }
	};
	const handleNextOnClick = () => {
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
            
		} else {
			setShowScore(true);
		}
		setDisableButton(false);
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
        var counter = 5;
        counter --;
        setHints(true)
        
       

    }


	return (
		<div id ="play2">

            <Fragment>
                <audio id="correct-sound" src={Right}></audio>
                <audio id="wrong-sound" src={Wrong}></audio>
                
            </Fragment>
            {/* {_remainingTime > 0 ? ( */}

			{questions &&  _remainingTime > 0 ?(
			<div className='play'>
            <Card userName={props.title}/>
				{showScore ? (
					<div className='score-section-summary'>
						You scored {score} out of {questions.length}
                        <button className='nav-item'>
                            <Link to='/' className='nav-links'>
                                Home
                            </Link>
                            </button>
					</div>
                    
				) : (
					<>
                    <div className='lifeline-container'>
                    <p>
                       <span className="fp-prev"></span><span className='lifeline'><button onClick={handleHintClick}></button></span>
                       
                    </p>
                    
                    <div className="App">
                    <button className={handleHintClick}>Hint</button>  

                <div className="timer-wrapper">
                    <CountdownCircleTimer
                    isPlaying 
                    duration={200}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[30, 15, 10, 0]}
                    onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                     >
                        {renderTime}
                    </CountdownCircleTimer>
                </div>
      
                </div>
 
                    
                </div>
                
						<div className='question-section'>
							<div className='question-count'>
								<span>Question {currentQuestion + 1}</span>/{questions.length}
							</div>
							<div className='category'>
								Category
								<span className='category-name'>{questions[currentQuestion].category}</span>
							</div>
                            
							<div className='question-text'>{questions[currentQuestion].questionText}</div>
							<div className='score-section'>
								{score} out of {questions.length}
                                
							</div>
						</div>
						<div className='answer-section'>
							{questions[currentQuestion].answerOptions.map((answerOption) => (
								<button className={!disableButton ? 'button-enable' : clickedAnswer && answerOption.isCorrect ? 'button-disable correct' : clickedAnswer && clickedAnswer === answerOption.answerText && !answerOption.isCorrect ? 'button-disable incorrect' : 'button-disable' } disabled={disableButton} onClick={() => handleAnswerOptionClick(answerOption.isCorrect, answerOption.answerText)}>{answerOption.answerText}</button>
							))}
                            <div className='next-section'>
							
                            <button className={disableButton ? 'button-enable btn-next' : 'button-disable btn-next' } disabled={!disableButton} onClick={() => handleNextOnClick()}>Next</button>  
					</div>

						</div>
						
                        <div className='button-container'>
                                
                            <button className="btn btn-danger rounded-circle"><Link to="/">Quit</Link></button>
                                
                           
                            

                </div>
					</>
				)}
			</div>
			) : <Leadboard/>}
            {/* ) : null}  */}
		</div>
	);
}

