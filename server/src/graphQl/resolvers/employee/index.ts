import {
  Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware,
} from 'type-graphql';
import { validate, ValidationError } from 'class-validator';

import crypto from 'crypto';
import faker from 'faker';
import { Context } from '../../../lib/types';
import { Account as GqlAccount, Employee as GqlEmployee } from '../../Entities';

import { AuthenticateEmployee } from '../../gqlMiddleware/authenticate';
import { LogInWithCookie } from '../../gqlMiddleware/loginWithCookie';

import { SignUpInput, SignInInput, CreateEmployeeInput } from '../../inputTypes/employeeInput';

import { cookieOptions } from '../../../lib/utils/cookieOptions';
import { validateInput } from '../../../lib/utils/validateInput';
@Resolver((_of: void) => GqlEmployee)
export class EmployeeResolver {
  // Queries
  @Query((_returns: void) => [GqlEmployee])
  @UseMiddleware(AuthenticateEmployee)
  async fetchEmployees(
    @Ctx() { req, EmployeeModel }: Context,
  ): Promise<GqlEmployee[] | null> {
    console.log('fetching');
    try {
      const employeeAccount = await EmployeeModel.getAuthEmployeeAccount(req.signedCookies.loggedInEmployee);
      return (await employeeAccount.getEmployees()).employees;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  /*
  *
  *
  * End of queries
  *
  *
  *
  */

  /* CRUD MUTATIONS */

  @Mutation((_returns: void) => GqlEmployee)
  async createEmployee(
    @Arg('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
    @Ctx() { req, EmployeeModel, AccountModel }: Context,
  ): Promise<GqlEmployee | null> {
    console.log('hitting');
    try {
      await validateInput(createEmployeeInput);
    } catch (e) {
      throw new Error(e);
    }
    try {
      const employeeAccount = await EmployeeModel.getAuthEmployeeAccount(req.signedCookies.loggedInEmployee);
      const newEmployee = await new EmployeeModel({ ...createEmployeeInput, account: employeeAccount.id });
      // Wants you yo save first then create
      await newEmployee.save();
      employeeAccount.employees.push(newEmployee);
      await employeeAccount.save();
      return newEmployee;
    } catch (e) {
      console.log('creating error', e);
      throw new Error(e);
    }
  }

  // Mutations
  @Mutation((_returns: void) => GqlEmployee)
  async signUp(
    // You must use a single string for Arg
    @Arg('signUpInput') signUpInput: SignUpInput,
    @Ctx() { EmployeeModel, AccountModel, res }: Context,
  ): Promise<GqlEmployee | null> {
    // Place holder variable for new employee
    let newEmployee;
    let newAccount;
    try {
      await validateInput(signUpInput);
    } catch (e) {
      throw new Error(e);
    }

    // Check if employee exists and if so, throw an error, otherwise create account
    try {
      newEmployee = await EmployeeModel.findOne({ email: signUpInput.email });
    } catch (e) {
      throw new Error(e);
    }

    if (newEmployee) {
      throw new Error('Account already exists. Please try a different email address');
    }

    try {
      const token = crypto.randomBytes(16).toString('hex');
      newEmployee = await new EmployeeModel({ ...signUpInput, token, role: 'Admin' });
      console.log('newEmployee', newEmployee);
      newAccount = await new AccountModel({ admin: newEmployee.id, name: faker.random.word(), employees: [newEmployee] }).save();
      newEmployee.account = newAccount.id;
      await newEmployee.save();
    } catch (e) {
      throw new Error(e);
    }

    // If there's an employee, create a cookie for him using id
    if (newEmployee) {
      res.cookie('loggedInEmployee', newEmployee._id, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24,
      });
      return newEmployee;
    }
    return null;
  }

  /*
  * End of SignUp
  * */

  @Mutation((_returns) => GqlEmployee)
  @UseMiddleware(LogInWithCookie)
  async signIn(
    @Arg('signInInput', { nullable: true, validate: false }) signInInput: SignInInput,
    @Ctx() {
        res, EmployeeModel,
      } : Context,
  ) {
    const token = crypto.randomBytes(16).toString('hex');
    let employee;
    // Look for Employee if email exist
    try {
      employee = await EmployeeModel.findOne({ email: signInInput.email });
      console.log('found', employee);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
    if (!employee) {
      throw new Error('Employee not found');
    }
    const isMatch = await employee.comparePassword(signInInput.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    if (employee) {
      res.cookie('loggedInEmployee', employee._id, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24,
      });

      console.log(employee);
      employee.token = token;
      await employee.save();
      return employee;
    }
  }

  /*
  *
  * End Of Sign In
  * */

  @Mutation((_returns: void) => GqlEmployee)
  signOut(@Ctx() { res }: Context) {
    res.clearCookie('loggedInEmployee', cookieOptions);
    return { logOut: true };
  }

  /*
  *
  * End of sign out
  *
  * */

  /*
  *
  * Field Resolvers
  * */

  @FieldResolver()
  id(@Root() currentEmployee: GqlEmployee) {
    return currentEmployee._id.toString();
  }

  @FieldResolver()
  async account(
    @Root() parent,
    @Ctx() { AccountModel }: Context,
  ): Promise<GqlAccount | null> {
    let account: GqlAccount;
    try {
      if (parent.account) {
        account = await AccountModel.findById(parent.account._id.toString()).populate('admin');
        return account;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
