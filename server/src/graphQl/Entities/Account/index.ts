import 'reflect-metadata';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { Employee } from '../Employee';
@ObjectType()
export class Account {
  readonly _id!: ObjectId;

  @Field()
  id!: string;

  @Property({ ref: Employee, required: true })
  @Field({ nullable: true })
  admin!: Employee;
}
