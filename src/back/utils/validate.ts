type ValidateFieldsTypes = (
  body: Object,
  fields: Array<string>
) => Array<string>;

/**
 * Is true whenever all the fields listed in fields param are contained in body object
 * @param {Object} body
 * @param {Array<string>} fields
 */
// eslint-disable-next-line import/prefer-default-export
export const validateFields: ValidateFieldsTypes = (body, fields) =>
  fields.filter((field) => !Object.keys(body).includes(field));
