import React from "react";

 function Leadboard(props) {
    const processData = () => {
        const array = [];
        props.data.sort((a, b) => {
            if ( a.score > b.score ) {
                return -1;
            }
            if ( a.score < b.score ){
                return 1;
            }
            return 0;
        }).map(user => {
                array.push(
                <div>
                    <p className = "p-lead">Player {user.name} Score : {user.score}</p>
                </div>
                )
        })
        return array;
    }
    return (
        <div className="leadborad-div">
            <h1 className="leadboard-title">Leaderboard</h1>
            {processData()}
            <button className="leadborad-btn btn btn-warning rounded" onClick={props.onBackHome}>Back Home</button>
        </div>
    )
}
export default Leadboard;