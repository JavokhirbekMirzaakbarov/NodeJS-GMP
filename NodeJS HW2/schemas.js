const Joi = require("joi");

const userSchema = Joi.object().keys({
  login: Joi.string().min(2).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

const updateSchema = Joi.object({
  login: Joi.string().min(2),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  age: Joi.number().integer().min(4).max(130),
});

module.exports = {
  userSchema,
  updateSchema,
};
