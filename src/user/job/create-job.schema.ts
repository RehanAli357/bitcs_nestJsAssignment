import * as joi from 'joi';

export const createJobSchema = joi.object({
  name: joi.string().required(),
  password: joi.string().required().min(6),
  token: joi.string().optional(),
  level: joi.string().valid(1, 2, 3).optional(),
});
