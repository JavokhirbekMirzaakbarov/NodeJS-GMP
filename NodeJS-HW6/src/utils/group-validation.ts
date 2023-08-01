import Joi from 'joi';

export const schema = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string().required(),
  permission: Joi.array().items(Joi.string()).required(),
});
