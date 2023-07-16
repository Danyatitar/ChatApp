import * as Joi from 'joi';
import {validate} from 'utils/joi';

function validateCreateUser(payload) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    username: Joi.string().min(3).max(200).required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({'string.pattern.base': `Phone number must have 10 digits.`})
      .required()
  });

  return validate(schema, payload);
}
function validatePhone(payload) {
  const schema = Joi.object({
    phoneNumber: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({'string.pattern.base': `Phone number must have 10 digits.`})
      .required()
  });

  return validate(schema, payload);
}
export {validateCreateUser, validatePhone};
