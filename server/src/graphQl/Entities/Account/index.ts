import {
  prop as Property, getModelForClass, Ref, ReturnModelType, DocumentType,
} from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { Crew, Employee, Job } from '..';

@ObjectType({ description: 'Account of the User' })
export class Account {
  // readonly _id!: ObjectId;
  readonly _id!: ObjectId;

  @Field({ nullable: true })
  id?: string;

  @Property({ ref: 'Employee', required: true })
  @Field(() => Employee)
  admin?: Ref<Employee>

  @Property({ ref: 'Employee', default: [] })
  @Field(() => [Employee], { nullable: true })
  employees?: Ref<Employee>[];

  @Property({ ref: 'Job', default: [] })
  @Field((_returns) => [Job], { nullable: true })
  jobs?: Ref<Job>[];

  @Property({ ref: 'Crew', default: [] })
  @Field((_returns) => [Crew], { nullable: true })
  crews?: Ref<Crew>[];

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

  public async getCrews(this: DocumentType<Account>) {
    try {
      return this.populate({
        path: 'crews',
        populate: {
          path: 'employees',
        },
      }).execPopulate();
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getJobs(this: DocumentType<Account>) {
    try {
      return this.populate({
        path: 'jobs',
        populate: {
          path: 'employees',
        },
      }).execPopulate();
    } catch (e) {
      throw new Error(e);
    }
  }
}

export const AccountModel = getModelForClass(Account);
