import { ValidationError } from 'class-validator';

export const validateInput = async (validateFn, inputToValidate) => {
  let errors;
  try {
    errors = await validateFn(inputToValidate, { validationError: { target: false } });
  } catch (e) {
    throw new Error(e);
  }
  // Gets the error messages validate, takes each error Object
  // and combines all input errors into 1 string
  if (errors.length > 0) {
    console.log(errors);
    const messages: string[] = errors.map((error: ValidationError) => Object.values(error.constraints)).flat();
    throw new Error(messages.join(' '));
  }
};
