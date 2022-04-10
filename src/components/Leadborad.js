import React from "react";

 function Leadboard(props) {
    
    const processData = () => {
        const array = [];
        props.data.map(user => {
                array.push(
                <div>
                    <p className = "p-lead">Player {user.name} Score : {user.score}</p>
                </div>
                )
        })
        return array
    }
    return (
        <div className="leadborad-div">
            <h1 className="leadboard-title">Leadrborad</h1>
            {processData()}
            <button className="leadborad-btn btn btn-warning rounded" onClick={props.onBackHome}>Back Home</button>
        </div>
    )
}
export default Leadboard;