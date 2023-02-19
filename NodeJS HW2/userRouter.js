const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { userSchema, updateSchema } = require("./schemas");
const { users } = require("./data");
const { validateSchema, getExistingUsers } = require("./helpers");

const router = Router();

router.param("id", (req, res, next, id) => {
  const user = users.find((user) => user.id === id);
  if (!user)
    res.status(404).json({ message: `User with id=${id} was not found!` });
  else {
    res.locals.user = user;
    next();
  }
});

router.get("/", (req, res) => {
  const exUsers = getExistingUsers(users);
  const { limit, loginSubstring } = req.query;

  if (limit && loginSubstring) {
    res
      .status(200)
      .json(
        exUsers
          .filter((user) => user.login.includes(loginSubstring))
          .slice(0, limit)
      );
  } else {
    res.status(200).json(exUsers);
  }
});

router.get("/:id", (req, res) => {
  res.status(200).json(res.locals.user);
});

router.post("/", validateSchema(userSchema), (req, res) => {
  const newUser = {
    ...req.body,
    id: uuidv4(),
    isDeleted: false,
  };
  users.push(newUser);
  res
    .status(201)
    .json({ message: "New user created successfully!", data: newUser });
});

router.patch("/:id", validateSchema(updateSchema), (req, res) => {
  const index = users.findIndex((user) => user.id === res.locals.user.id);
  const newUser = {
    ...res.locals.user,
    ...req.body,
  };
  users.splice(index, 1, newUser);
  res
    .status(201)
    .json({ message: "User updated successfully!", data: newUser });
});

router.delete("/:id", (req, res) => {
  const index = users.findIndex((user) => user.id === res.locals.user.id);
  users.splice(index, 1, { ...res.locals.user, isDeleted: true });
  res.status(200).json({ message: `User with id=${req.params.id} deleted!` });
});

module.exports = { router };
