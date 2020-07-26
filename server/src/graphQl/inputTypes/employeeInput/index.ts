import { Field, InputType } from 'type-graphql';
import { MaxLength, Length, IsEmail, ValidatePromise } from 'class-validator';
import { Employee as GqlEmployee } from '../../Entities/Employee';

@InputType()
export class SignUpInput implements Partial<GqlEmployee> {
  @Field()
  @IsEmail({}, { message: 'You must provide a valid email address' })
  public email: string;

  @Field()
  @Length(6, 20, { message: 'Password must be at least 6 characters long' })
  public password?: string;
}
