const { v4: uuidv4 } = require("uuid");
const express = require("express");
const Joi = require("joi");

const app = express();
const router = express.Router();
app.use(express.json());

const userSchema = Joi.object().keys({
  login: Joi.string().min(2).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  age: Joi.number().integer().min(4).max(130),
});

const errorResponse = (schemaErrors) => {
  const errors = schemaErrors.map(({ path, message }) => ({
    path,
    message,
  }));

  return {
    status: "failed",
    errors,
  };
};

const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });
    if (error?.isJoi) {
      res.status(400).json(errorResponse(error.details));
    } else {
      next();
    }
  };
};

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

const getExistingUsers = () => {
  return users.filter((user) => !user.isDeleted);
};

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
  const users = getExistingUsers();
  const { limit, loginSubstring } = req.body;

  if (limit && loginSubstring) {
    res
      .status(200)
      .json(
        users
          .filter((user) => user.login.includes(loginSubstring))
          .slice(0, limit)
      );
  } else {
    res.status(200).json(users);
  }
});

router.get("/:id", (req, res) => {
  res.status(200).json(res.locals.user);
});

router.post("/", validateSchema(userSchema), (req, res) => {
  const newUser = {
    ...req.body,
    id: uuidv4(),
    isDeleteted: false,
  };
  users.push(newUser);
  res
    .status(201)
    .json({ message: "New user created successfully!", data: newUser });
});

router.patch("/:id", (req, res) => {
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

app.use("/", router);

app.listen(3000, () => {
  console.log("Listening on 3000");
});
