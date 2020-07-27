import { Field, InputType } from 'type-graphql';
import {
  Length,
  IsEmail,
  IsString,
} from 'class-validator';
import { Employee as GqlEmployee } from '../../Entities/Employee';

@InputType()
export class SignInInput implements Partial<GqlEmployee> {
  @Field()
  @IsString()
  @IsEmail({}, { message: 'You must provide a valid email address' })
  email: string;

  @Field()
  @IsString()
  @Length(6, 20, { message: 'Password must be at least 6 characters long' })
  password?: string;
}

@InputType()
export class SignUpInput extends SignInInput implements Partial<GqlEmployee> {
}

// input CreateEmployeeInput {
//   email: String!
//   firstName: String
//   lastName: String
//   password: String!
//   role: String!
// }
