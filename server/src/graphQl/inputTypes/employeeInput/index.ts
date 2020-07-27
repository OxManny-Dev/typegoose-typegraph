import { Field, InputType } from 'type-graphql';
import {
  Length,
  IsEmail,
  IsString,
  IsEnum,
} from 'class-validator';
import { Employee as GqlEmployee } from '../../Entities/Employee';
import { EmployeeRoleType } from '../../../lib/types/modelTypes';

@InputType()
export class SignInInput implements Partial<GqlEmployee> {
  @Field({ nullable: true })
  @IsString()
  @IsEmail({}, { message: 'You must provide a valid email address' })
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @Length(6, 20, { message: 'Password must be at least 6 characters long' })
  password?: string;
}

@InputType()
export class SignUpInput extends SignInInput implements Partial<GqlEmployee> {
}

@InputType()
export class CreateEmployeeInput extends SignInInput implements Partial<GqlEmployee> {
  @Field({ nullable: true })
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsEnum(EmployeeRoleType)
  @IsString()
  role!: EmployeeRoleType;
}

// export type CreateEmployeeInput = {
//   input: {
//     firstName?: string;
//     lastName?: string;
//     email: string;
//     password: string;
//     role: string;
//   }
// }
// input CreateEmployeeInput {
//   email: String!
//   firstName: String
//   lastName: String
//   password: String!
//   role: String!
// }
