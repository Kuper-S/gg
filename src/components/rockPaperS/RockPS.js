import { useEffect, useState } from 'react'
import woo  from './woo.mp3'
import loser  from './loser.mp3'
import draw  from './draw.mp3'
import LoadingScreen from 'react-loading-screen';
import { Spin } from 'antd';

const RockPS = (props) => {
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)
  const choices = ['👊', '🖐️', '🖖']
  const [count, setCount] = useState(0);



  const handleClick = (value) => {
    setUserChoice(value)
    generateComputerChoice()
  }

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }
  
  useEffect(() => {
    {
      switch (userChoice + computerChoice) {
        case '🖖🖐️':
        case '👊🖖':
        case '🖐️👊':
            document.getElementById('wining-sound').play();
          setResult('YOU WIN!')
          props.setScore(props.score+1);         
          break
        case '🖐️🖖':
        case '🖖👊':
        case '👊🖐️':
          setResult('YOU LOSE!')
          document.getElementById('losing-sound').play();
          setTimeout(() => {
           props.setPlayRps(false); 
          }, 3000);
          break
        case '👊👊':
        case '🖐️🖐️':
        case '🖖🖖':
          setResult('ITS A DRAW!')
          document.getElementById('draw-sound').play();
          break
      }
    }
  }, [computerChoice, userChoice])

  return (
   <div><Spin/>
    <div className="rock-div">
     <audio id="wining-sound" src={woo}></audio>
    <audio id="losing-sound" src={loser}></audio>
    <audio id="draw-sound" src={draw}></audio>
        <h1>Rock , Paper , Sciossors</h1>
      <h2 className='player-choice'>User choice is: {userChoice}</h2>
      <h2 className='pc-choice'>Computer choice is: {computerChoice}</h2>
      {choices.map((choice, index) =>
        <button className='btn btn-light options-rps' key={index} onClick={() => handleClick(choice)}>
          {choice}
        </button>
      )}
      <h1 className='Result-RockPaper'>{result}</h1>
      {/* <h1>Score {result ? YOU WIN!  ({}) {count}</h1> */}
    </div>
    </div>
  )
}

export default RockPS

