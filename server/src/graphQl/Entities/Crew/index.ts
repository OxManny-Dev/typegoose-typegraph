import {
  prop as Property, getModelForClass, Ref, ReturnModelType, DocumentType,
} from '@typegoose/typegoose';

import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { Account, Employee, Job } from '..';

@ObjectType({ description: 'The different crews of the account' })
export class Crew {
  readonly _id!: ObjectId;

  @Field({ nullable: true })
  id?: string;

  @Property({ ref: 'Account', required: true })
  @Field((_return) => Account, { nullable: true })
  account?: Ref<Account>;

  @Property({ ref: 'Employee', default: [] })
  @Field(() => [Employee], { nullable: true })
  crewMembers?: Ref<Employee>[];

  @Property({ ref: 'Job', default: [] })
  @Field((_returns) => [Job], { nullable: true })
  jobs?: Ref<Job>[];
}

export const CrewModel = getModelForClass(Crew);
