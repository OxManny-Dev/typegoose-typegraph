import { MiddlewareFn, NextFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import { Context } from '../../lib/types';

export const AuthenticateEmployee: MiddlewareFn<Context> = async ({ context: { req, EmployeeModel, AccountModel } }, next: NextFn) => {
  const token = req.get('X-CSRF-TOKEN');
  let employee;
  console.log('cookie', req.signedCookies.loggedInEmployee);
  console.log('token', token);
  try {
    employee = await EmployeeModel
      .findOne({ _id: req.signedCookies.loggedInEmployee, token });
    console.log(employee);
  } catch (e) {
    console.log('inside authenticate employee', e);
    throw new AuthenticationError('You must be authenticated to do that');
  }

  if (!employee) {
    throw new AuthenticationError('You must be logged in to do that!');
  }

  return next();
};
