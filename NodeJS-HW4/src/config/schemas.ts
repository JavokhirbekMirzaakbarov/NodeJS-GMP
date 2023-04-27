import Joi from 'joi';

const userSchema = Joi.object().keys({
  login: Joi.string().min(2).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

const groupSchema = Joi.object().keys({
  name: Joi.string().min(1).required(),
  permissions: Joi.array()
    .items(
      Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'),
    )
    .required(),
});

const updateGroupSchema = Joi.object().keys({
  name: Joi.string().min(1),
  permissions: Joi.array().items(
    Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'),
  ),
});

const updateSchema = Joi.object({
  login: Joi.string().min(2),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  age: Joi.number().integer().min(4).max(130),
});

const userGroupSchema = Joi.object().keys({
  userIds: Joi.array().items(Joi.string()).required(),
});

export {
  userSchema,
  updateSchema,
  groupSchema,
  updateGroupSchema,
  userGroupSchema,
};
