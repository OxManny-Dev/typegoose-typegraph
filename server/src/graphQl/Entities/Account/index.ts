import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { Employee, EmployeeModel } from '..';
import { Schema } from 'mongoose';

@ObjectType()
export class Account {
  // readonly _id!: ObjectId;

  @Field()
  _id!: string;

  @Property({ ref: 'Employee', required: true, type: Schema.Types.ObjectId })
  @Field(() => Employee)
  admin!: Ref<Employee>
}

export const AccountModel = getModelForClass(Account);
