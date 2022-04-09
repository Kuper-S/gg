import React from "react";

 function Leadboard(props) {
    return (
        <div>
            <h1 className="leadboard">Leadboard</h1>
            <h2>User Name: {props.name}</h2>
            <h2>Score: {props.score}</h2>
            <button onClick={props.onLeadboard}>Go Back Home</button>
        </div>
    )
}
export default Leadboard;