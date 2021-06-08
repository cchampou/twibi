type ValidateFieldsTypes = (body: Object, fields: Array<string>) => Array<string>;

// eslint-disable-next-line import/prefer-default-export
export const validateFields: ValidateFieldsTypes = (body, fields) => fields
  .filter((field) => !Object.keys(body).includes(field));
