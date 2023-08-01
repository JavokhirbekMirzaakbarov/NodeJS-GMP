import Joi from 'joi';

export const schema = Joi.object().keys({
  userIds: Joi.array().required(),
});
