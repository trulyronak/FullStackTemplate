import React, { useState } from "react";

const CreateUser = ({ callback }) => {
  const [name, setName] = useState("");
  const [food, setFood] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    callback(name, food);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="name">Name: </label>
      <br />
      <input type="text" id="name" name="name" placeholder="John" value={name} onInput={e => setName(e.target.value)} />
      <br />
      <label for="food">Favorite Food:</label>
      <br />
      <input type="text" id="food" name="food" placeholder="Pasta" value={food} onInput={e => setFood(e.target.value)} />
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateUser;
