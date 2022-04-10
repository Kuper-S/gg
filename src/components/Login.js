import React, { useState } from "react";

function CreateArea(props) {
  const [name, setName] = useState({
    userName :""
  });
  const [wasAdded, setWasAdded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setName(prevname => {
      return {
        ...prevname,
        [name]: value
      };
    });
  }

  function submitName(event) {
    props.onAdd(name);
    setName({
        userName :""
    });
    setWasAdded(true);
    event.preventDefault();
  }

  return (
    <div>
      <form >
        <input
        name="title"
        onChange={handleChange}
        value={name.title}
        placeholder="Enter Your Name"
        disabled={wasAdded}
        />

        <button onClick={submitName}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;


