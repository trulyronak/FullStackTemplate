import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import CreateUser from "./components/CreateUser";

const App = () => {
  const [users, setUsers] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/users").then(res => res.json()).then(json => setUsers(json));
  }, [trigger]);

  const createUser = (name, favoriteFood) => {
    fetch("http://localhost:5000/users", {
      method: "PUT",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({ name, favoriteFood })
    }).then(setTrigger).catch(err => {
      alert(`Something went wrong — ${err}`);
    })
  }

  return (
    <div className="App">
      <h1>Join the Users!</h1>
      <CreateUser callback={ createUser } />
      <ul>
        {users.map(user => (
          <div>
            <h1>{user.name}</h1>
            <p>Favorite Food: {user.favoriteFood}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
