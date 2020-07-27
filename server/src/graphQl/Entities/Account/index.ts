import {
  prop as Property, getModelForClass, Ref, ReturnModelType, DocumentType,
} from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { Schema } from 'mongoose';
import { Employee, EmployeeModel } from '..';

@ObjectType()
export class Account {
  // readonly _id!: ObjectId;
  readonly _id!: ObjectId;

  @Field({ nullable: true })
  id?: string;

  @Property({ ref: 'Employee', required: true })
  @Field(() => Employee)
  admin?: Ref<Employee>

  @Property({ ref: 'Employee', default: [] })
  @Field(() => [Employee])
  employees?: Ref<Employee>[];

  public async getEmployees(this: DocumentType<Account>) {
    try {
      return this.populate({
        path: 'employees',
        populate: {
          path: 'account',
        },
      }).execPopulate();
    } catch (e) {
      throw new Error(e);
    }
  }
}

export const AccountModel = getModelForClass(Account);
