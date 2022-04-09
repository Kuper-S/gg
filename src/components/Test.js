import React, { useState } from "react";
import Login  from '../components/Login';
import Card  from '../components/Card';


function Test(props){
    const [names, setNames] = useState('');

  function addName(newName) {
    props.setNames(newName);
  }

  return (
    <>
      <Login onAdd={addName} />
      </>
  );
}


export default Test;