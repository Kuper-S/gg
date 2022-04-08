
import React, { useState } from "react";
import Home from "./Home";
import Play from "./quiz-folder/Play";

const User = (props) => {
	const [userName, setUserName] = useState('');
    
    // function submitName(event) {
    //     props.onAdd(userName);
    //     setName({
    //         userName :""
    //     });
    //     event.preventDefault();
    //   }
    
    



	return (
		<div>
	        <input
	          name="userName"
	          type="text"
              placeholder="Enter your Name"
	          value={userName}
	          onChange={e => setUserName(e.target.value)}
	        />
            <button >Submit</button>
            <h3>{props.userName}</h3>
			<Play userName={userName} />
            <Home userName={userName} />
			{/* <Leaderboard userName={userName} /> */}
            {/* <button onClick={setUserName}>Add</button> */}
		</div>
	);
};

export default User;