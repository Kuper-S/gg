import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function ClickGame(props) {
  const [count, setCount] = useState(0);
  const [_remainingTime, _setRemainingTime] = useState(10);
  
  const handleClick = () => {
    setCount(count+1);
    props.setScore(props.score+1);
  }

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

  return (
    <div className="app-clicker">
      {
        // if else statement to determine color of the counter
      }
      <h1 className='counter'>
        {count}
      </h1>
      <h2 className='counter-explain'>Click as Fast as you Can!</h2>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying 
          duration={10}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[30, 15, 10, 0]}
          onComplete={() => props.setPlayClick(false)}
        >
          {renderTime}
        </CountdownCircleTimer>
			</div>
      <div >
        <button className="click-game btn btn-primary btn-lg btn-block" onClick={handleClick}>+</button>
      </div>
    </div>
  );
}

export default ClickGame;