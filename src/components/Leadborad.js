import React from "react";

 function Leadboard(props) {
    const processData = () => {
        const array = [];
        props.data.map(user => {
                array.push(
                <div>
                    <p>user {user.name} score: {user.score}</p>
                </div>
                )
        })
        return array;
    }
    return (
        <div>
            <h1 className="leadboard">Leadboard</h1>
            {processData()}
            <button onClick={props.onBackHome}>Back Home</button>
        </div>
    )
}
export default Leadboard;