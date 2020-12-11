const express = require('express');
const router = express.Router();

const users = [];
const makeUser = (name, favoriteFood) => {
  return {
    name, favoriteFood
  };
}

/* GET users */
router.get('/', (req, res) => {
  return res.json(users);
});

/* PUT users */
router.put('/', (req, res) => {
  // validate parameters
  const { name, favoriteFood } = req.body;
  if (!name || !favoriteFood || typeof name !== 'string' || typeof favoriteFood !== 'string') {
    res.status(422);
    return res.json({
      error: "invalid parameters"
    });
  }

  // create user
  const user = makeUser(name, favoriteFood);
  users.push(user);

  // return created user
  return res.json(user);
});

/* GET specific user */
router.get('/:name', (req, res) => {
  // validate parameters
  const { name } = req.params;
  if (!name || typeof name !== 'string') {
    res.status(422);
    return req.json({
      error: "invalid parameters"
    });
  }
  
  // find user
  const user = users.find(u => {
    return u.name === name;
  });
  
  if (user === undefined) {
    res.status(404);
    return res.json({
      error: "user not found"
    });
  } 
  return res.json(user);
});

module.exports = router;