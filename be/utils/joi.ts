import {badRequest} from './error';

function validate(schema, payload) {
  return schema.validateAsync(payload).catch(e => {
    throw badRequest(e.message, 'validation_failed');
  });
}

export {validate};
