import React, { useState } from "react";
import Login  from '../components/Login';
import Card  from '../components/Card';


function Test(){
    const [names, setNames] = useState([]);

  function addName(newName) {
    setNames(prevNames => {
      return [...prevNames, newName];
    });
  }

  function deleteName(id) {
    setNames(prevNames => {
      return prevNames.filter((nameItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <>
      <Login onAdd={addName} />
      {names.map((nameItem, index) => {
        return (
          <Card
            key={index}
            id={index}
            title={nameItem.title}
            onDelete={deleteName}
          />
        );
      })}
      </>
  );
}


export default Test;