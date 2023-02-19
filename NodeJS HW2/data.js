const { v4: uuidv4 } = require("uuid");

const users = [
  {
    id: uuidv4(),
    login: "login1",
    password: "abc123",
    age: 20,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "login2",
    password: "abc345",
    age: 25,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "login3",
    password: "abc567",
    age: 30,
    isDeleted: false,
  },
];

module.exports = { users };
