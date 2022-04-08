
import React from "react";
import Play2 from "./quiz-folder/Play2";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    // <div className="note">
    <div className="userarea"><h2 className="username">{props.title}</h2>
      
      {/* <p>{props.content}</p> */}
      <button className="note button" onClick={handleClick}>DELETE</button>
      
     </div>
  );
}

export default Note;
