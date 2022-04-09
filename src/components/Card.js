
import React from "react";
import Play2 from "./quiz-folder/Play2";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    // <div className="note">
    <div className="userarea"><h2 className="username">{props.title}</h2>
      
     
      
     </div>
  );
}

export default Note;
