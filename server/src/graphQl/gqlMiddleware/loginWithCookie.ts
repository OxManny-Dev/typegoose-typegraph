import { MiddlewareFn, NextFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import crypto from 'crypto';
import { Context } from '../../lib/types';

import { cookieOptions } from '../../lib/utils/cookieOptions';

export const LogInWithCookie: MiddlewareFn<Context> = async ({ context: { req, res, EmployeeModel } }, next: NextFn) => {
  let employee;
  if (!req.signedCookies.loggedInEmployee) {
    console.log('Hitting next');
    return next();
  }

  if (req.signedCookies.loggedInEmployee) {
    try {
      employee = await EmployeeModel.findById(req.signedCookies.loggedInEmployee);
    } catch (e) {
      console.log(e);
      res.clearCookie('employee', cookieOptions);
      throw new Error(e);
    }
  }

  if (!employee) {
    res.clearCookie('loggedInEmployee', cookieOptions);
    throw new AuthenticationError('You are not authenticated please sign in');
  } else {
    await employee.save();
    return employee;
  }
};
