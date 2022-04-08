import React, { useState } from "react";

function ClickGame() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      {
        // if else statement to determine color of the counter
      }
      <h1 className='counter'>
        {count}
      </h1>
      <div className="button__wrapper">
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}

export default ClickGame;