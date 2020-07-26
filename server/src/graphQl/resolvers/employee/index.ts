import { IResolvers, AuthenticationError } from 'apollo-server-express';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import crypto from 'crypto';
import faker from 'faker';
import {
  Context,
  IEmployeeDocument,
  CreateEmployeeInput,
  SignInArgs,
  SignUpArgs,
  SignInInput,
  GqlEmployee,
} from '../../../lib/types';
import { authorize } from '../../../lib/utils/auth';

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development',
};

const loginViaEmailAndPassWord = async (
  token: string,
  email: string,
  password: string,
  Employee: Model<IEmployeeDocument>,
  res: Response,
): Promise<IEmployeeDocument | undefined> => {
  let employee;

  try {
    employee = await Employee.findOne({ email });
  } catch (e) {
    throw new Error(e);
  }

  if (!employee) {
    throw new Error('Employee not found');
  }

  const isMatch = await employee.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  if (employee) {
    res.cookie('employee', employee._id, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24,
    });

    console.log(employee);
    employee.token = token;
    await employee.save();
    return employee;
  }
};

const logInViaCookie = async (
  token: string,
  Employee: Model<IEmployeeDocument>,
  req: Request,
  res: Response,
): Promise<IEmployeeDocument | undefined> => {
  let employee;
  console.log(req.signedCookies.employee);

  if (req.signedCookies.employee) {
    try {
      employee = await Employee.findById(req.signedCookies.employee);
      console.log(employee);
    } catch (e) {
      res.clearCookie('employee', cookieOptions);
      throw new Error(e);
    }
    if (!employee) {
      res.clearCookie('employee', cookieOptions);
    } else {
      // employee.token = token;
      await employee.save();
      return employee;
    }
  }
};

export const employeeResolvers: IResolvers = {
  Query: {
    employee: async (
      _root: undefined,
      { id }: { id: string },
      { db: { Employee } }: Context,
    ): Promise<IEmployeeDocument | undefined> => {
      try {
        const employee = await Employee.findById(id).populate('account');
        if (employee) {
          return employee;
        }
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
    },
    employees: async (
      _root: undefined,
      _args: undefined,
      { req, db: { Account, Employee } }: Context,
    ): Promise<IEmployeeDocument[] | null> => {
      let account;
      let authorizedEmployee;
      let employees;
      try {
        authorizedEmployee = await authorize(Employee, req);
      } catch (e) {
        throw new AuthenticationError(e);
      }

      if (authorizedEmployee) {
        account = await Account.findById(authorizedEmployee.account);
      } else {
        throw new Error('No account found');
      }

      if (account) {
        try {
          employees = await Employee.find({ account });
          console.log(employees);
          return employees;
        } catch (e) {
          throw new Error(e);
        }
      }
      return null;
    },
  },
  Mutation: {
    SignUp: async (
      _parent: undefined,
      { input: { email, password } }: SignUpArgs,
      { req, res, db: { Employee, Account } }: Context,
    ): Promise<IEmployeeDocument | undefined> => {
      let employee;
      let account;
      try {
        employee = await Employee.findOne({ email });
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
      if (employee) {
        throw new Error('Account already exists. Please try a different email address');
      }

      const token = crypto.randomBytes(16).toString('hex');
      try {
        employee = await new Employee({ email, password, token }).save();
        account = await new Account({ admin: employee, name: faker.random.word() }).save();
        employee.account = account;
        await employee.save();
        res.cookie('employee', employee._id, {
          ...cookieOptions,
          maxAge: 1000 * 60 * 60 * 24,
        });
        return employee;
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
    },
    SignIn: async (
      _parent: undefined,
      { input }: SignInArgs,
      { req, res, db: { Employee } }: Context,
    ): Promise<GqlEmployee | undefined> => {
      const loginViaEmail: SignInInput | null = input || null;
      const token = crypto.randomBytes(16).toString('hex');
      // If there is an input, for email and pass
      // loginWith input
      // Otherwise, check for  signedCookie
      const employee = loginViaEmail
        ? await loginViaEmailAndPassWord(token, input.email, input.password, Employee, res)
        : await logInViaCookie(token, Employee, req, res);

      /* We found no employee with email or password
      * show error on front end by checking this object
      * */
      if (employee) {
        return employee;
      }
    },
    SignOut: (
      _parent: undefined,
      _args: undefined,
      { res }: Context,
    ) => {
      try {
        res.clearCookie('employee', cookieOptions);
        return true;
      } catch (error) {
        throw new Error(`Failed to log out: ${error}`);
      }
    },
    CreateEmployee: async (
      _root: undefined,
      {
        input: {
          email, firstName, lastName, password, role,
        },
      }: CreateEmployeeInput,
      { req, db: { Employee, Account } }: Context,
    ) => {
      let account;
      let authorizedEmployee;
      let newEmployee;
      console.log(role);
      try {
        authorizedEmployee = await authorize(Employee, req);
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
      if (authorizedEmployee) {
        try {
          account = await Account.findById(authorizedEmployee.account);
        } catch (e) {
          throw new Error(e);
        }
      }
      if (account) {
        try {
          newEmployee = await new Employee({
            email, firstName, lastName, password, role, account,
          }).save();
          console.log(newEmployee);
          account.employees.push(newEmployee);
          await account.save();
          return newEmployee;
        } catch (e) {
          throw new Error(e);
        }
      }
      return null;
    },
  },
};
