import {badRequest} from '@utils/error';
import {VacancyStatus, VacancyType} from '@utils/enums';
import * as Joi from 'joi';
import {validate} from 'utils/joi';

function validateCreateVacancy(payload) {
  const schema = Joi.object({
    title: Joi.string().min(0).max(200).required(),
    link: Joi.string().min(3).max(2048).optional(),
    description: Joi.string().min(0).max(800).required(),
    status: Joi.string()
      .valid(...Object.values(VacancyStatus))
      .default(VacancyStatus.Active)
      .required(),
    type: Joi.string()
      .valid(...Object.values(VacancyType))
      .required(),
    openedDate: Joi.date().optional(),
    questions: Joi.array().min(1).max(20).items(Joi.string().hex().length(24)).required()
  });

  return validate(schema, payload);
}

function validateUpdateVacancy(payload) {
  const schema = Joi.object({
    title: Joi.string().min(0).max(200).optional(),
    link: Joi.string().min(0).max(2048).optional(),
    description: Joi.string().min(0).max(800).optional(),
    status: Joi.string()
      .valid(...Object.values(VacancyStatus))
      .default(VacancyStatus.Active)
      .optional(),
    type: Joi.string()
      .valid(...Object.values(VacancyType))
      .optional(),
    openedDate: Joi.date().optional(),
    questions: Joi.array().min(1).max(20).items(Joi.string().hex().length(24)).optional()
  });

  return validate(schema, payload);
}

export {validateCreateVacancy, validateUpdateVacancy};
