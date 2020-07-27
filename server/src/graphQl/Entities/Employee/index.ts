import {
  getModelForClass, pre, prop as Property, QueryMethod, Ref, ReturnModelType,
} from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Account, AccountModel } from '../Account';

export enum RoleType {
  Admin = 'Admin',
  Manager = 'Manager',
  InputUser = 'InputUser',
  FieldUser = 'FieldUser',
  SetupUser = 'SetupUser',
  Worker = 'Worker',
}

@ObjectType({ description: 'A User or Employee of the program' })
@pre<Employee>('save', async function (next) {
  // gets access to the user model that is currently being saved
  const user = this;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt();
      // overwrite the plain text password with our hash
      user.password = await bcrypt.hash(user.password, salt);
      // Finally call save
      next();
    } catch (e) {
      // Call save with an error
      next(e);
    }
  }
  next();
})
export class Employee {
  // Any field we don't decorate with @Field here is for this class only
  readonly _id!: ObjectId;

  @Field({ nullable: true })
  id?: string;

  @Property({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  @Field({ nullable: true })
  email?: string;

  @Property({
    trim: true,
    get(val) {
      return val;
    },
    set(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  })
  @Field({ nullable: true })
  firstName?: string;

  @Property({
    trim: true,
    get(val) {
      return val;
    },
    set(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  })
  @Field({ nullable: true })
  lastName?: string;

  @Property({ enum: RoleType })
  @Field({ nullable: true })
  role?: string;

  @Property()
  password!: string;

  @Property()
  @Field({ nullable: true })
  token?: string;

  @Property({ ref: Account, type: Schema.Types.ObjectId })
  @Field((_type: void) => Account, { nullable: true })
  account?: Ref<Account>;

  @Field({ nullable: true })
  logOut?: boolean;

  // Model methods
  async comparePassword(candidatePassword: string): Promise<boolean> {
    const employee = this;
    try {
      const isMatch: boolean = await bcrypt.compare(candidatePassword, employee.password);
      return Promise.resolve(isMatch);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // Static class methods
  // Getting an Employees account
  public static async getAuthEmployeeAccount(this: ReturnModelType<typeof Employee>, id: string) {
    let authenticatedEmployee;
    let account;
    try {
      authenticatedEmployee = await this.findById(id).populate('account');
      console.log('authenticated', authenticatedEmployee);
    } catch (e) {
      throw new Error(e);
    }
    if (!authenticatedEmployee) {
      throw new Error('Error in getAuthenticatedEmployee');
    }
    try {
      account = await AccountModel.findOne(authenticatedEmployee.account);
      console.log(account);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
    if (!account) {
      throw new Error('Error: Error in getting account. You must have an account to do that');
    }
    console.log('account', account);
    return account;
  }
  // Might be useful later account does have this method
  // async getEmployeeAccount () {
  //   try {
  //     return await AccountModel.findById(this.account).populate({ path: 'admin', populate: { path: 'account' } });
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
}

export const EmployeeModel = getModelForClass(Employee);
